import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const Playground = lazy(() => import('./components/features/Playground/Playground'));

// A simple loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-500 animate-pulse">Loading EverQuint...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/new" element={<Home />} />
          <Route path="/task/:taskId" element={<Home />} />
          <Route path="/task/:taskId/edit" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
