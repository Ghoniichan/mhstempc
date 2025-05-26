import { useState } from 'react';
import './EditStatus.css';

const EditStatus = () => {
  const [status, setStatus] = useState('Disapproved');
  const [remarks, setRemarks] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const statusOptions = ['Approved', 'Disapproved', 'Pending'];

  return (
    <div className="MainContainer" 
    style={{display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw'}}>

      <div className="edit-status-container">
        <div className="edit-status-header">
          <span className="edit-status-title gothic-a1-bold">Edit Status</span>
        </div>

        <div className="edit-status-body">
          <div className="edit-status-row">
            <div className="edit-status-label gothic-a1-bold">
              <span>Update Status</span>
            </div>
            <div className="edit-status-field">
              <div 
                className="edit-status-dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{status}</span>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
              </div>

              {dropdownOpen && (
                <div className="edit-status-dropdown-menu">
                  {statusOptions.map((option) => (
                    <div
                      key={option}
                      className={`edit-status-dropdown-item ${status === option ? 'active' : ''}`}
                      onClick={() => {
                        setStatus(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="edit-status-row">
            <div className="edit-status-label gothic-a1-bold">
              <span>Remarks</span>
            </div>
            <div className="edit-status-field gothic-a1-normal">
              <textarea
                className="edit-status-textarea gothic-a1-normal"
                rows={6}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>

          <div className="edit-status-actions">
            <button className="edit-status-btn-primary gothic-a1-bold">Update</button>
            <button className="edit-status-btn-secondary gothic-a1-bold">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="d-flex justify-content-center align-items-center p-4 bg-light" style={{ minHeight: "100vh" }}>
      <EditStatus />
    </div>
  );
}
