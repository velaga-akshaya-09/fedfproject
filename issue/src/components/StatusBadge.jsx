const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
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

  const sizeStyles = {
    small: { fontSize: '0.7rem', padding: '0.2rem 0.5rem' },
    medium: { fontSize: '0.75rem', padding: '0.375rem 0.75rem' },
    large: { fontSize: '0.875rem', padding: '0.5rem 1rem' }
  };

  return (
    <span
      className={`status-badge ${getStatusClass(status)}`}
      style={sizeStyles[size]}
    >
      {status}
    </span>
  );
};

export default StatusBadge;