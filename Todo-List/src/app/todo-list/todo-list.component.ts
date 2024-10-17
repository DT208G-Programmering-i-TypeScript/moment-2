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
  newPriority: number = 1;
  errorMessage: string = '';
  editingIndex: number | null = null;
  editTask: string = '';
  editPriority: number = 1;


  constructor() {
    this.todoList = new TodoList();
  }

  // definerar addTodo metoden
  addTodo(): void {
    const success = this.todoList.addTodo(this.newTask, this.newPriority);
    if (!success) {
      // om addTodo metoden inte lyckas, sätt errorMessage till en felmeddelande
      this.errorMessage =
        'Felaktiga inmatade värden. Kontrollera att uppgiften inte är tom och att prioriteringen är mellan 1 och 3.';
    } else {
      // om addTodo metoden lyckas, sätt errorMessage till en tom sträng och rensa inputfältet
      this.errorMessage = '';
      this.newTask = '';
      this.newPriority = 1;
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
      // om editingIndex inte är null, uppdatera todoList
      const success = this.todoList.updateTodo(
        this.editingIndex,
        this.editTask,
        this.editPriority
      );
      if (!success) {
        // om updateTodo metoden inte lyckas, sätt errorMessage till ett felmeddelande
        this.errorMessage =
          'Felaktiga värden vid redigering. Kontrollera att uppgiften inte är tom och att prioriteringen är mellan 1 och 3.';
      } else {
        this.errorMessage = '';
        this.editingIndex = null;
        this.editTask = '';
        this.editPriority = 1;
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
    this.todoList.removeTodo(index);
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