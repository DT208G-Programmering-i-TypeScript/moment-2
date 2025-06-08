import { Todo } from './models/todo.js';
import { TodoList } from './services/TodoList.js';

const todoListInstance = new TodoList();

// Visar meddelanden till användaren
function showMessage(message: string, type: 'success' | 'error'): void {
    const errorDiv = document.getElementById('error') as HTMLDivElement;
    errorDiv.textContent = message;
    errorDiv.className = type; // Lägg till CSS-klass för styling
    
    // Rensa meddelandet efter 3 sekunder
    setTimeout(() => {
        errorDiv.textContent = '';
        errorDiv.className = '';
    }, 3000);
}

// Formatterar ett datum i svensk format
function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString('sv-SE', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
}

// Visar todos i DOM:en
function displayTodos(): void {
    const todoListElement = document.getElementById('todo-list') as HTMLUListElement;
    todoListElement.innerHTML = '';
    const todos = todoListInstance.getTodos();

    todos.forEach((todo: Todo, index: number) => {
        const li = document.createElement('li');

        // Uppgiftstext med ikon
        const taskSpan = document.createElement('span');
        taskSpan.innerHTML = `<i class="fas ${todo.completed ? 'fa-check-circle' : 'fa-circle'}"></i> ${todo.task}`;
        if (todo.completed) {
            taskSpan.classList.add('completed');
        }
        li.appendChild(taskSpan);

        // Prioritet och datum
        const detailsDiv = document.createElement('div');
        const prioritySpan = document.createElement('span');
        prioritySpan.textContent = `Prioritet: ${todo.priority}`;
        prioritySpan.classList.add('priority');
        detailsDiv.appendChild(prioritySpan);

        const datesDiv = document.createElement('div');
        datesDiv.classList.add('dates');
        datesDiv.textContent = `Skapad: ${formatDate(todo.createdDate)}`;
        if (todo.completed && todo.completedDate) {
            datesDiv.textContent += ` | Klar: ${formatDate(todo.completedDate)}`;
        }
        detailsDiv.appendChild(datesDiv);
        li.appendChild(detailsDiv);

        // Knappar: Klar, Redigera, Radera
        const actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i> Klar';
        completeButton.dataset.index = index.toString();
        completeButton.addEventListener('click', () => {
            const idx = parseInt(completeButton.dataset.index!);
            if (!todoListInstance.getTodos()[idx].completed) {
                todoListInstance.markTodoCompleted(idx);
                showMessage('Uppgift markerad som klar!', 'success');
                displayTodos();
            }
        });
        actionButtons.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i> Redigera';
        editButton.dataset.index = index.toString();
        editButton.addEventListener('click', () => {
            const idx = parseInt(editButton.dataset.index!);
            openEditModal(idx);
        });
        actionButtons.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Radera';
        deleteButton.dataset.index = index.toString();
        deleteButton.addEventListener('click', () => {
            const idx = parseInt(deleteButton.dataset.index!);
            if (confirm('Är du säker på att du vill radera denna uppgift?')) {
                todoListInstance.deleteTodo(idx);
                showMessage('Uppgift raderad!', 'success');
                displayTodos();
            }
        });
        actionButtons.appendChild(deleteButton);

        li.appendChild(actionButtons);
        todoListElement.appendChild(li);
    });
}

// Öppna modal för att redigera en todo
function openEditModal(index: number): void {
    const modal = document.getElementById('edit-modal') as HTMLDivElement;
    const editTaskInput = document.getElementById('edit-task') as HTMLInputElement;
    const editPriorityInput = document.getElementById('edit-priority') as HTMLInputElement;
    const editForm = document.getElementById('edit-form') as HTMLFormElement;
    const todo = todoListInstance.getTodos()[index];

    editTaskInput.value = todo.task;
    editPriorityInput.value = todo.priority.toString();
    modal.style.display = 'flex';

    editForm.onsubmit = (event: Event) => {
        event.preventDefault();
        const newTask = editTaskInput.value.trim();
        const newPriority = parseInt(editPriorityInput.value);
        
        // Tydligare validering och felmeddelanden
        if (!newTask) {
            showMessage('Uppgiftstexten får inte vara tom!', 'error');
            return;
        }
        
        if (isNaN(newPriority) || newPriority < 1 || newPriority > 3) {
            showMessage('Prioritet måste vara ett nummer mellan 1 och 3!', 'error');
            return;
        }
        
        const success = todoListInstance.editTodo(index, newTask, newPriority);
        if (success) {
            displayTodos();
            modal.style.display = 'none';
            showMessage('Uppgift uppdaterad!', 'success');
        } else {
            showMessage('Något gick fel vid uppdatering av uppgiften.', 'error');
        }
    };

    // Stäng modalen om användaren klickar utanför innehållet
    modal.onclick = (event: Event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Setup av formulär för att lägga till nya todos
function setupForm(): void {
    const form = document.getElementById('todo-form') as HTMLFormElement;
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        const taskInput = document.getElementById('task') as HTMLInputElement;
        const priorityInput = document.getElementById('priority') as HTMLInputElement;
        const task = taskInput.value.trim();
        const priority = parseInt(priorityInput.value);
        
        // Tydligare validering och felmeddelanden
        if (!task) {
            showMessage('Du måste skriva en uppgift!', 'error');
            return;
        }
        
        if (isNaN(priority) || priority < 1 || priority > 3) {
            showMessage('Prioritet måste vara ett nummer mellan 1 och 3!', 'error');
            return;
        }
        
        const success = todoListInstance.addTodo(task, priority);
        if (success) {
            displayTodos();
            taskInput.value = '';
            priorityInput.value = '';
            showMessage('Ny uppgift tillagd!', 'success');
        } else {
            showMessage('Något gick fel vid tillägg av uppgiften.', 'error');
        }
    });
}

// Initiera applikationen
displayTodos();
setupForm();