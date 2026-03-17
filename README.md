# EverQuint: Task Management Assignment

---

[📖 **Click here for the Full Visual User Guide & App Walkthrough Demo**](./docs/guide.md)

---

## 🏗️ Architectural Overview

The core technical challenge was to build a robust system that mimics a full-stack application purely on the client-side. 

### 1. IndexedDB as a "Virtual Backend"
Instead of using client storage like a simple cache, we treated IndexedDB like a real backend system.
- **Repository Pattern**: We created reusable repository classes to handle data access, similar to how a backend interacts with a database. This keeps things clean and structured.
- **Client-Side Migrations**: We built a migration system that runs when the app starts. If the data schema changes, it detects the difference and updates existing data automatically—just like database migrations on a server.
- **Asynchronous Data Flow**: The UI never updates the database directly. All data operations go through Zustand and happen asynchronously, similar to API calls. This keeps the UI smooth and avoids blocking.

### 2. Custom UI Components
Instead of relying on pre-built UI libraries like Material UI or Ant Design, we built our own design system from scratch using React and Tailwind CSS.
- Components like `TaskCard`, `Column`, modals, buttons, and form elements were all custom-built.

### 3. Deep-Linkable Routing
Instead of managing state only inside React components, we used the URL as the main source of truth for the app’s state.
- Modals are fully controlled by the URL. For example, going to `/task/new` or `/task/:id/edit` automatically opens the right modal. This also makes it easy to bookmark or share a specific screen.
- Things like search, filters, priority, and sorting are all stored in the URL as query parameters, so the state stays consistent and shareable.

---

## 🛠️ Technology Stack
We selectively chose our stack to provide maximum performance, developer experience, and scalability.

### Core Architecture:
- **React**: The view layer. Chosen for its ecosystem and declarative UI capabilities.
- **TypeScript**: The entire codebase forces strict TypeScript compilation. We have zero instances of `no-explicit-any`. If the data shape isn't known, it is properly handled via `Record<string, unknown>` or robust generics.
- **Tailwind CSS**: For styling, we used utility classes to build everything from scratch. This helped us create a clean and premium look (like small effects, small animations, and consistent tag colors) without depending on heavy UI libraries like Material UI or Ant Design controlling our design.

### Data & State Management:
- **IndexedDB**: Our persistent data layer. It provides asynchronous, structured storage directly in the user's browser logic, supporting indexing and heavy queries, which is impossible with synchronous `localStorage`.
- **Zustand**: We use it to coordinate the complex asynchronous flow between IndexedDB and our React components, ensuring the board re-renders instantly upon interactions.
- **React Router**: Controls our linkable URLs and modal overlays.

### Performance & Tooling:
- **Vite**: Ultra-fast build tool. We utilized Vite's capabilities to configure route-level code splitting (via `React.lazy`), effectively separating our heavy mock-data logic (Faker.js) into separate networking chunks to guarantee the main board loads instantaneously.
- **Vitest**: For our automated test suite. It executes tests across our schema logic, IndexedDB mock migrations, and UI components.
- **@hello-pangea/dnd**: A stable, performant fork of `react-beautiful-dnd` to power our core Kanban mechanic.
- **Faker.js**: Powers our "Playground" debugger to generate highly realistic, readable dummy data rapidly.

---

## ✨ Features
- **Custom Kanban Board**: Built a drag-and-drop board using `@hello-pangea/dnd`, where everything updates based on the app state.
- **Smart Status Updates**: The app automatically shows tags like “Overdue”, “On Time”, or “Not Started” based on task dates and status—no manual updates needed.
- **Dynamic Tag Colors**: Tag colors are generated automatically using a hashing method, so we don’t need to maintain fixed color mappings.
- **Polished UI Experience**: Added useful features like searchable assignee dropdowns, preventing duplicate tags (case-insensitive), double-click to edit tasks, and loading different parts of the app only when needed for better performance.

---

## 📘 Full User Guide & Workflows

### Scenario 1: Creating a Task
1. From the main Kanban board, click the **"New Task"** button in the header. (Alternatively, navigate directly to `localhost:3000/task/new`).
2. A sliding modal overlay will appear on the right side.
3. Enter your task details. The Tag form element will offer suggestions based on other tags currently active on the board.
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

