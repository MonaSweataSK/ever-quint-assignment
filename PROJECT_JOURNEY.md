# EverQuint: The Project Journey

This document outlines the architectural thinking, the development journey, and the technical decisions behind the EverQuint task management application. 

## The Vision: Jira-Inspired, Built from Scratch

When starting this assignment, the primary goal was not just to assemble a generic to-do list using a heavy UI library, but rather to demonstrate **fundamental engineering principles**. 

Taking inspiration from industry-standard tools like **Jira** and **Linear**, we opted to build the core mechanics from scratch. This approach allowed us to showcase a deep understanding of state management, data persistence, client-side routing, and complex UI interactions in React, without the "magic" of a pre-built template. 

By building components (like the Kanban board, the data layer, and the routing sync) manually, we ensure maximum performance, customization, and reliability.

---

## 🏗️ The Development Journey

### Phase 1: The Foundation - UI and Mock Data
We started by defining the schema (`Title`, `Description`, `Priority`, `Status`, `Assignee`, `Tags`, `Dates`) and building the visual components. We focused on a premium, clean aesthetic using Tailwind CSS. 
We created custom components like `TaskCard`, `Column`, and `Modal` instead of relying on heavy component libraries. 

*Highlight: Every tag dynamically computes its own deterministic color based on the tag name, creating a vibrant and recognizable interface instantly.*

### Phase 2: The Data Layer - Offline-First Persistence
To make the app feel instantly responsive and capable of functioning offline, we rejected generic `localStorage` in favor of a robust **IndexedDB** implementation.
- We built a custom `Repository` pattern class (`db.ts`, `Repository.ts`).
- We implemented an automated schema migration system (`migration.ts`) that detects schema changes via hashing and safely transforms existing data on the user's local machine.

### Phase 3: Global State & Deep Linking
We introduced a global store (`useTaskStore`) to manage the asynchronous data flow between IndexedDB and the UI.
Crucially, we implemented **URL-driven state**:
- Search queries (`?q=...`), Priority filters (`?priority=high`), and Sort configurations (`?sortBy=createdAt&order=asc`) are strictly synced to the URL parameters. 
- Modals are completely deep-linkable. Navigating to `/task/new` or `/task/:id/edit` instantly opens the correct modal overlaying the board, making the app highly shareable and preserving user context on refresh.

### Phase 4: The "Playground" and Mocking
To thoroughly test the data layer and UI rendering without manually creating dozens of tasks, we built the **Playground**.
- Powered by `Faker.js`, the Playground allows instant generation of dozens of realistic, randomized tasks (with real-sounding names like "Jane Cooper" instead of UUIDs).
- This acts as an "ORM Debugger" visually, allowing us to scrub data and test performance rapidly.

### Phase 5: Enterprise Polish (Performance & Code Quality)
In the final phase, we focused on enterprise-level quality:
1. **Strict TypeScript**: We systematically eliminated *all* `any` types from the codebase, replacing them with strict generics, `Omit`, and `Record` types. The linter executes with exactly **0 errors and 0 warnings**.
2. **Code Splitting**: The build output reported a chunk size warning due to Faker.js. We implemented route-level code splitting using `React.lazy` and `Suspense`, isolating the heavy Playground logic away from the main user board, drastically improving initial load times.
3. **Automated Testing**: We wrote a Vitest suite spanning database migrations, UI interactions, and workflow e2e simulations, verifying critical paths automatically.

---

## 🚀 Key Features

* **Custom Kanban Board**: Fully draggable, column-based task organization.
* **Intelligent Status Tags**: System-computed tags (Overdue, On Time, Not Started, Done) are automatically injected based on live dates and status.
* **Deep-Linkable Modals**: Shareable URLs for exact task views and edit states.
* **Double-Click Edit**: Seamless inline transitions from viewing a task to editing it.
* **Offline Ready**: Instantaneous local state syncing via IndexedDB.

## 🖼️ Visual Progression

Below is a look at the application in action:

*(The Main Task Board - Jira Inspired)*
![Board View](/Users/eramalingam/.gemini/antigravity/brain/22eb1960-7760-4938-88e4-f967365981b3/media__1773764774502.png)

*(Task Editing Overlay)*
![Task Modal](/Users/eramalingam/.gemini/antigravity/brain/22eb1960-7760-4938-88e4-f967365981b3/media__1773766033104.png)

*(The Playground / Debugger)*
![Playground View](/Users/eramalingam/.gemini/antigravity/brain/22eb1960-7760-4938-88e4-f967365981b3/media__1773767677916.png)

---

## Conclusion
By treating this assignment not as a styling exercise but as a true software engineering challenge, we built a highly robust, strictly-typed, and scalable foundation that rivals the complexity of early-stage enterprise SaaS applications.
