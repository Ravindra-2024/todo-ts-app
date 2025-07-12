import React from "react";
import { Todo, UpdateTodoRequest } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: UpdateTodoRequest) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onUpdate,
  onDelete,
  isLoading = false,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📝</div>
        <p className="text-gray-500">
          No todos yet. Add your first todo to get started!
        </p>
      </div>
    );
  }

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="space-y-6">
      {/* Pending Todos */}
      {pendingTodos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pending ({pendingTodos.length})
          </h3>
          <div className="space-y-4">
            {pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Completed ({completedTodos.length})
          </h3>
          <div className="space-y-4">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
