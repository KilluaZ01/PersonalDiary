import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createDiaryEntry,
  updateDiaryEntry,
  getDiaryEntries,
} from "../api/diaryApi";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const CreateEntry = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Get entry ID for editing
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (id && user) {
      getDiaryEntries(user.token).then((res) => {
        const entry = res.data.find((e) => e._id === id);
        if (entry) {
          setFormData({ title: entry.title, content: entry.content });
        }
      });
    }
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateDiaryEntry(user.token, id, formData);
      } else {
        await createDiaryEntry(user.token, formData);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="mx-auto px-40 py-12 min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Back Button */}
      <button
        className="flex items-center text-blue-600 hover:text-blue-700 transition mb-6"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {id ? "Edit Entry" : "New Entry"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          {/* Content Field */}
          <textarea
            name="content"
            placeholder="Write your thoughts..."
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              {id ? "Update Entry" : "Add Entry"}
            </button>
            <button
              type="button"
              className="w-full bg-gray-400 text-white py-3 rounded-lg shadow-lg hover:bg-gray-500 transition"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEntry;
