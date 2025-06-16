import CustomTable from '../components/Dashboard/CustomTable';

const AuditLogScreen = () => {
  const columnHeadings = [
    'Date & Time',
    'User',
    'Action',
    'Details'
  ];

  const rows = [
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out'],

  ];

  return (
    <div
      className="mt-1 "
      style={{
        marginLeft: '200px', // fixed sidebar
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      <h1 className="mb-4">Audit Log</h1>
      <div
        className="card shadow-sm mt-3"
        style={{
          maxWidth: '1000px',
          margin: '0 auto', 
        }}
      >
        <div className="card-body">
          <p className="text-muted mb-4">
            This section displays the audit logs of user activities.
          </p>
          <div className="table-responsive">
            <CustomTable columnHeadings={columnHeadings} rows={rows} className="w-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogScreen;
