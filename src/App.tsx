import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import { ORMDemo } from './components/features/ORM/ORMDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/new" element={<Home />} />
        <Route path="/task/:taskId" element={<Home />} />
        <Route path="/task/:taskId/edit" element={<Home />} />
        <Route path="/orm-demo" element={<ORMDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
