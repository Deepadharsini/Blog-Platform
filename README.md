# FeedFlow: An AI-Powered Blog Recommendation Platform

FeedFlow is a full-stack blog application that provides a personalized content experience. It uses an AI-driven recommendation engine to suggest articles to users based on their declared interests and reading history. Creators have a dedicated dashboard to manage their content, while readers get a dynamically curated feed.

## ✨ Core Features

-   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Role-Based Access**: Distinct interfaces and permissions for "reader" and "creator" roles.
-   **CRUD Functionality**: Creators can create, read, update, and delete their blog posts.
-   **AI Recommendation Engine**: A dynamic system that suggests relevant articles by creating a combined interest profile from user's explicit interests and reading history.
-   **Personalized Dashboards**: Separate dashboards for creators to manage their blogs and for users to see their reading history.
-   **Modern UI**: A responsive and intuitive user interface built with React and styled with Tailwind CSS.

## 🛠️ Tech Stack

-   **Frontend**: React, Redux, React Router, Tailwind CSS, Vite
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs
-   **AI/NLP**: No external libraries, custom logic for category matching.

## 📁 Project Structure

```
blog/
├── client/         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│   └── package.json
│
└── server/         # Node.js Backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── app.js
```

## 📋 Prerequisites

-   Node.js (v14 or later)
-   npm
-   MongoDB (local installation or a cloud service like MongoDB Atlas)

## 🚀 Installation & Setup

Follow these steps to get the application running locally.

### 1. Backend Setup

First, navigate to the `server` directory. Since there is no `package.json` in the server directory, you will need to manually install the required packages.

```bash
# Navigate to the server directory
cd server

# Install dependencies manually
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
```

Next, you need to create a `.env` file in the `server` directory to store your environment variables.

```bash
# In the /server directory, create a .env file
touch .env
```

Open the `.env` file and add the following variables. Replace the placeholder values with your actual MongoDB connection string and a secret key for JWT.

```env
# /server/.env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### 2. Frontend Setup

In a separate terminal, navigate to the `client` directory and install the dependencies using npm.

```bash
# Navigate to the client directory from the root
cd client

# Install dependencies
npm install
```

### 3. Running the Application

Once both the backend and frontend are set up, you can start their development servers.

-   **To start the backend server:**
    Run this command from the `server` directory.

    ```bash
    # From /server
    node app.js
    ```
    The API should now be running at `http://localhost:5000`.

-   **To start the frontend development server:**
    Run this command from the `client` directory.

    ```bash
    # From /client
    npm run dev
    ```
    The application should now be accessible at `http://localhost:5173` (or another port if 5173 is in use).

🌐 Live Demo
Frontend Link | Backend API

🧠 AI Explanation
We extract blog keywords and sentiment, convert them to vectors, and match users to blogs using cosine similarity based on reading history and interests.

🧪 Test Report
See /docs/test-report.md 
