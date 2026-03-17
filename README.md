# EverQuint: Task Management Assignment

EverQuint is a fully offline-capable task management application. This project was built from the ground up to demonstrate a scalable Kanban architecture and robust client-side state management without relying on heavy framework templates.

---

## 🏗️ Architectural Overview

The core technical challenge was to build a robust system that mimics a full-stack application purely on the client-side. 

### 1. IndexedDB as a "Virtual Backend"
Instead of treating client-storage as a simple key-value cache (like `localStorage`), we architected the **IndexedDB** layer to act as a proper backend system. 
- **Repository Pattern**: Data access is abstracted via strict generic `Repository` classes, identical to how a server might query a SQL database.
- **Client-Side Migrations**: We implemented a dynamic schema migration script (`migration.ts`) that runs on initialization. If the TypeScript schema definition (`TASK_SCHEMA`) changes during development, the system securely hashes it, detects the diff, and runs an automated transformation on the user's local database to normalize existing records—simulating a real database migration.
- **Asynchronous Data Flow**: The UI never mutates the database synchronously. All interactions are handled asynchronously through `Zustand`, mimicking network requests to ensure non-blocking UI threads.

### 2. Custom UI Components
Rather than stitching together pre-built component libraries (e.g., MUI or Ant Design), we constructed the core design system manually using React and Tailwind CSS.
- The `TaskCard`, `Column`, modal overlays, and form elements are entirely bespoke.
- This approach granularly demonstrates proficiency in component lifecycle, DOM event bubbling, and CSS layout architecture.

### 3. Deep-Linkable Routing
State is managed fundamentally through the URL rather than localized React context.
- Modals are completely URL-driven. Navigating to `/task/new` or `/task/:id/edit` instantly triggers the correct UI state, allowing users to bookmark and share precise application context.
- Board filters (search queries, priority, and sorting dimensions) are automatically serialized and synced to URL search parameters.

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

## ✨ Features

- **Custom Kanban Board**: State-driven drag-and-drop powered by `@hello-pangea/dnd`.
- **Intelligent Status & Data Computing**: The system automatically computes and injects contextual tags (e.g., "Overdue", "On Time", "Not Started") dynamically based on chronological properties and status enums.
- **Deterministic Token Colors**: Custom tags calculate their hex configurations dynamically via string-hashing, removing the need for predefined CSS maps.
- **Enterprise UI Refinements**: Searchable assignee selection menus, case-insensitive duplicate prevention via the `TagEditor`, double-click-to-edit interactions on the task view interface, and strict route-level asynchronous code splitting boundaries.

---

## 📘 Full User Guide & Workflows

### Scenario 1: Creating a Task
1. From the main Kanban board, click the **"New Task"** button in the header. (Alternatively, navigate directly to `localhost:3000/task/new`).
2. A sliding modal overlay will appear on the right side.
3. Enter your task details. The `Tag` form element will offer suggestions based on other tags currently active on the board.
4. Hit **Save**. The modal will close, the task will persist intelligently in IndexedDB, and the Kanban board instantly re-renders.

### Scenario 2: Inline Editing
Optimized for rapid contextual updates:
1. Click any `TaskCard` to mount the detail modal in a read-only View Mode.
2. Double-click anywhere on an editable field to immediately swap the context into an Edit Form representation.
3. Save changes to dispatch the IndexedDB mutator and resolve the visual state.

### Scenario 3: Organizing the Board (Drag & Drop, Filtering)
1. **Changing Status**: Simply click and hold an entire Task Card, and physically drag it horizontally into a different status column (e.g., from *To Do* to *In Progress*).
2. **Sorting by Column**: Each column header features a sort icon. Click it to sort tasks *only* within that column by chronological or alphabetical order.
3. **Global Filtering**: Use the global header controls at the very top of the application to search for string queries across titles and descriptions, or strictly filter out tasks that do not match specific Priorities or Statuses.

### Scenario 4: Testing & Mock Generation (The Playground)
To test IndexedDB performance, a bespoke generic mocking engine was implemented.
1. Navigate to `/playground`.
2. Generate tasks via `Faker.js` logic to instantly populate the IndexedDB with fully hydrated mock JSON graphs (e.g., real names, random statuses).
3. Switch back to the workspace to visualize the data scaling across the board.

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
