import { memo } from "react";
import "../styles.css";

const IssueCard = memo(({ issue }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'status-open';
      case 'in progress':
        return 'status-in-progress';
      case 'closed':
        return 'status-closed';
      default:
        return 'status-open';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return '#e53e3e';
      case 'high':
        return '#dd6b20';
      case 'medium':
        return '#d69e2e';
      case 'low':
        return '#38a169';
      default:
        return '#718096';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="issue-card">
      <div className="issue-header">
        <div style={{ flex: 1 }}>
          <h3 className="issue-title">{issue.title}</h3>
          <div className="issue-meta">
            <span>#{issue.id}</span>
            {issue.createdAt && (
              <>
                <span>•</span>
                <span>Created {formatDate(issue.createdAt)}</span>
              </>
            )}
            {issue.assignee && (
              <>
                <span>•</span>
                <span>Assigned to {issue.assignee}</span>
              </>
            )}
          </div>
        </div>
        <div className="issue-actions">
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            title="Edit Issue"
          >
            ✏️
          </button>
          <button
            className="btn btn-danger"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            title="Delete Issue"
          >
            🗑️
          </button>
        </div>
      </div>

      {issue.description && (
        <p className="issue-description">{issue.description}</p>
      )}

      <div className="issue-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className={`status-badge ${getStatusClass(issue.status)}`}>
            {issue.status}
          </span>
          {issue.priority && (
            <span
              style={{
                color: getPriorityColor(issue.priority),
                fontSize: '0.75rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {issue.priority}
            </span>
          )}
          {issue.category && (
            <span className="issue-tag">{issue.category}</span>
          )}
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {issue.updatedAt && `Updated ${formatDate(issue.updatedAt)}`}
        </div>
      </div>
    </div>
  );
});

export default IssueCard;