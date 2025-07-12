import { Router, Request, Response } from 'express';
import todoService from './todoService';
import { CreateTodoRequest, UpdateTodoRequest } from './types';
import { authenticateToken } from './middleware/auth';

const router = Router();

// Apply authentication middleware to all todo routes
router.use(authenticateToken);

// GET /api/todos - Get all todos for the authenticated user
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const todos = await todoService.getAllTodos(userId);
    res.json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch todos',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/todos/:id - Get todo by ID for the authenticated user
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const todo = await todoService.getTodoById(id, userId);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/todos - Create new todo for the authenticated user
router.post('/', async (req: Request, res: Response) => {
  try {
    const todoData: CreateTodoRequest = req.body;
    const userId = req.user!.userId;

    if (!todoData.title || todoData.title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const newTodo = await todoService.createTodo({
      title: todoData.title.trim(),
      description: todoData.description?.trim()
    }, userId);

    res.status(201).json({
      success: true,
      data: newTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT /api/todos/:id - Update todo for the authenticated user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todoData: UpdateTodoRequest = req.body;
    const userId = req.user!.userId;

    const updatedTodo = await todoService.updateTodo(id, todoData, userId);

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE /api/todos/:id - Delete todo for the authenticated user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const deleted = await todoService.deleteTodo(id, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete todo',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 