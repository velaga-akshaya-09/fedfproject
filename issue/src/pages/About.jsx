import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: "🎯",
      title: "Issue Tracking",
      description: "Comprehensive issue tracking with status management, priority levels, and detailed categorization."
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Real-time analytics and reporting to monitor project progress and team performance."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Seamless collaboration tools for teams to work together efficiently on projects."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Enterprise-grade security with data encryption and privacy protection."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Fully responsive design that works perfectly on all devices and screen sizes."
    },
    {
      icon: "⚡",
      title: "Fast Performance",
      description: "Optimized performance with fast loading times and smooth user interactions."
    }
  ];

  const team = [
    {
      name: "Yadam deekshitha",
      role: "CEO & Founder",
      bio: "Passionate about building tools that help teams succeed. 10+ years in product management.",
      avatar: "YD"
    },
    {
      name: "sneha latha reddy",
      role: "CTO",
      bio: "Full-stack developer with expertise in React, Node.js, and cloud architecture.",
      avatar: "SLR"
    },
    {
      name: "Velaga Akshaya",
      role: "Head of Design",
      bio: "UX/UI designer focused on creating intuitive and beautiful user experiences.",
      avatar: "VA"
    },
    {
      name: "Velaga Akshaya",
      role: "Lead Developer",
      bio: "Senior software engineer specializing in scalable web applications and APIs.",
      avatar: "VA"
    }
  ];

  const stats = [
    { number: "1K+", label: "Active Users" },
    { number: "5K+", label: "Issues Resolved" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div>
      <div className="about-hero">
        <h1 className="about-title">About IssueTracker</h1>
        <p className="about-description">
          Empowering teams to track, manage, and resolve issues efficiently.
          Built for modern development workflows with a focus on collaboration and productivity.
        </p>
      </div>

      <div className="page-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            To revolutionize issue tracking by providing teams with powerful, intuitive tools
            that streamline workflows, enhance collaboration, and drive project success.
            We believe that great software is built by great teams working together seamlessly.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              padding: '2rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </div>
              <div style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="team-section">
        <h2 className="team-title">Meet Our Team</h2>
        <p style={{
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          The passionate people behind IssueTracker
        </p>

        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-member">
              <div className="team-avatar">{member.avatar}</div>
              <h3 className="team-name">{member.name}</h3>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="page-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            Join thousands of teams already using IssueTracker to streamline their workflows.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn btn-primary">
              Start Free Trial
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;