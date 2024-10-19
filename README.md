# Todo-List applikation i Angular

Detta projekt är en "Todo-List"-applikation byggd med Angular. Applikationen tillåter användare att:

- Skapa nya uppgifter med prioritet (1-3)
- Redigera befintliga uppgifter
- Ta bort uppgifter
- Markera uppgifter som slutförda
- Se en lista över alla uppgifter.
- Uppleva en responsiv design som fungerar på både desktop och mobila enheter.
- Få visuell feedback och validering vid interaktioner.

## 📋 Innehållsförteckning

- [Förhandsvisning](#förhandsvisning)
- [Funktioner](#funktioner)
- [Tekniker](#tekniker)
- [Installation](#installation)
- [Användning](#användning)
- [Applikationsstruktur](#applikationsstruktur)
  - [Komponenter](#komponenter)
  - [Modeller](#modeller)
  - [Tjänster](#tjänster)
- [Detaljerad Beskrivning](#detaljerad-beskrivning)
  - [Lägga till Uppgifter](#lägga-till-uppgifter)
  - [Redigera och Ta Bort Uppgifter](#redigera-och-ta-bort-uppgifter)
  - [Validering](#validering)
  - [Visuell Feedback](#visuell-feedback)
  - [Responsiv Design](#responsiv-design)
- [Framtida Utveckling](#framtida-utveckling)
- [Bidra](#bidra)
- [Licens](#licens)

## 🚀 Funktioner

- **Lägg till Uppgifter:** Användaren kan lägga till nya uppgifter med en prioritet mellan 1 och 3.
- **Markera som Klar:** Uppgifter kan markeras som klara genom att klicka på en checkbox.
- **Redigera Uppgifter:** Befintliga uppgifter kan redigeras för att ändra text eller prioritet.
- **Ta Bort Uppgifter:** Uppgifter kan tas bort från listan.
- **Validering:** Formulärvalidering säkerställer att inga tomma uppgifter läggs till eller sparas.
- **Visuell Feedback:** Animationer och färgförändringar ger användaren feedback vid interaktioner.
- **Responsiv Design:** Layouten anpassar sig till olika skärmstorlekar, inklusive mobila enheter.
- **Lokal Lagring:** Uppgifter sparas i webbläsarens `localStorage`, vilket innebär att de finns kvar vid omladdning av sidan.

## 🛠 Tekniker

- **Angular:** Ramverk för att bygga webbaserade applikationer.
- **TypeScript:** Programmeringsspråk som är ett strikt syntaktiskt superset av JavaScript.
- **HTML & CSS:** För strukturen och stilen av applikationen.
- **LocalStorage:** Webblagring för att spara uppgifter lokalt i användarens webbläsare.

## 📦 Installation

1. **Kloning av Repositoriet:**

   ```bash
   git clone https://github.com/DT208G-Programmering-i-TypeScript/moment-2.git
   cd todo-list-angular
   ```

2. **Installation av Beroenden:**

   Se till att du har [Node.js](https://nodejs.org/) och [Angular CLI](https://angular.io/cli) installerade.

   ```bash
   npm install -g @angular/cli
   npm install
   ```

3. **Starta Applikationen:**

   ```bash
   ng serve
   ```

4. **Öppna i Webbläsaren:**

   Navigera till `http://localhost:4200/` för att se applikationen.

## 💻 Användning

- **Lägga till en Uppgift:**
  - Skriv in uppgiftens text i textfältet.
  - Välj prioritet (1 för hög, 2 för medium, 3 för låg).
  - Klicka på `➕` för att lägga till uppgiften.

- **Markera som Klar:**
  - Klicka på checkboxen bredvid uppgiften för att markera den som klar.

- **Redigera en Uppgift:**
  - Klicka på `✏️` för den uppgift du vill redigera.
  - Ändra texten och/eller prioriteten.
  - Klicka på `💾` för att spara ändringarna eller `❌` för att avbryta.

- **Ta Bort en Uppgift:**
  - Klicka på `🗑️` för den uppgift du vill ta bort.
  - Bekräfta att du vill ta bort uppgiften.

- **Validering och Meddelanden:**
  - Felmeddelanden visas om du försöker lägga till eller spara en tom uppgift.
  - Lyckade åtgärder bekräftas med ett framgångsmeddelande.

## 📂 Applikationsstruktur

```
src/
├── app/
│   ├── models/
│   │   ├── todo.ts
│   │   └── todo-list.ts
│   ├── todo-list/
│   │   ├── todo-list.component.ts
│   │   ├── todo-list.component.html
│   │   └── todo-list.component.css
│   └── app.component.ts
└── main.ts
```

### 🧩 Komponenter

- **AppComponent (`app.component.ts`):** Huvudkomponenten som bootstrappas vid applikationens start.
- **TodoListComponent (`todo-list.component.ts`):** Standalone-komponent som innehåller huvudfunktionaliteten för "Att Göra"-listan.

### 📄 Modeller

- **Todo (`todo.ts`):** Interface som definierar strukturen för en uppgift.
  - `task: string`
  - `completed: boolean`
  - `priority: number`

- **TodoList (`todo-list.ts`):** Klass som hanterar listan av uppgifter och innehåller metoder för att lägga till, uppdatera, ta bort och spara uppgifter.

## 📖 Detaljerad Beskrivning

### ✍️ Lägga till Uppgifter

- **Metod:** `addTodo(task: string, priority: number): boolean`
- **Beskrivning:** Lägger till en ny uppgift till listan efter att ha validerat inmatningen. Sparar listan till `localStorage`.
- **Validering:**
  - `task` får inte vara tom.
  - `priority` måste vara mellan 1 och 3.

### 📝 Redigera och Ta Bort Uppgifter

- **Redigera:**
  - **Metod:** `updateTodo(todoIndex: number, updatedTask: string, updatedPriority: number): boolean`
  - **Beskrivning:** Uppdaterar en befintlig uppgift efter validering.
- **Ta Bort:**
  - **Metod:** `removeTodo(todoIndex: number): void`
  - **Beskrivning:** Tar bort en uppgift från listan efter bekräftelse från användaren.

### ✅ Validering
- Uppgifter kan inte vara tomma
- Prioritet måste väljas (1-3)
- Felmeddelanden visas när:
  - Inputfält är tomma
  - Prioritet saknas
  - Ogiltiga värden anges

### 🎨 Visuell Feedback

- **Animationer:**
  - **Tillägg av Uppgift:** `slideIn`-animation när en ny uppgift läggs till.
  - **Borttagning av Uppgift:** `slideOut`-animation när en uppgift tas bort.
- **Färgförändringar:**
  - **Hover-effekter** på knappar och interaktiva element.
- **Meddelanden:**
  - Framgångsmeddelanden visas vid lyckade åtgärder såsom tillägg, redigering och borttagning av uppgifter.

### 📱 Responsiv Design

- **Flexbox:** Används för att skapa en flexibel layout som anpassar sig till olika skärmstorlekar.
- **Media Queries:** Anpassar layout och elementstorlekar för skärmar mindre än 600px.
- **Mobilvänlig Navigation:**
  - Formulär och knappar anpassar sig för att vara lättanvända på mobila enheter.
  - Text och element justeras för bättre läsbarhet på mindre skärmar.

## 📄 Licens

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE) filen för detaljer.

---

*Denna applikation är skapad som en del av en övning för att lära sig Angular och webbutveckling.*