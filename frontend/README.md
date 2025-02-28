# Frontend - AI-Powered Google Dork Generator

## 🚀 Overview

This is the **React frontend** for the AI-Powered Google Dork Generator.  
It provides a simple UI where users can enter a **plain-English search request**, and the app converts it into a **Google Dork query**.

## 📌 Features

✅ User-friendly interface for entering queries  
✅ Displays generated Google Dork as a **clickable search link**  
✅ Shows errors when queries are invalid or rate limits are exceeded  
✅ Works seamlessly with the **Express backend**

---

## 🛠️ Technology Stack

| Component          | Technology   | Purpose                                |
| ------------------ | ------------ | -------------------------------------- |
| **Frontend**       | React (Vite) | Provides a fast, modular UI framework  |
| **Styling**        | Material UI  | Pre-styled components for easy theming |
| **State Handling** | React Hooks  | Manages state for query input/results  |
| **API Requests**   | Fetch API    | Sends requests to the backend API      |

---

## 📂 Project Structure

```
📂 frontend/ # React frontend
│── 📂 src/ # React components & logic
│── 📂 public/ # Static assets
│── 📄 .env # Create this file and add your variables
│── 📄 package.json # Frontend dependencies & scripts
│── 📄 README.md # Frontend-specific documentation

```

---

## ⚡ Installation & Setup

### 1️⃣ Install Dependencies

```sh
cd frontend
npm install
```

### 2️⃣ Set Up Environment Variables

```
VITE_API_BASE_URL=http://localhost:3000
```

### 3️⃣ Start the Development Server

```
npm run dev
```

Runs on [http://localhost:5173](http://localhost:5173) by default.

---

## 🔄 How It Works

1. The user enters a plain-English query.
2. The form submits the request to the backend API (`/api/dork`).
3. The backend processes the request using OpenAI and Redis caching.
4. The frontend displays the Google Dork as a clickable link.

---

## 🔗 API Integration

This frontend communicates with the backend API via:

```
POST /api/dork
```

Example request:

```json
{
  "query": "Find PDF research papers on AI from Stanford"
}
```

Example response:

```json
{
  "dork": "site:stanford.edu filetype:pdf \"AI research\"",
  "explanation": "Finds AI research papers in PDF format from Stanford.",
  "error": false,
  "errorMessage": ""
}
```

---

## 🔥 Error Handling

| Scenario                | Behavior                                  |
| ----------------------- | ----------------------------------------- |
| **Invalid Query**       | Displays an error message                 |
| **Rate Limit Exceeded** | Notifies user and suggests retrying later |
| **Backend API Issues**  | Shows a fallback error message            |

---

## ⚠️ Disclaimer

This tool is intended only for **ethical and non-malicious purposes**. Google Dorking should be used responsibly, and any unauthorized use of this tool is strictly prohibited. Additionally, the generated queries are AI-generated and may not always be accurate—users should verify results manually.

---

## 📜 License

This project is open-source under the MIT License.
