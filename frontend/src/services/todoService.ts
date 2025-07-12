import axios from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest, ApiResponse } from '../types/todo';
import authService from './authService';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await axios.get<ApiResponse<Todo[]>>(`${API_BASE_URL}/todos`, {
        headers: getAuthHeaders()
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  async getTodoById(id: string): Promise<Todo | null> {
    try {
      const response = await axios.get<ApiResponse<Todo>>(`${API_BASE_URL}/todos/${id}`, {
        headers: getAuthHeaders()
      });
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  },

  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    try {
      const response = await axios.post<ApiResponse<Todo>>(`${API_BASE_URL}/todos`, todoData, {
        headers: getAuthHeaders()
      });
      return response.data.data!;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  async updateTodo(id: string, todoData: UpdateTodoRequest): Promise<Todo> {
    try {
      const response = await axios.put<ApiResponse<Todo>>(`${API_BASE_URL}/todos/${id}`, todoData, {
        headers: getAuthHeaders()
      });
      return response.data.data!;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  async deleteTodo(id: string): Promise<void> {
    try {
      await axios.delete<ApiResponse<void>>(`${API_BASE_URL}/todos/${id}`, {
        headers: getAuthHeaders()
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};

export default todoService;