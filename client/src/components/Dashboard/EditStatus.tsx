import { useState } from "react";
import './EditStatus.css';

interface EditStatusProps {
  currentStatus: string;
  onClose: () => void;
  onUpdate: (newStatus: string) => void;
}

const EditStatus: React.FC<EditStatusProps> = ({
  currentStatus,
  onClose,
  onUpdate,
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const statusOptions = ["Approved", "Disapproved", "Pending"];

  return (
    <div className="MainContainer">
      <div className="edit-status-container">
        <div className="edit-status-header">
          <span className="edit-status-title gothic-a1-bold">Edit Status</span>
        </div>

        <div className="edit-status-body">
          <div className="edit-status-row">
            <div className="edit-status-label gothic-a1-bold">Update Status</div>
            <div className="edit-status-field">
              <div
                className="edit-status-dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              > 
                <span>{status}</span>
                <i className="bi bi-chevron-down" />
              </div>
              {dropdownOpen && (
                <div className="edit-status-dropdown-menu">
                  {statusOptions.map((option) => (
                    <div
                      key={option}
                      className={`edit-status-dropdown-item ${status === option ? "active" : ""}`}
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

          <div className="edit-status-actions d-flex gap-1 justify-content-end" style={{paddingTop: '50px'}}>
            <button className="edit-status-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="edit-status-btn-primary" onClick={() => onUpdate(status)}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStatus;
