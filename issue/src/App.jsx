import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateIssue from "./pages/CreateIssue";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="app-container">
        {user && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/dashboard" /> : <Signup />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <CreateIssue /> : <Navigate to="/login" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;