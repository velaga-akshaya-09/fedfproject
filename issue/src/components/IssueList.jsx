import React, { memo } from "react";
import IssueCard from "./IssueCard";

const IssueList = memo(({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: 'var(--text-secondary)',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
        <p>No issues to display</p>
      </div>
    );
  }

  return (
    <div className="issues-list">
      {issues.map((issue) => (
        <IssueCard key={issue.id || issue.title} issue={issue} />
      ))}
    </div>
  );
});

export default IssueList;