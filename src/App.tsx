import TaskFormDemo from './components/features/Task/TaskFormDemo';
import TagEditorDemo from './components/ui/TagEditor/TagEditorDemo';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">
        Component Library Showcase
      </h1>

      <div className="max-w-7xl mx-auto space-y-12">
        <TaskFormDemo />
        <TagEditorDemo />
      </div>
    </div>
  );
}

export default App;
