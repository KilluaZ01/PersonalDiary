import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      if (res.status === 200) {
        login(res.data);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-xl shadow-xl w-96 backdrop-blur-lg bg-opacity-90"
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Login to access your personal diary
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative mb-6">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-md bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <FaLock className="absolute left-4 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-md bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-gray-600 text-sm mb-6">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6 text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
