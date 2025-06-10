import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import CustomButton from './CustomButton';

interface Props {
  onCancel: () => void;
}

const AppointmentRemarksCard: React.FC<Props> = ({ onCancel }) => {
  const [remarks, setRemarks] = useState('');

  const handleSend = () => {
    alert(`Remarks sent: ${remarks}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="card shadow-sm p-3" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="d-flex align-items-center mb-3">
          <FaBell className="me-2 text-secondary" />
          <strong>Appointment Request</strong>
        </div>

        <div className="mb-3">
          <label htmlFor="remarks" className="form-label fw-semibold">
            Remarks
          </label>
          <textarea
            id="remarks"
            className="form-control"
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter your remarks here..."
          />
        </div>

        <div className="d-flex gap-2">
          <CustomButton label="Send" onClick={handleSend} className="btn btn-primary w-100" />
          <CustomButton label="Cancel" onClick={onCancel} className="btn btn-outline-primary w-100" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentRemarksCard;
