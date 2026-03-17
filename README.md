# EverQuint - Premium Task Management

Welcome to EverQuint, a high-performance, robust task management application.

👉 **[Read the Full Build Journey & Architectural Story](./PROJECT_JOURNEY.md)** 👈

## Quick Start

1. **Install Dependencies**: `npm install`
2. **Run Dev Server**: `npm run dev`
3. **Run Tests**: `npm run test`
4. **Build & Lint**: `npm run build && npm run lint`

## Architecture Highlights
- **Storage**: IndexedDB (via `idb`) with custom indexing for asynchronous, scalable data management.
- **State**: `Zustand` for surgical, render-optimized global state.
- **UI**: React, Tailwind CSS, `@hello-pangea/dnd` for smooth drag-and-drop.
- **Routing**: React Router DOM with deep-linked URL synchronization.
- **Performance**: Route-level code splitting via `React.lazy`.

Please read the `PROJECT_JOURNEY.md` linked above for a deep dive into the engineering decisions made during this assignment.
