# Todo App - Full Stack TypeScript with JWT Authentication and MongoDB

A complete todo application built with TypeScript, featuring a Node.js/Express.js backend API with JWT authentication, MongoDB database, and a React 18 frontend.

## 🚀 Features

### Backend (Node.js + Express.js + TypeScript + JWT + MongoDB)
- **JWT-based Authentication**
  - User registration and login
  - Password hashing with bcrypt
  - Protected routes with middleware
  - Token-based session management
- **MongoDB Database**
  - Persistent data storage with Mongoose ODM
  - User-specific todos with proper indexing
  - Data validation and schema enforcement
  - Support for both local MongoDB and MongoDB Atlas
- RESTful API with full CRUD operations
- User-specific todos (each user sees only their own todos)
- TypeScript for type safety
- CORS enabled for frontend integration
- Error handling and validation
- Health check endpoint

### Frontend (React 18 + TypeScript + Tailwind CSS)
- **JWT Authentication UI**
  - Beautiful login and registration forms
  - Automatic token management
  - Protected routes and components
  - User session persistence
- Modern React with hooks and context
- TypeScript for type safety
- Beautiful UI with Tailwind CSS
- Real-time updates
- Responsive design
- Error handling and loading states

## 📁 Project Structure

```
todo-ts/
├── backend/                 # Node.js/Express.js API with JWT & MongoDB
│   ├── src/
│   │   ├── app.ts          # Main application
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── authService.ts  # Authentication logic
│   │   ├── todoService.ts  # Todo business logic
│   │   ├── authRoutes.ts   # Authentication routes
│   │   ├── todoRoutes.ts   # Todo routes
│   │   ├── config/
│   │   │   └── database.ts # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.ts     # User model
│   │   │   └── Todo.ts     # Todo model
│   │   └── middleware/
│   │       └── auth.ts     # JWT middleware
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                # Environment variables
│   └── README.md
├── frontend/               # React 18 application with auth
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AuthPage.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── services/       # API services
│   │   │   ├── authService.ts
│   │   │   └── todoService.ts
│   │   ├── types/          # TypeScript interfaces
│   │   │   ├── auth.ts
│   │   │   └── todo.ts
│   │   └── App.tsx         # Main component
│   ├── package.json
│   └── README.md
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB:
   - **Local MongoDB**: Install and start MongoDB locally
   - **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)

4. Configure environment variables:
   ```bash
   # The .env file is already created with default values
   # Edit it to match your MongoDB connection string
   ```

   Example `.env` file:
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

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 🔐 Authentication Flow

1. **Registration**: Users create an account with email, username, and password
2. **Login**: Users sign in with email and password
3. **JWT Token**: Server returns a JWT token for authentication
4. **Protected Routes**: All todo operations require valid JWT token
5. **User-Specific Data**: Each user only sees and manages their own todos
6. **Logout**: Users can log out to clear their session

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Todos (Protected - Requires JWT Token)
- `GET /api/todos` - Get all todos for authenticated user
- `GET /api/todos/:id` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Health Check
- `GET /health` - Check if the API is running

## 🗄️ Database Schema

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

## 🎯 Usage

1. Start both the backend and frontend servers
2. Open your browser and navigate to `http://localhost:3000`
3. Register a new account or login with existing credentials
4. Add, edit, complete, and delete your personal todos
5. Todos are automatically saved and synchronized per user

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose ODM
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- CORS
- dotenv

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Axios
- JWT for authentication
- React Context for state management
- Create React App

## 📝 Development

### Backend Commands
```bash
npm run dev    # Start development server with hot reload
npm run build  # Build for production
npm start      # Start production server
```

### Frontend Commands
```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## 🔧 Customization

### MongoDB Configuration
- **Local MongoDB**: Use `mongodb://localhost:27017/todo-app`
- **MongoDB Atlas**: Use your Atlas connection string
- **Custom Database**: Modify the connection string in `.env`

### JWT Configuration
- Modify JWT secret in `.env` file
- Adjust token expiration in `authService.ts`
- Customize JWT payload structure as needed

### Styling
The frontend uses Tailwind CSS. You can customize the design by:
1. Modifying the Tailwind classes in components
2. Extending the Tailwind configuration in `tailwind.config.js`
3. Adding custom CSS in `src/index.css`

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: All todo operations require authentication
- **User Isolation**: Users can only access their own data
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Secure error messages without exposing sensitive data
- **Database Security**: MongoDB connection with proper authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE). 