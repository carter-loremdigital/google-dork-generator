# AI-Powered Google Dork Generator: Design Journey

## 1. Project Overview

**Project Name:**  
AI-Powered Google Dork Generator

**Goal:**  
Create a lightweight, portfolio-ready application that converts a user's plain-English request into a structured Google Dork query. The application leverages the OpenAI API (using the gpt-4o-mini model) to generate queries while enforcing strict guidelines via a system prompt.

**Key Features:**

- **Frontend:**
  - Built with vanilla React.
  - Provides a clean UI where users can enter their plain-English request and view the resulting Google Dork as a link.
- **Backend:**
  - Implemented in Express.
  - Acts as a proxy to the OpenAI API for query generation.
  - Enforces rate limiting and caches similar requests using Redis.
- **Monorepo Structure:**
  - Both the frontend and backend reside in the same repository to streamline development.
- **Deployment:**
  - Deployed on Vercel using serverless functions for backend API calls.
- **Security & Scalability:**
  - Uses Redis for both rate limiting and caching to prevent abuse of the OpenAI API and ensure consistency across serverless instances.

## 2. Motivations & Audience

### Motivation

- **Portfolio Enhancement:**

  - Build a small but polished project that demonstrates modern full-stack development skills.
  - Showcase expertise in integrating third-party APIs, implementing caching strategies, and deploying serverless applications.

- **Cost Efficiency & Scalability:**

  - Use gpt-4o-mini for its affordability and speed.
  - Combine rate limiting and caching via Redis to minimize API usage and ensure smooth operation.

- **User-Centric Approach:**

  - Provide a quick, responsive tool for users who want to generate advanced Google search queries without needing to learn Google Dorks themselves.
  - Ensure that output is restricted to valid Google Dork queries by using a carefully crafted system prompt.

### Audience

- **Primary Users (Information Consumers):**

  - Individuals looking to perform advanced searches without deep technical knowledge.
  - Security researchers and enthusiasts interested in leveraging Google Dorks for information discovery.

- **Administrators/Developers:**

  - Portfolio reviewers and potential employers assessing my ability to implement secure, scalable applications.
  - Developers interested in modular, serverless, and monorepo-based architectures or AI integration.

## 3. Technical Architecture & Implementation Details

### System Architecture

- **Monorepo Structure:**

  - **Frontend (React):**
    - Single-page application with a simple form for entering a plain-English description.
    - Displays the generated Google Dork as a clickable link or copyable text and provides error feedback.
    - Display an error if user hits the rate limit or their query is rejected by the model.
  - **Backend (Express):**
    - API endpoint that receives the description, checks the cache, and either returns a cached dork or fetches a new one via OpenAI.
    - Implements rate limiting using Redis to prevent API key abuse.

- **Redis Integration:**
  - Used for two purposes:
    1. **Rate Limiting:** Ensures each IP is restricted to a defined number of API calls per minute.
    2. **Request Caching:** Stores previously generated queries and uses exact string matching to return cached results for similar requests.
- **OpenAI API Integration:**

  - Utilizes the gpt-4o-mini model with a strict system prompt to generate only valid Google Dork queries.
  - Returns structured JSON so that the frontend can easily consume the results.

- **Deployment:**
  - Hosted on Vercel with serverless functions for the Express backend.
  - Environment variables securely manage sensitive credentials (e.g., API Keys, connection URLs, etc).

### Technology Stack

| Component                | Technology/Tool             | Justification                                                                      |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------- |
| **Frontend**             | React (Vanilla)             | Lightweight, familiar, and ideal for rapid prototyping.                            |
| **Components & Styling** | Material UI                 | Robust and flexible component library.                                             |
| **Backend**              | Express                     | Simple Node.js framework for API routing and middleware.                           |
| **Cache/Rate Limiting**  | Redis (Managed via Upstash) | Provides distributed caching and robust rate limiting for serverless environments. |
| **LLM API**              | OpenAI gpt-4o-mini          | Cost-effective, supports system prompts, and delivers quick & accurate responses.  |
| **Deployment**           | Vercel                      | Easy deployment of monorepo projects with serverless functions.                    |

### Implementation Plan

1. **Monorepo Setup:**

   - Configure workspaces in the root `package.json` to manage the frontend and backend.
   - Set up local development environments for both parts.

2. **Frontend Development:**

   - Build a simple React application with a form to accept a plain-English description.
   - Display results (Google Dork) and provide user with a clickable link or the option to copy text to clipboard.

3. **Backend Development:**

   - Implement an Express server with a `/api/dork` POST endpoint.
   - Integrate with the OpenAI API using the gpt-4o-mini model.
   - Implement caching logic with Redis:
     - Normalize incoming descriptions.
     - Retrieve and compare cached queries using exact matching.
     - Store new queries with a TTL.
   - Integrate rate limiting using a Redis-backed store (via `express-rate-limit` with `rate-limit-redis`).

4. **Deployment:**

   - Configure `vercel.json` to handle both the frontend build and the backend serverless functions.
   - Securely set environment variables (API keys, Redis URL) in Vercel’s dashboard.

5. **Testing & Optimization:**
   - Ensure proper error handling and logging.
   - Optimize Redis connection management in the serverless context.
   - Test Express API endpoints using Jest.

## 4. Design Justifications & Considerations

- **Monorepo & Vercel:**

  - Simplifies development by keeping frontend and backend in one repository.
  - Vercel’s serverless functions ensure scalability and ease of deployment.
  - Works well with minimal backend providing only one API endpoint.

- **Redis for Caching & Rate Limiting:**

  - Provides persistence across stateless serverless invocations.
  - Allows both rate limiting and caching to be handled by a single external service, reducing complexity.

- **OpenAI Model Selection:**

  - gpt-4o-mini is chosen for its balance of affordability and capability.
  - System prompts ensure that the model remains on-task, generating only valid Google Dork queries.

- **Security & Scalability:**
  - Rate limiting by IP helps protect the API key from abuse.
  - Environment variables and managed services ensure that sensitive data is kept secure and the application remains scalable.

## 5. Conclusion

This project is both a practical portfolio piece and a demonstration of modern web application design leveraging a monorepo structure, Vercel’s serverless functions, Redis for caching and rate limiting, and OpenAI’s gpt-4o-mini for generating Google Dorks. This design journey outlines the technical and user-focused decisions that make the project both feasible and scalable. This design journey is intended to be a living and breathing document that can be amended throughout the development process as the application and its requirements evolve.
