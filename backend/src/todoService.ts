import Todo, { ITodo } from './models/Todo';
import { CreateTodoRequest, UpdateTodoRequest } from './types';
import mongoose from 'mongoose';

// Helper function to transform Mongoose document to plain object with id
const transformTodo = (todo: ITodo) => {
  const todoObj = todo.toObject();
  return {
    id: todoObj._id.toString(),
    title: todoObj.title,
    description: todoObj.description,
    completed: todoObj.completed,
    createdAt: todoObj.createdAt.toISOString(),
    updatedAt: todoObj.updatedAt.toISOString()
  };
};

class TodoService {
  async getAllTodos(userId: string) {
    try {
      const todos = await Todo.find({ userId: new mongoose.Types.ObjectId(userId) })
        .sort({ createdAt: -1 });
      return todos.map(transformTodo);
    } catch (error) {
      throw new Error('Failed to fetch todos');
    }
  }

  async getTodoById(id: string, userId: string) {
    try {
      const todo = await Todo.findOne({ 
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
      });
      return todo ? transformTodo(todo) : null;
    } catch (error) {
      return null;
    }
  }

  async createTodo(todoData: CreateTodoRequest, userId: string) {
    try {
      const newTodo = new Todo({
        title: todoData.title,
        description: todoData.description,
        userId: new mongoose.Types.ObjectId(userId)
      });

      await newTodo.save();
      return transformTodo(newTodo);
    } catch (error) {
      throw new Error('Failed to create todo');
    }
  }

  async updateTodo(id: string, todoData: UpdateTodoRequest, userId: string) {
    try {
      const updatedTodo = await Todo.findOneAndUpdate(
        { 
          _id: new mongoose.Types.ObjectId(id),
          userId: new mongoose.Types.ObjectId(userId)
        },
        { 
          ...todoData,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      );
      
      return updatedTodo ? transformTodo(updatedTodo) : null;
    } catch (error) {
      return null;
    }
  }

  async deleteTodo(id: string, userId: string): Promise<boolean> {
    try {
      const result = await Todo.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId)
      });

      return !!result;
    } catch (error) {
      return false;
    }
  }
}

export default new TodoService(); 