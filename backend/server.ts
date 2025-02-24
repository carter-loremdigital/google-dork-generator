import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Access environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Prefix API routes with "/api"
const apiRouter = express.Router();

// Use the "/api" prefix for all API routes
app.use("/api", apiRouter);

// Test /api routes
apiRouter.get("/", (req, res) => {
  res.send("Tested '/api' endpoint successfully!");
});

// Root test route (not part of "/api")
app.get("/", (req, res) => {
  res.send("Hello from Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
