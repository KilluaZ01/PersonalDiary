import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDiaryEntries } from "../api/diaryApi";
import { AuthContext } from "../context/AuthContext";
import { FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

const EntryDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getDiaryEntries(user.token).then((res) => {
        const foundEntry = res.data.find((entry) => entry._id === id);
        setEntry(foundEntry);
      });
    }
  }, [user, id]);

  if (!entry) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-40 py-12 min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Back Button */}
      <button
        className="flex items-center text-blue-600 hover:text-blue-700 transition mb-6"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      {/* Entry Detail Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{entry.title}</h2>
          {/* Favorite Toggle */}
          <span className="text-yellow-500">
            {entry.favorite ? <FaStar size={24} /> : <FaRegStar size={24} />}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed">{entry.content}</p>
      </motion.div>
    </div>
  );
};

export default EntryDetail;
