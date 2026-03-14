Schema
 id(string)
 title(string)
 description(string)
 status(enum)
 priority(enum)
 due date(date)
 assignee(string)
 created date(date)
 updated date(date)
 tags(array of strings)

 Component 1 : Task Card
   - id
   - Title
   - priority
   - assignee
   - tags
   - relative time( eg. updated 3 hours ago)

Component 2: TaskForm
  it will utilise the existing modal, input and button component.
  same component will be used to create, view and edit.
  Component will have 3 sections - form header, form body and form footer.
  form header - if its new, title will be 'New Task', if its edit, it will be 'Edit task'. Have a edit and delete icon.
  Form body - it have necesary fields for task. When opening an existing task, the fields will be in read-only mode. when we click 'Edit', we can edit the fields.
  Form footer - it will have submit and cancel button. 
                when in read-only mode, it will be disabled.
  form is goining to be only in the modal ( right slider ).
  
