import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
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

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
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
      if (formData.email === "taken@example.com") {
        throw new Error("This email address is already registered. Please use a different email or try logging in.");
      }

      signup(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    setLoading(true);
    setTimeout(() => {
      if (provider === 'google') {
        signup('akshaya@gmail.com', 'password');
      } else if (provider === 'github') {
        signup('akshaya@github.com', 'password');
      }
      navigate("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join IssueTracker and start managing your projects</p>
        </div>

        <div className="social-login">
          <div className="social-login-title">Quick Sign up with Example Accounts</div>
          <div className="social-buttons">
            <button
              type="button"
              className="btn btn-google"
              onClick={() => handleSocialSignup('google')}
              disabled={loading}
              style={{ justifyContent: 'center', gap: '0.5rem', position: 'relative' }}
            >
              <span>🌐</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Sign up with Google</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>akshaya@gmail.com</div>
              </div>
            </button>
            <button
              type="button"
              className="btn btn-github"
              onClick={() => handleSocialSignup('github')}
              disabled={loading}
              style={{ justifyContent: 'center', gap: '0.5rem', position: 'relative' }}
            >
              <span>⚫</span>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Sign up with GitHub</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>akshaya@github.com</div>
              </div>
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

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-input ${fieldErrors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
              {fieldErrors.firstName && (
                <div className="field-error">{fieldErrors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-input ${fieldErrors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
              />
              {fieldErrors.lastName && (
                <div className="field-error">{fieldErrors.lastName}</div>
              )}
            </div>
          </div>

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
              placeholder="Create a strong password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            {fieldErrors.password && (
              <div className="field-error">{fieldErrors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-input ${fieldErrors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
            {fieldErrors.confirmPassword && (
              <div className="field-error">{fieldErrors.confirmPassword}</div>
            )}
          </div>

          <div className="form-group">
            <label className={`checkbox-label ${fieldErrors.agreeToTerms ? 'error' : ''}`}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="checkmark"></span>
              I agree to the <a href="#" style={{ color: '#667eea' }}>Terms of Service</a> and <a href="#" style={{ color: '#667eea' }}>Privacy Policy</a>
            </label>
            {fieldErrors.agreeToTerms && (
              <div className="field-error">{fieldErrors.agreeToTerms}</div>
            )}
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-links">
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Already have an account?{" "}
            <Link to="/login" className="auth-link" style={{ color: '#667eea', fontWeight: '600' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;