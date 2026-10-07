# Student API

A RESTful Student Management API built using Node.js, Express.js, Prisma and PostgreSQL (NeonDB).

## Current Status

Project initialization completed.

## Tech Stack

- Node.js
- Express.js
- Prisma
- PostgreSQL
- NeonDB

## Running the Project

### Install dependencies

```bash
npm install

# Student API

A RESTful Student Management API built using Node.js, Express.js, Prisma and PostgreSQL (NeonDB).

## Features

- Create students
- Get all students
- Get a student by ID
- Update students
- Delete students
- Request validation
- Duplicate email protection
- Proper HTTP status codes
- Centralized error handling

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- NeonDB
- Postman
- Git & GitHub

## Project Structure

```text
src/
├── controllers/
│   └── studentController.js
├── middleware/
│   └── errorHandler.js
├── routes/
│   └── studentRoutes.js
├── lib/
│   └── prisma.js
└── server.js

prisma/
├── migrations/
└── schema.prisma

Setup
1. Clone the repository
git clone <your-github-repository-url>
cd student-api

2. Install dependencies
npm install

3. Configure environment variables
Create a .env file:
PORT=5000
DATABASE_URL="your-neondb-connection-string"

4. Run Prisma migration
npx prisma migrate dev

5. Start the development server
npm run dev

The API will run on:
http://localhost:5000

API Endpoints
Method	Endpoint	Description
GET	/	API health check
GET	/api/students	Get all students
GET	/api/students/:id	Get student by ID
POST	/api/students	Create a student
PUT	/api/students/:id	Update a student
DELETE	/api/students/:id	Delete a student


Create Student
Request
POST /api/students
Content-Type: application/json

{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "age": 21,
  "course": "B.Tech AI & DS"
}

Response
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": 1,
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "age": 21,
    "course": "B.Tech AI & DS"
  }
}

Get All Students
GET /api/students

Get Student By ID
GET /api/students/1

Update Student
PUT /api/students/1

{
  "name": "Rahul Sharma Updated",
  "email": "rahul.updated@example.com",
  "age": 22,
  "course": "B.Tech Computer Science"
}

Delete Student
DELETE /api/students/1

A successful deletion returns:
204 No Content

HTTP Status Codes
Status	Meaning
200	Successful request
201	Resource created
204	Resource deleted
400	Invalid request or validation error
404	Resource or route not found
409	Duplicate/conflicting resource
500	Internal server error


Validation
The API validates:
- Required fields
- Name length
- Email format
- Unique email
- Age range
- Course name
- Student ID
Database
The project uses PostgreSQL hosted on NeonDB.
Prisma is used as the ORM for database access and migrations.
Testing
The API was tested using Postman.
Test cases include:
- Successful student creation
- Get all students
- Get student by ID
- Update student
- Delete student
- Missing required fields
- Invalid email
- Invalid age
- Invalid student ID
- Non-existent student
- Duplicate email
- Unknown route
Environment Variables
The following environment variables are required:
PORT=5000
DATABASE_URL="your-neondb-connection-string"

The actual .env file is excluded from Git using .gitignore.

---

# 6.15 Don't put your real GitHub URL in the README yet

Notice this:

```text
<your-github-repository-url>

You should replace it with your actual repository URL.
For example:
git clone https://github.com/yourusername/student-api.git

Use your actual GitHub username/repository.