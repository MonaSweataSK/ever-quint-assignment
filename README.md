# EverQuint: Enterprise Task Management

EverQuint is a premium, robust, and offline-first task management application built from the ground up. Inspired by industry leaders like **Jira** and **Linear**, the primary objective of this project was to construct a scalable Kanban architecture from scratch, highlighting fundamental engineering principles over reliance on heavy, pre-built template libraries.

---

## 📖 The "From Scratch" Story

When setting out to build EverQuint, the easiest path would have been to stitch together a few heavy UI libraries and save everything to `localStorage`. Instead, we treated this as a real-world enterprise engineering challenge.

We wanted to demonstrate deep technical proficiency by designing custom, bespoke systems:
1. **The UI**: We built our own `TaskCard`, `Column`, and `Modal` components tailored precisely to our design language using Tailwind CSS.
2. **The Data Layer**: We rejected simple storage in favor of a robust **IndexedDB** implementation. We built a custom `Repository` pattern and an automated schema migration system that securely handles upgrades on the client's machine.
3. **The State**: We implemented deep-linking everywhere. Modals aren't just local state; they are driven by the URL routing (`/task/:id/edit`), ensuring users can share exact views with colleagues.
4. **The Polish**: We strictly typed the entire application in TypeScript, achieving a 100% clean linter (0 warnings, 0 `any` types) and implemented route-level code splitting for sheer performance.

The result is an application that feels instantly responsive, works fully offline, and is architecturally sound enough for an entire team.

---

## 🛠️ Technology Stack & Rationale

We selectively chose our stack to provide maximum performance, developer experience, and scalability.

### Core Architecture
- **React**: The view layer. Chosen for its ecosystem and declarative UI capabilities.
- **TypeScript (Strict)**: The entire codebase forces strict TypeScript compilation. We have zero instances of `no-explicit-any`. If the data shape isn't known, it is properly handled via `Record<string, unknown>` or robust generics.
- **Tailwind CSS**: For styling. By using utility classes, we achieved a custom, premium aesthetic (glassmorphism, micro-animations, deterministic tag colors) without the bloat of a UI component library (like MUI or Ant Design) dictating our design language.

### Data & State Management
- **IndexedDB (via `idb` wrapper)**: Our persistent data layer. It provides asynchronous, structured storage directly in the user's browser logic, supporting indexing and heavy queries, which is impossible with synchronous `localStorage`.
- **Zustand**: A light, unopinionated client-state manager. We use it to coordinate the complex asynchronous flow between IndexedDB and our React components, ensuring the board re-renders instantly upon interactions.
- **React Router**: Controls our deep-linkable URLs and modal overlays.

### Performance & Tooling
- **Vite**: Ultra-fast build tool. We utilized Vite's capabilities to configure route-level code splitting (via `React.lazy`), effectively separating our heavy mock-data logic (Faker.js) into separate networking chunks to guarantee the main board loads instantaneously.
- **Vitest**: For our automated test suite. It executes tests across our schema logic, IndexedDB mock migrations, and UI components.
- **@hello-pangea/dnd**: A stable, performant fork of `react-beautiful-dnd` to power our core Kanban mechanic.
- **Faker.js**: Powers our "Playground" debugger to generate highly realistic, readable dummy data rapidly.

---

## ✨ Comprehensive Feature Breakdown

### 1. Offline-First Custom Data Layer
EverQuint persists all data instantly via a custom IndexedDB Repository instance.
- **Automated Schema Migrations**: We implemented a robust migration script (`migration.ts`) that runs passively on initial load. It securely hashes the TypeScript schema definition, and if a mismatch in the database is detected, automagically normalizes all previous user data to the new schema constraints seamlessly.

### 2. URL-Driven State & Deep Linking
We treat the URL as the single source of truth for the user's workspace context.
- Modals are routes. Navigating to `/task/new` launches the create form over the board. Navigating to `/task/:id/edit` instantly triggers edit mode for that specific item.
- Interactions like searching (`?q=bug`), filtering by priority (`?priority=high`), and sorting (`?sortBy=createdAt`) sync instantly with the URL allowing users to bookmark and share specific board states effortlessly.

### 3. Intelligent Status & Visual Tagging
- **Computed Context**: The system automatically computes and injects priority tags like **"Overdue"**, **"On Time"**, **"Done"**, or **"Not Started"** into task cards based on live date properties.
- **Deterministic Colors**: Every manual tag generated computes its background and text colors deterministically via a string-hash algorithm, ensuring visually distinct and consistent tags across the ecosystem without manual configuration.

### 4. Enterprise Refinements
- Searchable Assignee selection dropdown menus.
- Case-insensitive duplicate prevention handling in the Custom Tag Editor.
- Complete route-level asynchronous code splitting boundaries.

---

## 📘 Full User Guide & Workflows

### Scenario 1: Creating a Task
1. From the main Kanban board, click the **"New Task"** button in the header. (Alternatively, navigate directly to `localhost:3000/task/new`).
2. A sliding modal overlay will appear on the right side.
3. Enter your task details. The `Tag` form element will offer suggestions based on other tags currently active on the board.
4. Hit **Save**. The modal will close, the task will persist intelligently in IndexedDB, and the Kanban board instantly re-renders.

### Scenario 2: Viewing and Inline Editing
We optimize for rapid edits.
1. Click on any `TaskCard` on the board to launch the **View Mode** detail modal.
2. **Double-Click Edit Flow**: If you spot a typo while reading the detailed view, simply **double-click** anywhere on a read-only field (like title or description).
3. The entire view instantly converts into an **Edit Form**.
4. Make your changes and press **Save**. The form instantly resolves back to the read-only view state.

### Scenario 3: Organizing the Board (Drag & Drop, Filtering)
1. **Changing Status**: Simply click and hold an entire Task Card, and physically drag it horizontally into a different status column (e.g., from *To Do* to *In Progress*).
2. **Sorting by Column**: Each column header features a sort icon. Click it to sort tasks *only* within that column by chronological or alphabetical order.
3. **Global Filtering**: Use the global header controls at the very top of the application to search for string queries across titles and descriptions, or strictly filter out tasks that do not match specific Priorities or Statuses.

### Scenario 4: Developer Debugging / Playground
Testing a Kanban board is tedious if you have to manually create 30 tasks.
1. Click the **"Playground"** button in the top navigation.
2. The Playground is a unique route (`/playground`) that acts as an ORM debugger.
3. Use the interface to "Generate 10 Tasks". This engine uses Faker.js to populate IndexedDB with completely realistic dummy tasks (e.g., proper English descriptions, real human names for assignees).
4. Click **"Back to Workspace"** to view your freshly populated board and immediately start dragging and organizing to test the UI's resilience.

---

## 💻 Local Development & Setup

Prerequisites: `Node.js` (v18+)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *The app will be available at `http://localhost:3000`*

3. **Run the Automated Test Suite**
   ```bash
   npm run test
   ```

4. **Verify Linter (100% Strict Typing)**
   ```bash
   npm run lint
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```
   *The application guarantees small chunk generation thanks to `React.lazy` routing.*

---

## 🖼️ Visual Progression & Walkthrough

Below is a look at the application's key interfaces:

### 1. The Main Task Board (Jira Inspired)
![Board View](/Users/eramalingam/.gemini/antigravity/brain/22eb1960-7760-4938-88e4-f967365981b3/media__1773764774502.png)

### 2. Task Editing & Creation Overlay
![Task Modal](/Users/eramalingam/.gemini/antigravity/brain/22eb1960-7760-4938-88e4-f967365981b3/media__1773766033104.png)

### 3. The Faker.js Playground (ORM Debugger)
![Playground View](/Users/eramalingam/.gemini/antigravity/brain/22eb1960-7760-4938-88e4-f967365981b3/media__1773767677916.png)
