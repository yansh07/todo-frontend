import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="relative">
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
