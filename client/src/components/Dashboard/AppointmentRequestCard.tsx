import React from 'react';
import { FaClock, FaCalendarAlt, FaBell } from 'react-icons/fa';
import CustomButton from './CustomButton';

interface Props {
  onConfirm: () => void;
}

const AppointmentRequestCard: React.FC<Props> = ({ onConfirm }) => {
  const handleReject = () => {
    alert('Appointment rejected.');
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="card shadow-sm p-3" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <FaBell className="me-2 text-secondary" />
            <strong>Appointment Request</strong>
          </div>
          <small className="text-muted">July 15</small>
        </div>

        <h6 className="fw-bold mb-2">Michaela Bandasan</h6>
        <p className="text-muted small mb-3">
          I hope you’re doing well. I would like to schedule a consultation regarding a loan. 
          I would appreciate the opportunity to discuss my options and get guidance on the best 
          loan plan for my needs.
        </p>

        <div className="d-flex gap-2 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaClock />
            </span>
            <input type="text" className="form-control" value="10:00 am" readOnly />
          </div>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaCalendarAlt />
            </span>
            <input type="text" className="form-control" value="22/03/2025" readOnly />
          </div>
        </div>

        <div className="d-flex gap-2">
          <CustomButton label="Confirm" onClick={onConfirm} className="btn btn-primary w-100" />
          <CustomButton label="Reject" onClick={handleReject} className="btn btn-outline-primary w-100" />
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestCard;
