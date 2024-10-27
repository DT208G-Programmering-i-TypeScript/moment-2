import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';


export const routes: Routes = [
    {
        path: '',
        component: TodoListComponent
    },
    // ... andra routes ...
    { 
        path: '**', 
        redirectTo: '' 
    }
];
