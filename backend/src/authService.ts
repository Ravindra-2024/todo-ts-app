import jwt from 'jsonwebtoken';
import User, { IUser } from './models/User';
import { RegisterRequest, LoginRequest, AuthResponse, JwtPayload, User as UserType } from './types';

class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN = '7d';

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    this.JWT_SECRET = secret;
  }

  // Transform Mongoose document to User interface
  private transformUser(user: IUser): UserType {
    const userObj = user.toObject();
    return {
      id: userObj._id.toString(),
      email: userObj.email,
      username: userObj.username,
      createdAt: userObj.createdAt.toISOString(),
      updatedAt: userObj.updatedAt.toISOString()
    };
  }

  // Input validation helper
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): { isValid: boolean; error?: string } {
    if (password.length < 6) {
      return { isValid: false, error: 'Password must be at least 6 characters long' };
    }
    if (password.length > 128) {
      return { isValid: false, error: 'Password cannot exceed 128 characters' };
    }
    return { isValid: true };
  }

  private validateUsername(username: string): { isValid: boolean; error?: string } {
    if (username.length < 3) {
      return { isValid: false, error: 'Username must be at least 3 characters long' };
    }
    if (username.length > 30) {
      return { isValid: false, error: 'Username cannot exceed 30 characters' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' };
    }
    return { isValid: true };
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Input validation
      if (!userData.email || !userData.username || !userData.password) {
        throw new Error('Email, username, and password are required');
      }

      if (!this.validateEmail(userData.email)) {
        throw new Error('Please provide a valid email address');
      }

      const passwordValidation = this.validatePassword(userData.password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.error!);
      }

      const usernameValidation = this.validateUsername(userData.username);
      if (!usernameValidation.isValid) {
        throw new Error(usernameValidation.error!);
      }

      // Check for existing user in a single query for better performance
      const existingUser = await User.findOne({
        $or: [
          { email: userData.email.toLowerCase() },
          { username: userData.username.toLowerCase() }
        ]
      });

      if (existingUser) {
        if (existingUser.email === userData.email.toLowerCase()) {
          throw new Error('User with this email already exists');
        } else {
          throw new Error('Username is already taken');
        }
      }

      // Create new user
      const newUser = new User({
        email: userData.email.toLowerCase(),
        username: userData.username.toLowerCase(),
        password: userData.password
      });

      await newUser.save();

      // Generate JWT token
      const token = this.generateToken(newUser);

      // Return user without password
      const userResponse = this.transformUser(newUser);
      return {
        user: userResponse,
        token
      };
    } catch (error) {
      // Re-throw validation errors
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Registration failed');
    }
  }

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    try {
      // Input validation
      if (!loginData.email || !loginData.password) {
        throw new Error('Email and password are required');
      }

      if (!this.validateEmail(loginData.email)) {
        throw new Error('Please provide a valid email address');
      }

      // Find user by email
      const user = await User.findOne({ email: loginData.email.toLowerCase() });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check password
      const isPasswordValid = await user.comparePassword(loginData.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = this.generateToken(user);

      // Return user without password
      const userResponse = this.transformUser(user);
      return {
        user: userResponse,
        token
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed');
    }
  }

  verifyToken(token: string): JwtPayload {
    try {
      if (!token) {
        throw new Error('Token is required');
      }

      const decoded = jwt.verify(token, this.JWT_SECRET) as JwtPayload;

      // Additional validation
      if (!decoded.userId || !decoded.email) {
        throw new Error('Invalid token payload');
      }

      return decoded;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token has expired');
      }
      throw new Error('Token verification failed');
    }
  }

  async getUserById(userId: string): Promise<UserType | null> {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const user = await User.findById(userId).select('-password');
      return user ? this.transformUser(user) : null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async refreshToken(userId: string): Promise<string> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      return this.generateToken(user);
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  private generateToken(user: IUser): string {
    const payload: JwtPayload = {
      userId: (user._id as any).toString(),
      email: user.email
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
      issuer: 'todo-app',
      audience: 'todo-app-users'
    });
  }
}

export default new AuthService();