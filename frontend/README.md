# Todo App Frontend

A modern React application for managing todos with TypeScript, Tailwind CSS, and JWT authentication.

## Features

- **JWT Authentication**
  - User registration and login
  - Protected routes
  - Automatic token management
  - User session persistence
- Create, read, update, and delete todos
- Real-time updates
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Modern React 18 with hooks
- Error handling and loading states
- Beautiful and intuitive UI

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Production

Build the project:
```bash
npm run build
```

## Authentication Flow

1. **Registration**: Users can create a new account with email, username, and password
2. **Login**: Users can sign in with their email and password
3. **Token Storage**: JWT tokens are automatically stored in localStorage
4. **Protected Routes**: Todo functionality is only available to authenticated users
5. **Logout**: Users can log out, which clears their session

## Project Structure

```
src/
├── components/
│   ├── AuthPage.tsx      # Authentication page (login/register)
│   ├── LoginForm.tsx     # Login form component
│   ├── RegisterForm.tsx  # Registration form component
│   ├── TodoForm.tsx      # Form for adding new todos
│   ├── TodoItem.tsx      # Individual todo item component
│   └── TodoList.tsx      # List of todos
├── contexts/
│   └── AuthContext.tsx   # Authentication context provider
├── services/
│   ├── authService.ts    # Authentication API service
│   └── todoService.ts    # Todo API service
├── types/
│   ├── auth.ts           # Authentication TypeScript interfaces
│   └── todo.ts           # Todo TypeScript interfaces
├── App.tsx               # Main application component
└── index.css             # Global styles with Tailwind
```

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`.

**Authentication Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

**Todo Endpoints (Protected):**
- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

Make sure the backend server is running before using the frontend.

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- JWT for authentication
- React Context for state management
- Create React App
