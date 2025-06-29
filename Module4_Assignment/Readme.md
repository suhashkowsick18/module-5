LMS Backend API (Module 4 Assignment)

A secure backend for a Learning Management System built with Node.js, Express.js, TypeScript, and MongoDB, featuring JWT authentication and role-based access control (RBAC).

✨ My Learning Journey & Thought Process

I worked through the assignment by breaking down each security challenge and converting it into a practical implementation. I asked myself technical questions at each stage to make sure I understood why each step matters.

🧐 Technical Questions That Guided My Solution

How do we secure user passwords?

Using bcrypt.hash() during registration and bcrypt.compare() during login.

What does JWT do in authentication?

It creates a secure token with user info that is sent on every request to verify identity.

Where should the JWT be stored and how is it sent to the backend?

Stored in localStorage or sessionStorage; sent via Authorization: Bearer <token> header.

What is the risk of exposing JWT_SECRET?

Attackers can forge tokens. We keep it hidden in .env to protect the app.

How does the backend know the user's role?

The role is included in the JWT payload and checked in the middleware.

How do we restrict access to /users for only admins?

By chaining authenticateJWT and authorizeRole("admin") middleware.

Why separate authenticateJWT and authorizeRole?

It keeps the code reusable and easy to apply to different roles and routes.

What happens if a student tries to access /users?

They receive a 403 Forbidden response.

How do we catch duplicate email registration?

By checking MongoDB error code 11000 and returning a custom message.

Why use TypeScript for this project?

For better type safety, cleaner code, and IDE support during development.

🌟 Features Implemented

Password hashing using bcrypt

JWT-based login authentication

Role-based access control using custom middleware

Environment variable management with dotenv

Protected admin-only API endpoint

Clean code with modular folder structure

Tested thoroughly using Postman

📂 Folder Structure

Module4_Assignment_Suhash/
├── .env                          # Sensitive config (not committed)
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript compiler config
└── src/
    ├── server.ts               # Main entry point
    ├── models/
    │   └── user.model.ts       # Mongoose user schema
    ├── middleware/
    │   └── authMiddleware.ts   # JWT and role middleware
    └── routes/
        └── userRoutes.ts       # API routes (register, login, users)

🚀 API Endpoints

Method

Route

Description

Auth Required

Role Required

POST

/api/register

Register a new user

No

No

POST

/api/login

Login and get JWT token

No

No

GET

/api/users

Get all users (admin only)

Yes

Admin

📝 Sample Payloads

POST /api/register

{
  "name": "Suhash",
  "email": "suhash@example.com",
  "password": "mypassword",
  "role": "admin"
}

POST /api/login

{
  "email": "suhash@example.com",
  "password": "mypassword"
}

GET /api/users

Header:

Authorization: Bearer <JWT_TOKEN>

📚 Setup & Run Instructions

Install dependencies:

npm install

Create a .env file:

PORT=3000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_secret_key

Start the development server:

npm run dev

Test the API with Postman:

Register a user

Login to get JWT

Use JWT in header to access /api/users

📈 What I Learned

How to use bcrypt for password hashing

How JWT works and how to protect routes

Why RBAC is critical in real-world apps

How to write reusable middleware

How to organize scalable backend projects

This assignment helped me build a real-world backend system with professional-grade security and code structure. I'm now confident using JWT and RBAC in full-stack applications.

