import request from "supertest";
import axios from "axios";
// use Upstash Redis instance due to issues mocking Redis
// !!! Running tests with interact with the REAL REDIS DATABASE !!!
import { app, redisClient } from "../api/server";

// Variable to hold server instance
let server: any;

// Mock axios to avoid actual OpenAI API calls
jest.mock("axios");

beforeAll(async () => {
  // Start the server on arbitrary port for testing
  server = app.listen(4000, () => {
    console.log("Test server running on port 4000");
  });
});

afterAll(async () => {
  // Close the server to terminate open connections
  await server.close();
  // Disconnect from Redis
  await redisClient.quit();
});

beforeEach(async () => {
  // Flush the Redis database to ensure test isolation
  await redisClient.flushAll();
  jest.clearAllMocks();
});

describe("POST /api/dork", () => {
  it("should return 400 if query is missing", async () => {
    const res = await request(app).post("/api/dork").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(true);
    expect(res.body.errorMessage).toMatch(/Missing 'query'/);
  });

  it("should return cached result if available", async () => {
    // Set a cached value in Redis for the query "test query"
    const cacheKey = `dork:${"test query".toLowerCase().trim()}`;
    const cachedData = {
      dork: 'site:example.com intext:"data"',
      explanation: "Cached explanation",
      error: false,
      errorMessage: "",
    };
    await redisClient.setEx(cacheKey, 86400, JSON.stringify(cachedData));

    const res = await request(app)
      .post("/api/dork")
      .send({ query: "test query" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(cachedData);
  });

  it("should call OpenAI API and return valid dork data if not cached", async () => {
    // Ensure there's no cached result
    const cacheKey = `dork:${"test query".toLowerCase().trim()}`;
    await redisClient.del(cacheKey);

    // Simulate a valid OpenAI API response
    const openAiResponse = {
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                dork: 'site:example.com intext:"data"',
                explanation: "Explanation from API",
                error: false,
                errorMessage: "",
              }),
            },
          },
        ],
      },
    };
    (axios.post as jest.Mock).mockResolvedValue(openAiResponse);

    const res = await request(app)
      .post("/api/dork")
      .send({ query: "test query" });
    expect(res.status).toBe(200);
    expect(res.body.dork).toBe('site:example.com intext:"data"');
    // Check that the result was cached in Redis
    const cachedResult = await redisClient.get(cacheKey);
    expect(cachedResult).toBeTruthy();
  });

  it("should return a 200 response with error details if the model rejects the query", async () => {
    // Ensure no cached result exists for this query
    const cacheKey = `dork:${"test query".toLowerCase().trim()}`;
    await redisClient.del(cacheKey);

    // Simulate an OpenAI API response where the model rejects the query
    const openAiResponse = {
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                dork: "",
                explanation: "",
                error: true,
                errorMessage:
                  "This query appears malicious and has been rejected.",
              }),
            },
          },
        ],
      },
    };
    (axios.post as jest.Mock).mockResolvedValue(openAiResponse);

    const res = await request(app)
      .post("/api/dork")
      .send({ query: "test query" });

    expect(res.status).toBe(200);
    expect(res.body.error).toBe(true);
    expect(res.body.errorMessage).toBeTruthy();
  });

  it("should return 500 if JSON parsing fails", async () => {
    const cacheKey = `dork:${"test query".toLowerCase().trim()}`;
    await redisClient.del(cacheKey);

    // Simulate a response with invalid JSON content
    const openAiResponse = {
      data: {
        choices: [
          {
            message: {
              content: "invalid json",
            },
          },
        ],
      },
    };
    (axios.post as jest.Mock).mockResolvedValue(openAiResponse);

    const res = await request(app)
      .post("/api/dork")
      .send({ query: "test query" });
    expect(res.status).toBe(500);
    expect(res.body.error).toBe(true);
    expect(res.body.errorMessage).toMatch(/Invalid JSON/);
  });

  it("should return 500 on axios error", async () => {
    const cacheKey = `dork:${"test query".toLowerCase().trim()}`;
    await redisClient.del(cacheKey);

    // Simulate an error from axios (e.g., network error)
    (axios.post as jest.Mock).mockRejectedValue(new Error("Network error"));

    const res = await request(app)
      .post("/api/dork")
      .send({ query: "test query" });
    expect(res.status).toBe(500);
    expect(res.body.error).toBe(true);
    expect(res.body.errorMessage).toMatch(/Failed to generate Google dork/);
  });
});
