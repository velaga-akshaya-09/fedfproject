import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field-specific errors when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate different error scenarios
      if (formData.email === "error@example.com") {
        throw new Error("Account not found. Please check your email or sign up.");
      }

      if (formData.password === "wrong") {
        throw new Error("Incorrect password. Please try again.");
      }

      login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login with example accounts
    setLoading(true);
    setTimeout(() => {
      if (provider === 'google') {
        login('akshaya@gmail.com', 'password');
      } else if (provider === 'github') {
        login('akshaya@github.com', 'password');
      }
      navigate("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your IssueTracker account</p>
        </div>

        <div className="social-login">
          <div className="social-login-title">Quick Login with Example Accounts</div>
          <div className="social-buttons">
            <button
              type="button"
              className="btn btn-social btn-google"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              aria-label="Continue with Google"
            >
              <span className="social-icon">G</span>
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              className="btn btn-social btn-github"
              onClick={() => handleSocialLogin('github')}
              disabled={loading}
              aria-label="Continue with GitHub"
            >
              <span className="social-icon"></span>
              <span>Continue with GitHub</span>
            </button>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>
            💡 Use these example accounts for quick testing
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '1.5rem 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          or
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${fieldErrors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            {fieldErrors.email && (
              <div className="field-error">{fieldErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${fieldErrors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            {fieldErrors.password && (
              <div className="field-error">{fieldErrors.password}</div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={loading}
              />
              Remember me
            </label>
            <a href="#" style={{ fontSize: '0.875rem', color: '#667eea', textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', position: 'relative' }}
          >
            {loading ? (
              <>
                <span className="loading-spinner" style={{ marginRight: '0.5rem' }}></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-links">
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link" style={{ color: '#667eea', fontWeight: '600' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;