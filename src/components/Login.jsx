import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Enter a valid name";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Password validation
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
      // Yaha backend API call laga sakta hai
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#060010] dark scroll-smooth
 px-4 md:px-0 pt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-transparent backdrop-brightness-150  backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 md:w-[550px] lg:w-[580px] xl:w-[680px] border border-white/20"
      >
        <h2 className="text-3xl font-[satoshi] font-bold text-center text-white mb-6">
          Login 🔑
        </h2>
        <p className="text-gray-50 font-[satoshi] mb-4 xl:text-xl font-medium text-center">Welcome back, manage your tasks easily 📜</p>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-200 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Priyanshu Singh"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-200 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="focus:ring-2 focus:ring-violet-500 w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
