# Backend - AI-Powered Google Dork Generator

## 🚀 Overview

This is the **Express backend** for the AI-Powered Google Dork Generator.  
It handles user queries, interacts with the **OpenAI API**, caches responses in **Redis**, and enforces **rate limiting**.

---

## 📌 Features

✅ **Processes API requests** from the frontend  
✅ **Integrates with OpenAI GPT-4o-mini** to generate Google Dorks  
✅ **Caches responses** using Redis for faster retrieval  
✅ **Enforces rate limiting** to prevent API key abuse

---

## 🛠️ Technology Stack

| Component               | Technology           | Purpose                                            |
| ----------------------- | -------------------- | -------------------------------------------------- |
| **Backend**             | Express.js           | Handles API requests & business logic              |
| **Cache/Rate Limiting** | Redis (Upstash)      | Prevents excessive API usage & speeds up responses |
| **LLM API**             | OpenAI `gpt-4o-mini` | Generates structured Google Dork queries           |
| **Testing**             | Jest & Supertest     | Validates API responses & Redis behavior           |
| **Deployment**          | Vercel (Serverless)  | Hosts the API with automatic scaling               |

---

## ⚡ Installation & Setup

### 1️⃣ Install Dependencies

```sh
cd backend
npm install
```

### 2️⃣ Set Up Environment Variables

Create a `.env` file in the `backend` folder:

```
PORT=3000
OPENAI_API_KEY=your-openai-api-key
UPSTASH_REDIS_URL=your-upstash-redis-url
SYSTEM_PROMPT_BASE64=your-system-prompt-in-base64 # (preserves newlines, quotes, and special characters)
```

### 3️⃣ Start the Development Server

```
npm run dev
```

Runs the API at [http://localhost:3000](http://localhost:3000).

---

## 🔄 How It Works

1. The frontend sends a POST request with a plain-English query.
2. The backend checks Redis cache for a previously generated response.
3. If cached, it returns the stored Google Dork.
4. If not cached, it queries OpenAI's GPT-4o-mini.
5. The response is stored in Redis with a TTL (time-to-live).
6. The API returns the Google Dork with an explanation.

---

## 🔗 API Endpoints

### Generate Google Dork

**POST** `/api/dork`

**Request Body:**

```json
{
  "query": "Find cybersecurity research papers in PDF format from MIT"
}
```

**Response:**

```json
{
  "dork": "site:mit.edu filetype:pdf \"cybersecurity research\"",
  "explanation": "Searches MIT's website for PDF documents related to cybersecurity research.",
  "error": false,
  "errorMessage": ""
}
```

### Error Handling

| Scenario                | Status Code | Behavior                                          |
| ----------------------- | ----------- | ------------------------------------------------- |
| **Invalid Query**       | `400`       | Returns error message                             |
| **Rate Limit Exceeded** | `429`       | Returns error message & blocks excessive requests |
| **Invalid Query**       | `500`       | Returns fallback error                            |

---

## 🔥 Rate Limiting & Caching

- **Rate Limiting**:
  - Enforced using Redis-backed `express-rate-limit`
  - Limits requests per IP to prevent API key abuse
- **Caching**:
  - Queries are stored in Redis for faster responses
  - Cached queries expire after 24 hours to ensure freshness

---

## 🧪 Running Tests

The backend includes unit and integration tests using Jest & Supertest.
These tests validate API responses, error handling, and Redis caching.

> [!WARNING]  
> Running tests will interact with your live Redis instance and clear the database upon test completion.

### Run Tests:

```sh
npm test
```

---

## ⚠️ Disclaimer

This tool is intended only for **ethical and non-malicious purposes**. Google Dorking should be used responsibly, and any unauthorized use of this tool is strictly prohibited. Additionally, the generated queries are AI-generated and may not always be accurate—users should verify results manually.

---

## 📜 License

This project is open-source under the MIT License.
