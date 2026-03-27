import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <div className="about-hero">
        <h1 className="about-title">Contact Us</h1>
        <p className="about-description">
          Get in touch with our team. We're here to help you with any questions or feedback about IssueTracker.
        </p>
      </div>

      <div className="contact-section">
        <h2 className="contact-title">Get In Touch</h2>

        <div className="contact-grid">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div className="contact-content">
              <h3>Email Us</h3>
              <p>support@issuetracker.com</p>
              <p>We're available 24/7 to help with any issues</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <div className="contact-content">
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
              <p>Monday - Friday, 9AM - 6PM EST</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-content">
              <h3>Visit Us</h3>
              <p>123 Tech Street<br />San Francisco, CA 94105</p>
              <p>United States</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">💬</div>
            <div className="contact-content">
              <h3>Live Chat</h3>
              <p>Available on our website</p>
              <p>Instant support for quick questions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="form-header">
            <h2 className="form-title">Send us a Message</h2>
            <p className="form-subtitle">Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-input"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                style={{ resize: 'vertical', minHeight: '120px' }}
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/about" className="nav-link">← Back to About</Link>
      </div>
    </div>
  );
};

export default Contact;