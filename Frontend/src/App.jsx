import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import CreateEntry from "./pages/CreateEntry";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import EntryDetail from "./pages/EntryDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-entry" element={<CreateEntry />} />
          <Route path="/edit-entry/:id" element={<CreateEntry />} />
          <Route path="/entry/:id" element={<EntryDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
