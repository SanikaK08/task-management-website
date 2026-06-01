# Task Management System - Frontend

A React-based frontend for the Task Management System backend API.

## Features

- **User Authentication**: Register and login functionality
- **Task Management**: Create, read, update, and delete tasks
- **Task Status & Priority**: Track task status (pending, in-progress, completed) and priority levels
- **Responsive Design**: Works on desktop and mobile devices
- **Token-based Authentication**: Secure JWT token handling

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Make sure your backend is running on `http://localhost:5000`.

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   │   └── TaskCard.js
│   ├── pages/
│   │   ├── LoginPage.js
│   │   └── TaskPage.js
│   ├── services/
│   │   └── api.js          # API calls
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## API Endpoints Used

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks` - Get all tasks
- `GET /api/v1/tasks/:id` - Get task by ID
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task (admin only)

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## Notes

- Authentication token is stored in localStorage
- CORS must be enabled on the backend
- Backend should be running on port 5000
