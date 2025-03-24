import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getDiaryEntries,
  deleteDiaryEntry,
  updateDiaryEntry,
} from "../api/diaryApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaEdit,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getDiaryEntries(user.token).then((res) => setEntries(res.data));
    }
  }, [user]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = async (id, currentFavorite) => {
    try {
      await updateDiaryEntry(user.token, id, { favorite: !currentFavorite });
      setEntries(
        entries.map((entry) =>
          entry._id === id ? { ...entry, favorite: !currentFavorite } : entry
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteDiaryEntry(user.token, id);
    setEntries(entries.filter((entry) => entry._id !== id));
  };

  const filteredEntries = entries.filter(
    (entry) =>
      (showFavorites ? entry.favorite : true) &&
      (entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mx-auto px-40 py-12 min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📖 My Diary
      </h2>

      {/* Search & Favorites Toggle */}
      <div className="flex items-center justify-between bg-white shadow-md p-3 rounded-lg mb-4">
        <div className="relative w-3/4">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search diary entries..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-3 py-2 border rounded-lg shadow-md bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          className={`flex items-center px-4 py-2 rounded-lg shadow-md transition ${
            showFavorites ? "bg-yellow-400 text-white" : "bg-gray-300"
          }`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? (
            <FaStar className="mr-2" />
          ) : (
            <FaRegStar className="mr-2" />
          )}
          {showFavorites ? "Show All" : "Favorites"}
        </button>
      </div>

      {/* Add New Entry Button */}
      <button
        className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition mb-6"
        onClick={() => navigate("/create-entry")}
      >
        <FaPlus className="mr-2" /> Add New Entry
      </button>

      {/* Display Entries */}
      {filteredEntries.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No diary entries found.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry._id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/entry/${entry._id}`)} // Navigate to details page
            >
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {entry.title}
              </h3>
              <p className="text-gray-600">
                {entry.content.substring(0, 100)}...
              </p>

              <div className="flex justify-between items-center mt-3">
                {/* Favorite Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent clicking the card from navigating
                    toggleFavorite(entry._id, entry.favorite);
                  }}
                  className="text-yellow-500 hover:text-yellow-600 transition"
                >
                  {entry.favorite ? (
                    <FaStar size={18} />
                  ) : (
                    <FaRegStar size={18} />
                  )}
                </button>

                <div className="flex gap-3">
                  {/* Edit Button */}
                  <button
                    className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-entry/${entry._id}`);
                    }}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry._id);
                    }}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
