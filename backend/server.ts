import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { systemPrompt } from "./data";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

// Access environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create and connect Redis client with Upstash URL
const redisClient = createClient({
  url: process.env.UPSTASH_REDIS_URL,
});
redisClient.connect().catch(console.error);

// Set up rate limiting middleware with Redis as the store
const limiter = rateLimit({
  store: new RedisStore({
    // sendCommand function is used by rate-limit-redis to interact with Redis
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 5 requests per minute
  message: "Too many requests, please try again later.",
});

// Configure server to use the rate limiter
app.use(limiter);

const apiRouter = express.Router();

// System prompt for OpenAI API request
const SYSTEM_PROMPT = systemPrompt;

// API endpoint for generating Google dorks
apiRouter.post("/dork", async (req: Request, res: Response): Promise<any> => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({
      dork: "",
      explanation: "",
      error: true,
      errorMessage: "Missing 'query' in request body.",
    });
  }

  // Use a normalized query as the cache key
  const cacheKey = `dork:${query.toLowerCase().trim()}`;
  try {
    // Check Redis cache for query key
    const cachedResult = await redisClient.get(cacheKey);
    if (cachedResult) {
      return res.json(JSON.parse(cachedResult));
    }

    // Prepare payload for OpenAI API call
    const payload = {
      model: "gpt-4o-mini", // use 4o-mini model
      messages: [
        { role: "system", content: [{ type: "text", text: SYSTEM_PROMPT }] },
        { role: "user", content: query },
      ],
      response_format: {
        type: "json_object", // Specify JSON response format
      },
      // Model parameters
      temperature: 0.75,
      max_completion_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    // Make OpenAI API request
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract message & parse to JSON
    const message = response.data.choices[0].message.content;
    let result;
    try {
      result = JSON.parse(message);
    } catch (parseError) {
      // Handle JSON parse errors
      return res.status(500).json({
        dork: "",
        explanation: "",
        error: true,
        errorMessage: "Invalid JSON received from OpenAI API.",
      });
    }

    // Cache the result with a TTL of 24 hours (86400 seconds)
    await redisClient.setEx(cacheKey, 86400, JSON.stringify(result));

    // Return the parsed result which should match our schema
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      dork: "",
      explanation: "",
      error: true,
      errorMessage: "Failed to generate Google dork.",
    });
  }
});

// Use the "/api" prefix for all API routes
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
