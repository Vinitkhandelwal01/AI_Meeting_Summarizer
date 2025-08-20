# 📝 AI Meeting Summarizer

AI Meeting Summarizer is a full-stack application that allows you to **upload meeting transcripts**, generate **AI-powered summaries**, and share them via **email**.  
Built with **MERN Stack** + **Groq API**.

---

## ✨ Features
- 📂 Upload meeting transcript (`.txt` file)
- 🤖 Generate AI-based summaries using **Groq LLaMA 3**
- 🎯 Custom summarization prompts (executive summary, action items, key decisions, etc.)
- 📧 Share summaries with multiple recipients via email
- 🛠️ Frontend (React + TailwindCSS), Backend (Node.js + Express + MongoDB)

---

## 🚀 Tech Stack
- **Frontend**: React, TailwindCSS, Axios, Lucide Icons  
- **Backend**: Node.js, Express.js, Mongoose  
- **Database**: MongoDB  
- **AI Model**: Groq LLaMA 3 (8B)  
- **Email Service**: Nodemailer (or your SMTP)  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Vinitkhandelwal01/AI_Meeting_Summarizer.git
cd AI_Meeting_Summarizer
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside backend/ with the following:

### env
```PORT=4000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
### Run backend server:
```
npm start 
```
Server will start on http://localhost:4000

### 3️⃣ Frontend Setup
```cd ../frontend
npm install
```
Create a .env file inside frontend/ with:

### env
```
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

### Run frontend:
```
npm start
```
Frontend will start on http://localhost:3000
