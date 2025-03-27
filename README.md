# Backend Authentication API

## Project Description

This is a backend authentication API built with Node.js, Express, and MongoDB. It provides user registration, login, logout, and profile management functionalities.

## Features

- User Signup
- User Login
- User Logout
- Get User Profile
- Update User Profile
- Password Hashing
- JWT Authentication

## Prerequisites

- Node.js (v16 or later)
- MongoDB
- npm

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/backend-assignment.git
cd backend-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Application

For development:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Login user
- `POST /api/auth/logout`: Logout user

### User

- `GET /api/users/profile`: Get current user profile
- `POST /api/users/update`: Update user profile

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js

## License

ISC
