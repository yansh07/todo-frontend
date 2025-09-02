import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Enter a valid name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted ✅", formData);
    }
  };

  return (
    <div className="flex justify-center  items-center min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900

 dark scroll-smooth px-4 md:px-0 pt-16 lg:pt-24 xl:pt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-50/10 backdrop-brightness-150 backdrop-blur-xl  p-8 rounded-2xl shadow-xl w-96 md:w-[550px] lg:w-[580px] xl:w-[680px] border border-yellow-300/50"
      >
        <h2 className="text-3xl font-[satoshi] font-bold text-center text-yellow-300 mb-6">
          Login 🔑
        </h2>
        <p className="text-yellow-300 font-[satoshi] mb-6 xl:text-xl font-medium text-center">
          Welcome back, manage your tasks easily 📜
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-200 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Priyanshu Singh"
            value={formData.name}
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
            value={formData.email}
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
            value={formData.password}
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
          </button>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        
        <button
          type="submit"
          className="focus:ring-2 focus:ring-yellow-500 w-full py-2 bg-gradient-to-r from-zinc-700  to-zinc-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Login
        </button>
        <p className="mt-4 font-[satoshi] text-yellow-300">Don't have an account?<a href="/register" className="p-2 text-yellow-300 underline hover:font-bold">Sign up</a></p>
      </form>
    </div>
  );
}

export default Login;
