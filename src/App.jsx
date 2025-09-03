import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Usernav from "./components/Usernav";
import Profile from "./components/Profile";
import AddNote from "./components/AddNote";
// import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const showNavbar = ["/", "/register", "/login"].includes(
    location.pathname.toLowerCase()
  );
  // const showFooter = ["/", "/login", "/register" ,"/dashboard", "/add-note", "/profile"].includes(
  //   location.pathname.toLowerCase()
  // );

  return (
    <div className="relative">
      {showNavbar && <Navbar />}
      {/* {showUsernav && <Usernav />} */}
      {/* {showFooter && <Footer />}   */}

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


export default App;
