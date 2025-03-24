import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaPenFancy,
  FaLock,
  FaCloud,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-center px-6 py-20 space-y-16">
      {/* Logo & Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center space-y-1"
      >
        <FaBookOpen size={70} className="text-blue-600" />
        <h1 className="text-6xl font-bold text-blue-700">Personal Diary</h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-700 font-medium text-xl max-w-2xl leading-relaxed"
      >
        A private space to write, reflect, and capture your daily moments. Your
        thoughts are safe with us.
      </motion.p>

      {/* Call-to-Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link to="/dashboard">
          <button className="flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition">
            <FaPenFancy size={20} />
            <span>Start Writing</span>
          </button>
        </Link>
      </motion.div>

      {/* Decorative Divider */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "60%" }}
        transition={{ delay: 1.2, duration: 1 }}
        className="border-t-4 border-blue-600 mt-16 mb-26"
      ></motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 text-gray-700"
      >
        {/* Feature 1: Secure Writing */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-white shadow-lg rounded-lg">
          <FaLock size={50} className="text-blue-600" />
          <h2 className="text-2xl font-semibold">Secure & Private</h2>
          <p className="text-sm text-gray-600 max-w-sm">
            Your thoughts are protected with end-to-end encryption.
          </p>
        </div>

        {/* Feature 2: Cloud Backup */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-white shadow-lg rounded-lg">
          <FaCloud size={50} className="text-blue-600" />
          <h2 className="text-2xl font-semibold">Cloud Backup</h2>
          <p className="text-sm text-gray-600 max-w-sm">
            Access your diary from anywhere, anytime.
          </p>
        </div>

        {/* Feature 3: Easy Editing */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-white shadow-lg rounded-lg">
          <FaEdit size={50} className="text-blue-600" />
          <h2 className="text-2xl font-semibold">Easy to Edit</h2>
          <p className="text-sm text-gray-600 max-w-sm">
            Modify your entries with a seamless writing experience.
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-16 text-gray-700 text-md font-semibold"
      >
        <p>“Writing is the painting of the voice.” – Voltaire</p>
      </motion.footer>
    </div>
  );
};

export default Home;
