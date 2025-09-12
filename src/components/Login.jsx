import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import ThemeToggle from "./Themetoggle.jsx";

function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

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
          import.meta.env.VITE_BACKEND_URL + "/api/user/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          navigate("/dashboard");
        } else {
          setErrors({ general: data.error || "Login failed" });
        }
      } catch (err) {
        setErrors({ general: "Something went wrong. Try again later." });
        console.error("Login error:", err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-theme-primary px-4 md:px-0 pt-0 md:pt-24 lg:pt-32 xl:pt-0">
      
      <div className="fixed top-10 right-2 z-50 md:right-26 md:pt-4 lg:pt-8 lg:right-54 xl:right-94 xl:top-3">
        <ThemeToggle />
      </div>

      <form
        onSubmit={handleSubmit}
        className="card-theme p-8 rounded-2xl shadow-theme w-96 md:w-[550px] lg:w-[580px] xl:w-[680px]"
      >
        {errors.general && <p className="error-theme text-sm mb-4">{errors.general}</p>}
        
        <h2 className="text-3xl font-[satoshi] font-bold text-center text-theme-gradient glow-effect mb-6">
          Login 🔑
        </h2>
        <p className="text-theme-secondary font-[satoshi] mb-6 xl:text-xl font-medium text-center">
          Welcome back, manage your tasks easily 📜
        </p>

        {/* Email */}
        <div className="form-group-theme">
          <label className="form-label-theme">Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. priyanshu@example.com"
            value={form.email}
            onChange={handleChange}
            className={`input-theme w-full px-4 py-3 rounded-lg ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && (
            <p className="error-theme text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-group-theme relative">
          <label className="form-label-theme">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={`input-theme w-full px-4 py-3 pr-32 rounded-lg ${errors.password ? 'input-error' : ''}`}
          />
          
          {/* Eye button - Updated styling */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 flex items-center text-theme-secondary hover:text-theme-accent transition-all duration-200 text-sm font-medium"
          >
            {showPassword ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
            {showPassword ? "Hide" : "Show"}
          </button>
          
          {errors.password && (
            <p className="error-theme text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-theme w-full py-3 rounded-lg font-semibold text-lg"
        >
          Login
        </button>
        
        <p className="mt-6 font-[satoshi] text-theme-secondary text-center">
          Don't have an account?
          <a
            href="/register"
            className="ml-2 text-theme-accent underline hover:text-theme-gradient transition-all duration-200 font-semibold"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;