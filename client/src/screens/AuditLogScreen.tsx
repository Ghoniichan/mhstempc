import CustomTable from '../components/Dashboard/CustomTable';

const AuditLogScreen = () => {
  const columnHeadings = [
    'Date & Time',
    'User',
    'Action',
    'Details',
    'IP Address',
  ];

  const rows = [
    ['2025-05-30 10:45 AM', 'jdoe', 'Login', 'Successful login', '192.168.1.1'],
    ['2025-05-30 11:02 AM', 'asmith', 'Updated Profile', 'Changed phone number', '192.168.1.2'],
    ['2025-05-30 12:15 PM', 'jdoe', 'Viewed Records', 'Accessed loan record #LN001', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 11:02 AM', 'asmith', 'Updated Profile', 'Changed phone number', '192.168.1.2'],
    ['2025-05-30 12:15 PM', 'jdoe', 'Viewed Records', 'Accessed loan record #LN001', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 11:02 AM', 'asmith', 'Updated Profile', 'Changed phone number', '192.168.1.2'],
    ['2025-05-30 12:15 PM', 'jdoe', 'Viewed Records', 'Accessed loan record #LN001', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 11:02 AM', 'asmith', 'Updated Profile', 'Changed phone number', '192.168.1.2'],
    ['2025-05-30 12:15 PM', 'jdoe', 'Viewed Records', 'Accessed loan record #LN001', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],
    ['2025-05-30 12:16 PM', 'jdoe', 'Logout', 'User logged out', '192.168.1.1'],

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
