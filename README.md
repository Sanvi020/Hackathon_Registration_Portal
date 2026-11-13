# Hackathon Registration Portal

A full-stack web application that allows users to explore hackathons, register for participation, and manage their registrations through a personalized dashboard.

## Features

- User Registration and Login
- Email OTP Verification
- Secure Authentication
- Protected Routes
- Hackathon Registration
- User Dashboard

## Tech Stack

### Frontend
- React.js
- CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer

## Project Structure

Hackathon-Registration-Portal/
├── Backend/
└── Frontend/

## Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Hackathon-Registration-Portal
```

### 2. Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Create a `.env` file inside the Backend folder with the required environment variables.

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

### 4. Environment Variables

Configure the following variables in your Backend `.env` file (use the exact names from your code):

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- Email configuration variables

Never commit your `.env` file or expose sensitive credentials.