# 📋 Todo-applikation i TypeScript

En modern och responsiv todo-applikation byggd med TypeScript, HTML och CSS. Applikationen använder objektorienterad programmering och LocalStorage för datalagring.

## Publicerad webbplats

https://mom-2-todo-listalt.netlify.app/

## 🚀 Funktioner

- ✅ Lägg till nya uppgifter med prioritering (1-3)
- 📝 Redigera befintliga uppgifter
- ✔️ Markera uppgifter som klara
- 🗑️ Radera uppgifter
- 💾 Automatisk lagring i LocalStorage
- 📱 Responsiv design för alla skärmstorlekar
- 🌟 Modern neon-inspirerad design
- 💬 Tydliga fel- och framgångsmeddelanden

## 📁 Projektstruktur

```
moment-2/
├── 📄 index.html           # Huvudwebbsida
├── 📁 src/                 # TypeScript källkod
│   ├── 📄 app.ts          # Huvudapplikation och DOM-hantering
│   ├── 📁 models/         # Datamodeller
│   │   └── 📄 todo.ts     # Todo interface
│   └── 📁 services/       # Affärslogik
│       └── 📄 TodoList.ts # TodoList klass
├── 📁 dist/               # Kompilerad JavaScript (genereras)
├── 📁 styles/             # CSS styling
│   └── 📄 style.css       # Huvudstylesheet
├── 📄 tsconfig.json       # TypeScript konfiguration
├── 📄 package.json        # NPM konfiguration
└── 📄 README.md          # Denna fil
```

## 🏗️ Arkitektur

### Interface: Todo
Definierar strukturen för en todo-uppgift:
```typescript
interface Todo {
    task: string;           // Uppgiftsbeskrivning
    completed: boolean;     // Status (klar/ej klar)
    priority: number;       // Prioritet (1-3, där 1 är högst)
    createdDate: string;    // Skapad datum
    completedDate?: string; // Klar datum (valfritt)
}
```

### Klass: TodoList
Hanterar affärslogiken och datalagring:

**Attribut:**
- `todos: Todo[]` - Array med alla uppgifter

**Metoder:**
- `addTodo(task, priority)` - Lägger till ny uppgift
- `markTodoCompleted(index)` - Markerar uppgift som klar
- `editTodo(index, task, priority)` - Redigerar befintlig uppgift
- `deleteTodo(index)` - Raderar uppgift
- `getTodos()` - Hämtar alla uppgifter
- `saveToLocalStorage()` - Sparar till webbläsarens lagring
- `loadFromLocalStorage()` - Laddar från webbläsarens lagring

### App: DOM-hantering
`app.ts` innehåller all presentation och användarinteraktion:

**Huvudfunktioner:**
- `displayTodos()` - Renderar todo-listan i DOM
- `setupForm()` - Hanterar formulär för nya uppgifter
- `openEditModal()` - Öppnar modal för redigering
- `showMessage()` - Visar meddelanden till användaren

## 🔧 Installation och användning

### Förutsättningar
- Node.js och npm installerat
- TypeScript kompiler

### Steg-för-steg

1. **Klona projektet**
   ```bash
   git clone <repository-url>
   cd moment-2
   ```

2. **Installera beroenden**
   ```bash
   npm install
   ```

3. **Kompilera TypeScript**
   ```bash
   npx tsc
   ```

4. **Öppna webbplatsen**
   Öppna `index.html` i en webbläsare eller använd en lokal server.

## 💡 Design-beslut

### Separation av Concerns
- **Models** (`todo.ts`) - Datastrukturer
- **Services** (`TodoList.ts`) - Affärslogik och datahantering
- **Presentation** (`app.ts`) - DOM-manipulation och användarinteraktion

### Validering
- Input-validering sker både i frontend och backend-logik
- Tydliga felmeddelanden guidar användaren
- Automatisk trimning av whitespace

### Användarupplevelse
- Bekräftelsedialog innan radering
- Automatiska meddelanden som försvinner efter 3 sekunder
- Visuell feedback för alla användarhandlingar
- Responsiv design för alla enheter

### LocalStorage
- Automatisk sparning vid varje ändring
- Data persisterar mellan sessioner
- Automatisk laddning vid appstart

## 🎨 Styling

Projektet använder en modern neon-inspirerad design med:
- CSS Custom Properties för färghantering
- Flexbox för layout
- CSS Grid för responsivitet
- Smooth transitions och hover-effekter
- Glöd-effekter för visuell appeal

## 🔄 Dataflöde

```
Användare → HTML Form → app.ts → TodoList.ts → LocalStorage
                                      ↓
Användare ← HTML DOM ← app.ts ← TodoList.ts ← LocalStorage
```

1. Användaren fyller i formuläret
2. `app.ts` validerar input
3. `TodoList.ts` processerar data
4. Data sparas till LocalStorage
5. DOM uppdateras med nya data

## 🧪 Funktionalitetsexempel

### Lägga till uppgift
```typescript
const todoList = new TodoList();
const success = todoList.addTodo("Handla mat", 1);
if (success) {
    console.log("Uppgift tillagd!");
}
```

### Markera som klar
```typescript
todoList.markTodoCompleted(0); // Markerar första uppgiften
```

### Hämta alla uppgifter
```typescript
const allTodos = todoList.getTodos();
console.log(allTodos);
```

## 📋 Funktionalitetschecklista

- [x] Todo interface med alla obligatoriska fält
- [x] TodoList klass med alla metoder
- [x] Konstruktor som laddar från LocalStorage
- [x] Validering av input (task och priority)
- [x] Returnering av boolean från addTodo
- [x] Separation mellan logik och presentation
- [x] Responsiv webbdesign
- [x] LocalStorage för datalagring
- [x] Felhantering med meddelanden
- [x] Extra funktionalitet (redigering, radering)

- 🔄 Synkronisering med cloud-tjänster

---

*Byggd med ❤️ som en del av kursen DT208G - Programmering i TypeScript*
