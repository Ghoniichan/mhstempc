import CustomTable from '../components/Dashboard/CustomTable';
import axios from '../api/axiosInstance';
import { useEffect, useState } from 'react';

const AuditLogScreen = () => {
  // now each row is an array of strings, matching columnHeadings order
  const [rows, setRows] = useState<string[][]>([]);

  const columnHeadings = [
    'Date & Time',
    'User',
    'Action',
    'Details'
  ];

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await axios.get('/api/audit');
        const data: {
          id: string;
          account_id: string;
          action: string;
          details: string;
          created_at: string;
        }[] = response.data;

        // map raw logs → [ dateTime, userId, action, details ]
        const formatted: string[][] = data.map(log => [
          // format the ISO timestamp however you like
          new Date(log.created_at).toLocaleString(),
          log.account_id,
          log.action,
          log.details
        ]);

        setRows(formatted);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    fetchAuditLogs();
  }, []);

  return (
    <div
      className="mt-1"
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
            <CustomTable
              columnHeadings={columnHeadings}
              rows={rows}
              className="w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogScreen;
