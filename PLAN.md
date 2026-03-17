Task tracker

Task schema:
•	id
•	title (short)
•	description (rich enough text – multi-line)
•	status (Backlog | In Progress | Done)
•	priority (Low | Medium | High)
•	assignee (free text)
•	tags (array of strings)
•	createdAt, updatedAt (dates)

UI: 
three columns for respective statuses
cards (draggable)
form (create/edit)
filter button 
sort button
toast/alert/error
modal (details)


cards:
 title, priority, assignee, tags, and relative time (e.g. “updated 3 hours ago”)

form :
 fields for scheme
 can be used both create and edit

filtering and sorting
[create date][up/down]
[create date][up/down]
[create date][up/down]

required Base components:
•	Button (variants: primary, secondary, destructive; sizes: sm, md, lg)
•	TextInput and TextArea
•	Select (for status/priority)
•	Tag/Badge
•	Card (for containing content like a task)
•	Modal (for create/edit dialogs or confirmations)
•	Toast/Alert (for ephemeral notifications: e.g. “Task saved”)

composite comps:
select (button and text)

Types
we are going to keep types in two places - types specific to component will be kept inside the same component folder,
types which are used in multiple places will be kept in shared/types 


DB ( indexed DB )
We need to store records of data. also retrieve them efficiently ( tasks, assignees, tags)


State management -
 We will use Zustand for this as it is simpler to use than Redux. 
 We will use helpers for state management and DB management



 
