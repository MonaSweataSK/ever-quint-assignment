import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Playground from './components/features/Playground/Playground';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/new" element={<Home />} />
        <Route path="/task/:taskId" element={<Home />} />
        <Route path="/task/:taskId/edit" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
