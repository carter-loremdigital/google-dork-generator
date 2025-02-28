# AI-Powered Google Dork Generator

## 🚀 Overview

The **AI-Powered Google Dork Generator** is a web application that converts a user's plain-English query into a structured Google Dork query. This tool leverages OpenAI's `gpt-4o-mini` model to generate search queries while enforcing strict guidelines via a system prompt. It is designed as a lightweight portfolio project, showcasing full-stack development skills, API integration, and serverless deployment.

### 🔥 Key Features

- **Frontend:** Built with React, allowing users to input their search description and receive a Google Dork.
- **Backend:** Implemented in Express, acting as a proxy to the OpenAI API.
- **Rate Limiting & Caching:** Uses Redis to enforce API limits and cache similar requests.
- **Monorepo Structure:** Contains both the frontend and backend in the same repository.
- **Deployment:** Hosted on **Vercel**, utilizing serverless functions for backend operations.

---

## 🎯 Goals & Audience

### 🎨 Motivation

- **Portfolio Enhancement:** Showcases API integration, caching strategies, and serverless deployment.
- **Cost Efficiency & Scalability:** Optimized usage of OpenAI's API and Redis caching for efficiency.
- **User-Friendly Experience:** Enables users to generate **advanced Google search queries** without needing expertise in Google Dork syntax.

### 🎯 Target Audience

- **Information Seekers:** Users looking to refine their Google search queries.
- **Developers & Hiring Managers:** Reviewing code quality, architecture, and implementation.

---

## 🛠️ Technology Stack

| Component          | Technology           | Purpose                                         |
| ------------------ | -------------------- | ----------------------------------------------- |
| **Frontend**       | React (Vanilla)      | UI for entering queries & displaying results    |
| **Styling**        | Material UI          | Pre-styled, accessible UI components            |
| **Backend**        | Express              | API server to handle OpenAI requests            |
| **Database/Cache** | Redis (Upstash)      | Stores generated queries & enforces rate limits |
| **AI Model**       | OpenAI `gpt-4o-mini` | Generates structured Google Dork queries        |
| **Deployment**     | Vercel               | Serverless hosting for frontend & backend       |

---

## 📌 Project Structure

```
📂 google-dork-generator/
│── 📂 frontend/ # React frontend
│ │── 📂 src/ # React components & logic
│ │── 📂 public/ # Static assets
│ │── 📄 .env # Create this file and add your variables
│ │── 📄 package.json # Frontend dependencies & scripts
│ │── 📄 README.md # Frontend-specific documentation
│
│── 📂 backend/ # Express backend
│ │── 📂 src/ # Express server & routes
│ │── 📂 tests/ # Jest test cases
│ │── 📄 .env # Create this file and add your variables
│ │── 📄 package.json # Backend dependencies & scripts
│ │── 📄 README.md # Backend-specific documentation
│
│── 📂 docs/ # Documentation & design references
│ │── 📂 sketches/ # Initial UI sketches
│ │── 📄 DESIGN_JOURNEY.md # Project planning & design notes
│
│── 📄 .gitignore # Ignore node_modules, .env, and other files
│── 📄 package.json # Root package.json (monorepo setup)
│── 📄 README.md # Main project overview
│── 📄 vercel.json # Configuration for deployment on Vercel
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-github-username/google-dork-generator.git
cd google-dork-generator
```

### 2️⃣ Install Dependencies (Frontend )

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the `backend` folder and add the following variables:

```
PORT=3000
OPENAI_API_KEY=your-openai-api-key
UPSTASH_REDIS_URL=your-upstash-redis-url
```

Create another `.env` file in the `frontend` folder and add the following variables:

```
VITE_API_BASE_URL=http://localhost:3000
```

### 4️⃣ Start the Development Server

From the root of the project folder, run:

```
npm run dev
```

This will start both the frontend and backend.

---

## 🧪 Running Tests

This project includes integration tests for the backend using Jest and Supertest. Redis caching is also validated using your live Redis instance.

> [!WARNING]  
> Running tests will interact with your live Redis instance and clear the database upon test completion.

### Run Tests:

```sh
npm test
```

---

## 🔄 API Usage

### Endpoint:

`POST /api/dork`

#### Request Body:

```json
{
  "query": "Find cybersecurity research papers in PDF format from MIT"
}
```

#### Response:

```json
{
  "dork": "site:mit.edu filetype:pdf \"cybersecurity research\"",
  "explanation": "Searches MIT's website for PDF documents related to cybersecurity research.",
  "error": false,
  "errorMessage": ""
}
```

---

## 🔒 Security & Safeguards

- **Rate Limiting**: Each user is restricted to a set number of API requests per minute using Redis-based IP rate limiting.
- **Query Restrictions**: OpenAI is instructed via system prompts to reject malicious or unauthorized queries.
- **Environment Variables**: API keys and sensitive data are never hardcoded and are securely stored using .env files.

---

## 🚀 Deployment

This project is deployed on [Vercel](https://vercel.com/).

### Deployment Steps

1. Push changes to GitHub
2. Connect the repository to Vercel.
3. Set environment variables in Vercel Dashboard.
4. Deploy 🎉.

---

## ⚠️ Disclaimer

This tool is intended only for **ethical and non-malicious purposes**. Google Dorking should be used responsibly, and any unauthorized use of this tool is strictly prohibited. Additionally, the generated queries are AI-generated and may not always be accurate—users should verify results manually.

---

## 📜 License

This project is open-source under the MIT License.
