## Kanban Board App

A full-stack Kanban Board application built with:

-  **Frontend**: Vue 3 + Tailwind CSS
-  **Backend**: Node.js + Express + MongoDB

Users can create sections (e.g., "To Do", "In Progress", "Done"), add tasks, move tasks across sections using drag-and-drop, and manage them with real-time updates.

---

##  Features

- Create, read, update, and delete **tasks**
- Create and manage **sections/columns**
- Drag and drop tasks between sections
- Task assignment with due date and description
- Responsive layout for all devices (mobile, tablet, desktop)
- Modular, clean and maintainable codebase

---

##  Installation & Setup

###  Backend Setup (Node.js + MongoDB)

### 1. Clone the repository

git clone https://github.com/your-username/kanban-app.git
cd kanban-app
navigate to backend
cd backend

### 2. Install dependencies
npm install

### 3. Environment Variables
Create a .env file in the root directory and add your MongoDB connection string:
MONGO_URI=your-mongodb-connection-uri

### 4 Start the Server
npm start

### Frontend Setup (Vue.js + Tailwind)
Navigate to Frontend
cd ../frontend

### 1. Install dependencies
npm install

### 2. Environment Variables
Create a .env file in the root directory and configure your backend URL
VITE_BACKEND_URL=https://your-backend-url.com
Replace `https://your-backend-url.com` with your actual backend API endpoint in services/api.js

### 2 Start the Server
npm run dev

