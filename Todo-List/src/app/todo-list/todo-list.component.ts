// importerar nödvändiga moduler
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoList } from '../models/todo-list';
import { Todo } from '../models/todo';

// definerar TodoListComponent klassen
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
// definerar TodoListComponent klassen
export class TodoListComponent {
  // definerar todoList variabeln
  todoList: TodoList;
  newTask: string = '';
  newPriority: number | null = null;
  errorMessage: string = '';
  editingIndex: number | null = null;
  editTask: string = '';
  editPriority: number = 1;
  successMessage: string = '';

  constructor() {
    this.todoList = new TodoList();
  }

  // definerar addTodo metoden
  addTodo(): void {
    if (!this.newTask.trim() || this.newPriority === null) {
      this.errorMessage = 'Felaktiga inmatade värden. Kontrollera att uppgiften inte är tom och att prioriteringen är mellan 1 och 3.';
      this.successMessage = '';
      return;
    }

    const success = this.todoList.addTodo(this.newTask, this.newPriority);
    if (!success) {
      this.errorMessage = 'Felaktiga inmatade värden. Kontrollera att uppgiften inte är tom och att prioriteringen är mellan 1 och 3.';
      this.successMessage = '';
    } else {
      this.errorMessage = '';
      this.successMessage = 'Uppgift tillagd!';
      this.newTask = '';
      this.newPriority = null;
      setTimeout(() => (this.successMessage = ''), 2000);
    }
  }

  // definerar startEditing metoden
  startEditing(index: number): void {
    this.editingIndex = index;
    // sätt editTask och editPriority till värdena från todoList
    this.editTask = this.todos[index].task;
    this.editPriority = this.todos[index].priority;
  }

  // definerar saveEdit metoden
  saveEdit(): void {
    if (this.editingIndex !== null) {
      const success = this.todoList.updateTodo(
        this.editingIndex,
        this.editTask,
        this.editPriority
      );
      if (!success) {
        this.errorMessage = 'Felaktiga värden vid redigering. Kontrollera att uppgiften inte är tom och att prioriteringen är mellan 1 och 3.';
        this.successMessage = '';
      } else {
        this.errorMessage = '';
        this.successMessage = 'Uppgift uppdaterad!';
        this.editingIndex = null;
        this.editTask = '';
        this.editPriority = 1;
        setTimeout(() => (this.successMessage = ''), 2000);
      }
    }
  }

  // definerar cancelEdit metoden
  cancelEdit(): void {
    this.editingIndex = null;
    this.editTask = '';
    // rensa editPriority och errorMessage
    this.editPriority = 1;
    this.errorMessage = '';
  }

  // definerar removeTodo metoden
  removeTodo(index: number): void {
    if (confirm('Är du säker på att du vill ta bort denna uppgift?')) {
      // sätter removing till true för att indikera att uppgiften ska tas bort
      (this.todos[index] as any).removing = true;
      setTimeout(() => {
        this.todoList.removeTodo(index);
        // rensar removing flaggan
        this.successMessage = 'Uppgift borttagen!';
        setTimeout(() => (this.successMessage = ''), 2000);
      }, 300);
    }
  }

  // definerar markCompleted metoden
  markCompleted(index: number): void {
    this.todoList.markTodoCompleted(index);
  }

  // använder getTodos metoden för att hämta todos
  get todos(): Todo[] {
    return this.todoList.getTodos();
  }
}
