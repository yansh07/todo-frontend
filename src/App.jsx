import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
// import Usernav from "./components/Usernav";
import Profile from "./components/Profile";
import AddNote from "./components/AddNote";
// import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
// import ProfileUpload from "./components/ProfileUpload";
import ProfilePage from "./pages/ProfilePage";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";
import ProfileUpload from "./components/ProfileUpload";

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
      {/* baki routes/components */}
      <Toaster />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-upload" element={<ProfileUpload />} />
      </Routes>
    </div>
  );
}


export default App;
