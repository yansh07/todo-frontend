import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Usernav from "./components/Usernav";

function App() {
  const location = useLocation();

  // Pages jaha Navbar chahiye
  const showNavbar = ["/", "/login", "/register"].includes(
    location.pathname.toLowerCase()
  );
  const showUsernav = ["/Dashboard"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="relative">
      {showNavbar && <Navbar />}
      {showUsernav && <Usernav />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
