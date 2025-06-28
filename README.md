# FeedFlow: An AI-Powered Blog Platform 📝

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

FeedFlow is a full-stack MERN blog application that provides a personalized content experience. It uses an intelligent, category-based recommendation engine to suggest articles to users based on their declared interests and reading history.

## ✨ Features

-   **User Authentication**: Secure login/register with JWT tokens and distinct interfaces for "reader" and "creator" roles.
-   **Blog Management**: Creators have full CRUD functionality for their blog posts.
-   **AI-Powered Recommendations**: Smart content suggestions based on user interests and reading history.
-   **Personalized Experience**: Users can customize their profiles with interests and a profile picture, view their read history, and access dedicated dashboards.
-   **Dashboard Analytics**: Track reading history and engagement metrics.
-   **Modern UI**: A responsive and mobile-friendly frontend built with React, Redux, and styled with Tailwind CSS.
-   **Real-time Updates**: Dynamic content loading and state management for a seamless user experience.

## 🧠 AI & Recommendation Approach

The core of this application is its recommendation engine. Initially, the system used NLP to analyze blog content, but this was refined to a more robust **category-based matching system**.

When a creator writes a blog, they assign it a specific category (e.g., "Technology", "Health", "Art"). The recommendation engine then matches these categories with:
1.  A user's explicitly stated interests.
2.  The categories of the articles in a user's reading history.

This method is faster, more accurate, and using natural language processing for this use case, resulting in highly relevant content suggestions.

## 🛠️ Tools & Technologies

### AI & Development Tools
- **ChatGPT**: Used for content generation, code assistance, and brainstorming.
- **Cursor AI**: Leveraged for AI-powered code completion, refactoring, and generation.

### Design & Planning Tools
- **Codia, Figma**: UI/UX design, wireframing, and prototyping.
- **Eraser.io**: Entity-Relationship (ER) diagram design for the database schema.
- **Draw.io**: Flowchart and process diagram creation.

### Development Stack
-   **Frontend**: React.js, Vite, Redux Toolkit, React Router, Tailwind CSS
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Testing**: Vitest, React Testing Library, jsdom
-   **Authentication**: JSON Web Tokens (JWT), bcryptjs
-   **File Handling**: Multer for image uploads

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   MongoDB (local installation or a cloud instance like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd blog
```

### 2. Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory
# and add the following variables:
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Navigate to the client directory from the root
cd client

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```
The app will be accessible at `http://localhost:5173`.

UI development 

 https://www.figma.com/design/CXbgsXnouTpv4spfmwYgUJ/Codia-AI-Design--Screenshot-to-Editable-Figma-Design--Community-?node-id=0-1&t=jw9JoZMgUMnJLmv8-1
 
## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for unit and component testing. The tests are located in the `client/src/tests` directory.

### Running Tests

To run the entire test suite, navigate to the `client` directory and run:

```bash
# From /client
npm test
```
This will start the Vitest test runner in watch mode.

## 🚢 Deployment

https://feedflow.deepadharsini.me/

### Frontend (Vercel)

Vercel is a great choice for deploying modern frontend frameworks like React.

1.  **Push your code to a GitHub repository.**
2.  **Sign up for Vercel** and connect your GitHub account.
3.  **Create a new project** and import your blog's repository.
4.  **Configure the project:**
    -   **Framework Preset**: Select `Vite`.
    -   **Root Directory**: Set this to `client`. This tells Vercel where your frontend code is located.
    -   **Build Command**: `npm run build` or `vite build`.
    -   **Output Directory**: `dist`.
5.  **Add Environment Variables**:
    -   Create an environment variable called `VITE_API_URL` and set its value to the URL of your deployed AWS backend (e.g., `https://your-backend-api.us-east-1.elasticbeanstalk.com`).
6.  **Deploy!** Vercel will automatically build and deploy your frontend.

🖥️ Backend Deployment (AWS EC2)
AWS EC2 is used to host the Node.js backend server for FeedFlow.

Prepare your backend code:

Ensure server.js (or app.js) includes proper CORS configuration to allow requests from the frontend URL (e.g., Vercel).

Set environment variables using .env for MONGO_URI, JWT_SECRET, etc.

Launch an EC2 Instance:

Go to the AWS Console → EC2 → Launch Instance.

Choose an Ubuntu or Amazon Linux AMI and open necessary ports (e.g., 22 for SSH, 5000 or 80 for your server).

Use a t2.micro instance (eligible for free tier).

Install Required Software on EC2:
SSH into your instance and run:

bash
Copy
Edit
sudo apt update
sudo apt install nodejs npm git
git clone <your-backend-repo-url>
cd server
npm install
Set Environment Variables:

Create a .env file or export variables directly:

bash
Copy
Edit
export MONGO_URI=your_mongo_uri
export JWT_SECRET=your_jwt_secret
Start the Server:

You can run it directly with node server.js, or use a process manager like PM2 to keep it alive:

bash
Copy
Edit
npm install -g pm2
pm2 start server.js
(Optional) Configure NGINX as a Reverse Proxy:

Install and configure NGINX to forward traffic from port 80 to your Node.js server running on port 5000.

Get Your Public IP / Domain:

Use the EC2 public IPv4 or associate a custom domain with it.

Update the frontend .env (Vercel) to point to the EC2 backend URL.
