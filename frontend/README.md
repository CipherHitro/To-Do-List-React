# 📝 To-Do List Web App

A simple and responsive full-stack To-Do List application with a React frontend and an Express + MongoDB backend. This app allows users to add, edit, complete, delete, and filter tasks with persistent storage in a MongoDB database.

## 🚀 Features

- ➕ Add new tasks
- ✏️ Edit existing tasks
- ✅ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 🔍 Toggle to show/hide completed tasks
- 🌐 Full CRUD functionality with backend integration
- 🧠 Data stored in MongoDB via Mongoose
- 🎯 Responsive design with scrollable task list
- 💻 Separated Frontend & Backend for modular development

## 🛠️ Tech Stack

🔹Frontend
- React
- Tailwind CSS
- JavaScript

🔹Backend
- Node.js
- Express.js
- MongoDB
- CORS


## 🛠️ Installation & Setup

Follow these steps to get the project running on your local machine:



### 1. Clone the repository

```bash
git clone https://github.com/CipherHitro/To-Do-List-React.git
cd To-Do-List-React
```

### 2. Create a .env file in the backend/ directory with: 
```bash
MONGO_URI=mongodb://localhost:27017/todolist
PORT=5000
```

### 3. Backend Setup

```bash
cd backend
npm install
```
### 4. Start the Backend server

```bash
nodemon index.js
```

### 5. Frontend Setup - Open new terminal 

```bash
cd frontend
npm install
```
### 3. Start the frontend server

```bash
npm run dev
```
