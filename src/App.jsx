import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Usernav from "./components/Usernav";
import Profile from "./components/Profile";

function App() {
  const location = useLocation();

  // Pages jaha Navbar chahiye
  const showNavbar = ["/", "/login", "/register"].includes(
    location.pathname.toLowerCase()
  );
  // const showUsernav = ["/dashboard"].includes(
  //   location.pathname.toLowerCase()
  // );

  return (
    <div className="relative">
      {showNavbar && <Navbar />}
      {/* {showUsernav && <Usernav />} */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
