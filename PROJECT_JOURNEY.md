# EverQuint - The Build Journey

## Overview & Use Case
**EverQuint** is a premium, robust task management application built as part of a technical interview assignment. The core use case was to develop a scalable, highly interactive Kanban-style task board that goes beyond a standard "To-Do" app. 

Instead of treating this as a simple weekend project, the approach was to engineer a production-ready application. This meant prioritizing architectural integrity, performance, and user experience (UX) from day one. *The goal wasn't just to write code, but to solve real engineering problems along the way.*

---

## The "Thinking" Over "Just Coding"

When building this application, we encountered several architectural crossroads. Here is the thought process behind the key technical decisions:

### 1. Data Layer: Why IndexedDB over LocalStorage?
For a simple assignment, `localStorage` is the defacto standard. However, `localStorage` is synchronous, blocks the main thread, and is limited to ~5MB of stringified JSON.
- **The Decision**: We built a custom "Mini-ORM" heavily utilizing IndexedDB (via the `idb` library).
- **The Why**: This allowed us to perform asynchronous, non-blocking CRUD operations. More importantly, we created **DB Indexes** (e.g., `by-status`, `by-priority`, `by-name`), allowing us to query tasks optimally just like a real backend database, preparing the app to handle thousands of tasks smoothly.

### 2. Automated Schema Migrations
Client-side apps often break when the underlying data shape changes across updates. 
- **The Decision**: We implemented a dynamic schema hash. 
- **The Why**: `migration.ts` calculates a hash of our `TASK_SCHEMA`. When the app boots, it compares this to the stored hash. If they mismatch, an automated background migration runs, applying default values and normalizing legacy data models into the new schema without data loss or crashing the user's board.

### 3. State Management: Zustand over Context API
- **The Decision**: We utilized `Zustand` for our global `taskStore`.
- **The Why**: React's built-in Context API triggers re-renders on all consuming components whenever any piece of the state changes. Zustand allows components to select only the slice of state they care about, drastically reducing useless re-renders when tasks are dragged-and-dropped rapidly.

### 4. Deep-Linking and URL Synchronization
A common flaw in Single Page Applications (SPAs) is that refreshing the page or sharing a link drops all user context.
- **The Decision**: We synced our Modal state, Search queries, and Board Filters directly to the URL Search Params (`?priority=high&status=todo`).
- **The Why**: If a user clicks a task, the URL changes to `/task/:id`. If they refresh, the server (configured with a `_redirects` file for Netlify) routes them back, and our React Router explicitly re-opens that exact modal. It makes the app feel like a true native desktop application.

### 5. Performance Engineering: Code Splitting
- **The Issue**: As we added a robust "Playground" (for debugging the ORM with Faker.js data), the Vite build warned us that our main JavaScript chunk exceeded 800kB.
- **The Fix**: We didn't ignore the warning. We implemented route-level **Code Splitting** using React's `lazy()` and `<Suspense>`. This broke our monolithic bundle into smaller chunks. The heavy Faker.js data generation logic is now strictly isolated to the `/playground` route, cutting the initial load size for normal users down significantly.

### 6. Strict Type Safety & QA
- Zero `any` types. We rigidly defined TypeScript Interfaces (`Task`, `BoardData`, `SortCriteria`).
- We executed automated testing via Vitest to validate our custom hooks, UI filtering, and DB migration logic.
- We achieved a fully clean `npm run lint` pipeline (0 errors, 0 warnings).

---

## Core Features List

### UI & Aesthetics
- **Premium Design System**: Tailored color palettes, glassmorphism overlays, and deeply integrated Tailwind CSS.
- **Deterministic Tag Colors**: Tags are automatically assigned a vibrant, consistent color based on their string value.
- **Micro-interactions**: Hover effects, smooth modal transitions, and immediate visual feedback on drag-and-drop actions.

### Task Management Workflows
- **Dynamic Board**: Intuitive drag-and-drop interface powered by `@hello-pangea/dnd`.
- **Intelligent Creation**: "Double click to edit" form interactions natively built for speed.
- **Automated Status Constraints**: System-computed tags automatically flag tasks as **Overdue**, **On Time**, or **Not Started** based on their due date and completion status.
- **Advanced Filtering/Sorting**: Sort by priorities, filter by due dates, or global text search—all synced to the URL.

### Dev Tools
- **The Playground**: We built an interactive database debugger mode where you can instantly seed the IndexedDB with hundreds of tasks using localized `Faker.js` data (generating realistic human names and scenarios) to stress-test the UI.

---

## Visuals & Screenshots
*(Add your screenshots here!)*

*We have created a `public/screenshots/` and `docs/screenshots/` folder in the repository for you to drop your images into.*

- **The Kanban Board**: `![Kanban Board](./public/screenshots/board.png)`
- **Task Edit Modal**: `![Task Edit Modal](./public/screenshots/modal.png)`
- **The Playground Engine**: `![Playground](./public/screenshots/playground.png)`

---

*Authored during the EverQuint assignment build.*
