import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          Create Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Sign up and start journaling your thoughts
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="relative mb-6">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-md bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <FaEnvelope className="absolute left-4 top-3 text-gray-500" />
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-md bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
            Register
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6 text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
