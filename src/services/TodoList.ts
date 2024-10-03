import { Todo } from "../models/Todo";

export class TodoList {
  private todos: Todo[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }
  addTodo(task: string, priority: number): boolean {
    // Validera task: måste vara en icke-tom sträng
    if (typeof task !== "string" || task.trim() === "") {
      return false;
    }
    // Validera priority: måste vara ett heltal mellan 1 och 3
    if (!Number.isInteger(priority) || priority < 1 || priority > 3) {
      return false;
    }
    const newTodo: Todo = {
      task: task.trim(),
      completed: false,
      priority: priority,
      createdDate: new Date().toISOString(),
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return true;
  }

  markTodoCompleted(todoIndex: number): void {
    // Kontrollera om indexet är giltigt
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].completed = true;
      this.todos[todoIndex].completedDate = new Date().toISOString();
      this.saveToLocalStorage();
    }
  }

  editTodo(todoIndex: number, task: string, priority: number): boolean {
    // Kontrollera om indexet är giltigt
    if (todoIndex < 0 || todoIndex >= this.todos.length) {
      return false;
    }
    // Validera task: måste vara en icke-tom sträng
    if (typeof task !== "string" || task.trim() === "") {
      return false;
    }
    // Validera priority: måste vara ett heltal mellan 1 och 3
    if (!Number.isInteger(priority) || priority < 1 || priority > 3) {
      return false;
    }
    this.todos[todoIndex].task = task.trim();
    this.todos[todoIndex].priority = priority;
    this.saveToLocalStorage();
    return true;
  }

  deleteTodo(todoIndex: number): void {
    // Kontrollera om indexet är giltigt
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos.splice(todoIndex, 1);
      this.saveToLocalStorage();
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  saveToLocalStorage(): void {
    // Spara todos till LocalStorage
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  loadFromLocalStorage(): void {
    // Ladda todos från LocalStorage
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }
}
