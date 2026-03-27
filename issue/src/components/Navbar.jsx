import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      background: 'var(--bg-secondary)',
      padding: '1rem 2rem',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link
            to="/dashboard"
            style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none'
            }}
          >
            IssueTracker
          </Link>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/create" className="nav-link">Create Issue</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            Welcome, {user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;