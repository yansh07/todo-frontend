import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import { Link } from "lucide-react";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext.jsx";

function Register() {
  const { setUser } = useUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = "Enter a valid name";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/user/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: form.name,
              email: form.email,
              password: form.password,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          // Show success toast
          toast.success("Account created! Please log in."); // You can use toast.success or toast.info
          // Now redirect to the login page
          navigate("/login");
        } else {
          // If there's an error from the server (e.g., user exists)
          toast.error(data.error || "Signup failed");
          setErrors({ general: data.error || "Signup failed" });
        }
      } catch (err) {
        // For network errors
        toast.error("Something went wrong. Try again later.");
        setErrors({ general: "Something went wrong. Try again later." });
        console.error("Signup error:", err);
      }
    }
  };
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 dark scroll-smooth
 px-4 md:px-0 pt-20 md:pt-30 lg:pt-32 xl:pt-38"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-50/10 backdrop-brightness-150 mb-4 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-96 md:w-[550px] lg:w-[580px] xl:w-[680px] border border-yellow-300/50"
      >
        <h2 className="text-3xl font-[satoshi] font-bold text-center text-yellow-300 mb-6">
          Sign up 🪪
        </h2>
        <p className="text-yellow-300 font-[satoshi] mb-4 xl:text-xl font-medium text-center">
          Start your journey with PlanIt today 🚀
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-200 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Priyanshu Singh"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-200 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. priyanshu@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-gray-200 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {/* Eye button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 mt-7 right-3 flex items-center text-gray-300 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            {showPassword ? "Hide" : "Show"} Password
          </button>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-200 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          // onClick={notify}
          type="submit"
          className="focus:ring-2 focus:ring-yellow-500 w-full py-2 bg-gradient-to-r from-zinc-700  to-zinc-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Sign up
        </button>
        {/* <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-sm text-blue-500 underline mt-2"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button> */}

        <div>
          <p className="font-[satoshi] text-yellow-300 mt-4">
            Already have an account?
            <a
              href="/login"
              className="p-2 text-yellow-300 underline hover:font-bold"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
