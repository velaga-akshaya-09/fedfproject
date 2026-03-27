const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeStyles = {
    small: { width: '16px', height: '16px' },
    medium: { width: '24px', height: '24px' },
    large: { width: '32px', height: '32px' }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '2rem'
    }}>
      <div
        className="loading-spinner"
        style={sizeStyles[size]}
      ></div>
      {text && (
        <p style={{
          margin: 0,
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;