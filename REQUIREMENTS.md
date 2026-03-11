Team Workflow Board + Design System

You’ll build a small but realistic React application for managing a team’s work, along with a reusable component library that the app uses.

The goal is to see how you design components, structure a React app, handle state/data, and maintain code over time — not just how quickly you can hack something together.

1. High-Level Requirements

You will build:

1.	A mini “Team Workflow Board” app (think a very simplified Jira / Trello) that allows:
o	Viewing tasks grouped by status (Backlog, In Progress, Done)
o	Creating and editing tasks
o	Filtering and sorting tasks
o	Persisting data (no backend; in browser only)

2.	A small component library used by the app:
o	Button, TextInput, Select, Modal, Tag/Badge, Card, Toast/Alert
o	Components should be reusable, composable, and styled consistently

You may use React + TypeScript with your choice of build tool (Vite / CRA / Next.js in SPA mode, etc.).

2. Functional Requirements

2.1 Task Model
Each task should have at minimum:

•	id
•	title (short)
•	description (rich enough text – multi-line)
•	status (Backlog | In Progress | Done)
•	priority (Low | Medium | High)
•	assignee (free text)
•	tags (array of strings)
•	createdAt, updatedAt (dates)

You can store this in Local Storage or IndexedDB; no backend is required.


2.2 Core Features
1.	Board View
o	Columns for each status (Backlog, In Progress, Done)
o	Each column shows a list of tasks as cards
o	Ability to move tasks between columns (drag-and-drop or via a dropdown/status change)
o	Task cards show: title, priority, assignee, tags, and relative time (e.g. “updated 3 hours ago”)
2.	Task Creation & Editing
o	A form to create a new task
o	Ability to edit an existing task
o	Client-side validation with clear, accessible error messages
o	“Dirty” state handling: if the user edits a task and tries to navigate away, warn them
3.	Filtering & Sorting
o	Filter by:
	Status (multi-select)
	Priority
	Text search (in title and description)
o	Sort by:
	Created date
	Updated date
	Priority
o	Filters + sort should be represented in the URL query string (so they’re shareable & restorable on refresh)

4.	Persistence & “Migrations”
o	Store tasks in localStorage (or IndexedDB)
o	Define a simple versioned schema (e.g. schemaVersion in storage)
o	Simulate a “migration”:
	Start with a simple shape
	When you detect an older version, transform stored data into the new shape
o	Show a small non-intrusive notification if a migration was performed.
5.	Empty & Error States
o	No tasks yet
o	Filters hide all tasks
o	Storage is unavailable or fails
o	Validation errors

3. Component Library Requirements

Create a simple design system folder (e.g. src/components/ui) with at least:
•	Button (variants: primary, secondary, destructive; sizes: sm, md, lg)
•	TextInput and TextArea
•	Select (for status/priority)
•	Tag/Badge
•	Card (for containing content like a task)
•	Modal (for create/edit dialogs or confirmations)
•	Toast/Alert (for ephemeral notifications: e.g. “Task saved”)

Requirements:
•	Components should be themed consistently: typography, spacing, colors
•	They should be accessible:
o	Proper ARIA attributes for Modal, form inputs, etc.
o	Keyboard navigation where relevant (especially Modal and buttons)
•	Prefer composition over props explosion where appropriate

You may use a CSS solution of your choice (CSS Modules, Tailwind, styled-components, etc.) but keep styling organized and coherent.

4. Non-Functional Requirements
1.	Project Structure
o	Organize code logically (features vs components vs hooks vs utils, etc.)
o	Separate presentational and container logic where it makes sense
o	Create at least one custom hook (e.g. for storage, filters, or form logic)
2.	Testing
o	Add tests with Jest + React Testing Library (or similar)
o	At minimum:
	One test that covers a core workflow (e.g. creating a task & seeing it on the board)
	One test that covers a non-trivial UI behavior (e.g. filters or status changes)
3.	Accessibility & UX
o	Keyboard navigation for key interactions
o	Labels associated with inputs
o	Reasonable focus management (e.g. focusing first field when a Modal opens)
o	Clear UX for errors and loading states (if any)
4.	Performance & Code Quality
o	Avoid unnecessary re-renders where it’s easy to do so
o	Use React DevTools (or similar) to check and fix at least one performance issue; document it in your notes
o	Use TypeScript types meaningfully (e.g. no any everywhere)




5. Deliverables

Please provide:
1.	Git repository
o	With incremental commits that reflect how you actually worked
o	Commit messages that describe what changed and why
o	No “single giant commit” unless you genuinely did it all in one go

2.	README.md
o	How to run the project
o	A short architecture overview:
	How you structured the app
	Rationale for key decisions (state management, component design, data layer)
o	Known limitations or trade-offs
o	If you used any AI assistance, explicitly document:
	Where you used it
	What you changed from the suggestion

3.	Design & Technical Notes (ARCHITECTURE.md or inside README)
o	Component hierarchy sketch (text is fine, diagrams optional)
o	Explanation of your storage versioning/migration approach
o	Example of a refactor you did during the assignment and why

4.	Short Walkthrough (optional but strongly preferred)
o	A 3–5 minute screen recording (Loom or similar) walking through:
	The main flows in the UI
	Code structure in your editor
	A change you’d make next if given more time

6. Constraints

To keep this focused:
•	Do not use a full UI kit (e.g. Material UI, Ant Design) for core components.
o	You may take inspiration from them, but implement the components yourself.
•	You may use:
o	A date/time library
o	A drag-and-drop library (if you choose DnD)
o	A state management library (Zustand, Redux, etc.) — but justify why in your notes
•	You must use TypeScript.
 
7. What We’ll Look For

We will evaluate:
•	Component design: clear APIs, reuse, separation of concerns
•	Application architecture: state management, file structure, data flow
•	Code quality: readability, naming, TypeScript usage, tests
•	UX & polish: accessibility, edge cases, subtle details
•	Maintainability: how easy it would be to extend this in the future
•	Communication: clarity of README and design notes

During the follow-up, we may ask you to:
•	Extend the app with a small new feature
•	Refactor a piece of your own code live
•	Explain trade-offs you made


