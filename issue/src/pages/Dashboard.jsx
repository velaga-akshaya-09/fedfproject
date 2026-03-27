import { useContext, useState, useMemo } from "react";
import { IssueContext } from "../context/IssueContext";
import IssueList from "../components/IssueList";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import "../styles.css";

const Dashboard = () => {
  const { issues, loading } = useContext(IssueContext);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchesFilter = filter === "all" || issue.status.toLowerCase() === filter;
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [issues, filter, searchTerm]);

  const stats = useMemo(() => {
    const total = issues.length;
    const open = issues.filter(issue => issue.status === "Open").length;
    const inProgress = issues.filter(issue => issue.status === "In Progress").length;
    const closed = issues.filter(issue => issue.status === "Closed").length;
    const critical = issues.filter(issue => issue.priority === "Critical").length;
    const high = issues.filter(issue => issue.priority === "High").length;

    return { total, open, inProgress, closed, critical, high };
  }, [issues]);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem' }}>
        <Loader />
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Loading your issues...
        </p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-content">
          <h1 className="analytics-title">Analytics Dashboard</h1>
          <p className="analytics-subtitle">Real-time project metrics & insights</p>
        </div>
        <div className="header-actions">
          <Link to="/create" className="btn btn-primary">
            <span>+</span> New Issue
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        <div className="kpi-card total">
          <div className="kpi-icon">📊</div>
          <div className="kpi-metric">{stats.total}</div>
          <div className="kpi-label">Total Issues</div>
          <div className="kpi-trend">+12%</div>
        </div>

        <div className="kpi-card open">
          <div className="kpi-icon">🔴</div>
          <div className="kpi-metric">{stats.open}</div>
          <div className="kpi-label">Open</div>
          <div className="kpi-trend">+5%</div>
        </div>

        <div className="kpi-card progress">
          <div className="kpi-icon">🟡</div>
          <div className="kpi-metric">{stats.inProgress}</div>
          <div className="kpi-label">In Progress</div>
          <div className="kpi-trend">+8%</div>
        </div>

        <div className="kpi-card closed">
          <div className="kpi-icon">🟢</div>
          <div className="kpi-metric">{stats.closed}</div>
          <div className="kpi-label">Closed</div>
          <div className="kpi-trend">+15%</div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="analytics-grid">
        {/* Priority Matrix */}
        <div className="analytics-card priority-matrix">
          <div className="card-header">
            <h3>Priority Distribution</h3>
          </div>
          <div className="matrix-grid">
            <div className="matrix-item critical">
              <div className="matrix-number">{stats.critical}</div>
              <div className="matrix-label">Critical</div>
            </div>
            <div className="matrix-item high">
              <div className="matrix-number">{stats.high}</div>
              <div className="matrix-label">High</div>
            </div>
            <div className="matrix-item medium">
              <div className="matrix-number">
                {issues.filter(issue => issue.priority === "Medium" || !issue.priority).length}
              </div>
              <div className="matrix-label">Medium</div>
            </div>
            <div className="matrix-item low">
              <div className="matrix-number">
                {issues.filter(issue => issue.priority === "Low").length}
              </div>
              <div className="matrix-label">Low</div>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="analytics-card status-breakdown">
          <div className="card-header">
            <h3>Status Breakdown</h3>
          </div>
          <div className="status-table">
            <div className="table-row">
              <div className="table-label">Open Issues</div>
              <div className="table-value">{stats.open}</div>
              <div className="table-percentage">
                {stats.total > 0 ? Math.round((stats.open / stats.total) * 100) : 0}%
              </div>
            </div>
            <div className="table-row">
              <div className="table-label">In Progress</div>
              <div className="table-value">{stats.inProgress}</div>
              <div className="table-percentage">
                {stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0}%
              </div>
            </div>
            <div className="table-row">
              <div className="table-label">Closed</div>
              <div className="table-value">{stats.closed}</div>
              <div className="table-percentage">
                {stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="analytics-card quick-stats">
          <div className="card-header">
            <h3>Quick Stats</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">
                {issues.filter(issue => issue.priority === "Critical").length}
              </div>
              <div className="stat-label">Critical Priority</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {Math.round((stats.closed / Math.max(stats.total, 1)) * 100)}%
              </div>
              <div className="stat-label">Resolution Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {issues.filter(issue => new Date(issue.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="stat-label">This Week</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {Math.round(stats.total / 30)}
              </div>
              <div className="stat-label">Avg/Month</div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="analytics-card action-panel">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="action-buttons">
            <Link to="/create" className="action-btn primary">
              <span>➕</span> Create Issue
            </Link>
            <button className="action-btn" onClick={() => setFilter("open")}>
              <span>🔍</span> View Open
            </button>
            <button className="action-btn" onClick={() => setFilter("in progress")}>
              <span>⚡</span> View Progress
            </button>
            <button className="action-btn" onClick={() => setFilter("all")}>
              <span>📋</span> View All
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;