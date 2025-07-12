# Todo App Backend

A RESTful API for managing todos built with Node.js, Express.js, TypeScript, JWT authentication, and MongoDB.

## Features

- **JWT-based Authentication**
  - User registration and login
  - Password hashing with bcrypt
  - Protected routes
  - Token-based session management
- **MongoDB Database**
  - Persistent data storage
  - Mongoose ODM for data modeling
  - User-specific todos with proper indexing
  - Data validation and schema enforcement
- Create, read, update, and delete todos (user-specific)
- TypeScript for type safety
- RESTful API design
- Error handling and validation
- CORS enabled for frontend integration

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Todos (Protected Routes)

- `GET /api/todos` - Get all todos for the authenticated user
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Health Check

- `GET /health` - Check if the API is running

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB:
   - **Local MongoDB**: Install and start MongoDB locally
   - **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)

3. Create a `.env` file in the root directory:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # MongoDB Configuration
   # Local MongoDB
   MONGODB_URI=mongodb://localhost:27017/todo-app

   # MongoDB Atlas (Cloud)
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app?retryWrites=true&w=majority
   ```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

## Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  username: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Todo Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (optional),
  completed: Boolean (default: false),
  userId: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication Flow

1. **Registration**: User provides email, username, and password
2. **Login**: User provides email and password
3. **Token**: JWT token is returned and should be included in subsequent requests
4. **Protected Routes**: Include `Authorization: Bearer <token>` header

## Project Structure

```
src/
├── app.ts              # Main application file
├── types.ts            # TypeScript interfaces
├── authService.ts      # Authentication business logic
├── todoService.ts      # Todo business logic
├── authRoutes.ts       # Authentication routes
├── todoRoutes.ts       # Todo routes
├── config/
│   └── database.ts     # MongoDB connection
├── models/
│   ├── User.ts         # User model
│   └── Todo.ts         # Todo model
└── middleware/
    └── auth.ts         # Authentication middleware
```

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose ODM
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- CORS
- dotenv 