// importerar Todo klassen från todo.ts filen
import { Todo } from './todo';

// definerar TodoList klassen
export class TodoList {
  todos: Todo[];

  // konstruktorn för TodoList klassen
  constructor() {
    this.todos = [];
    this.loadFromLocalStorage();
  }

  // metod för att lägga till en ny todo
  addTodo(task: string, priority: number): boolean {
    if (!task || priority < 1 || priority > 3) {
      return false;
    }
    const newTodo: Todo = {
      task: task,
      completed: false,
      priority: priority,
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return true;
  }

  // metod för att markera en todo som klar
  markTodoCompleted(todoIndex: number): void {
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      this.todos[todoIndex].completed = true;
      this.saveToLocalStorage();
    }
  }

  // metod för att hämta alla todos
  getTodos(): Todo[] {
    return this.todos;
  }

  // metod för att spara todos till local storage
  saveToLocalStorage(): void {
    // kontrollerar om window är definerad och om localStorage är tillgängligt
    if (typeof window !== 'undefined' && window.localStorage) {
      // sparar todos som JSON i local storage
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  // metod för att ladda todos från local storage
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('todos');
      if (data) {
        this.todos = JSON.parse(data);
      }
    }
  }

  // metod för att ta bort en todo
  removeTodo(todoIndex: number): void {
    // kontrollerar om todoIndex är inom gränserna för todos arrayen
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      // tar bort todo från arrayen
      this.todos.splice(todoIndex, 1);
      // sparar ändringarna till local storage
      this.saveToLocalStorage();
    }
  }

  // metod för att uppdatera en todo
  updateTodo(
    todoIndex: number,
    updatedTask: string,
    updatedPriority: number
  ): boolean {
    // kontrollerar om updatedTask och updatedPriority är giltiga
    if (!updatedTask || updatedPriority < 1 || updatedPriority > 3) {
      return false;
    }
    // kontrollerar om todoIndex är inom gränserna för todos arrayen
    if (todoIndex >= 0 && todoIndex < this.todos.length) {
      // uppdaterar todoens egenskaper
      this.todos[todoIndex].task = updatedTask;
      this.todos[todoIndex].priority = updatedPriority;
      // sparar ändringarna till local storage
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }
}
