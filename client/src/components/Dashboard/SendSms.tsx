import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';

const SendSms: React.FC = () => {
  const [selectedBorrower, setSelectedBorrower] = useState('Liscano');
  const navigate = useNavigate();

  const handleSendClick = () => {
    alert(`SMS sent to ${selectedBorrower}`);
  };

  const handleCancelClick = () => {
    navigate('/clientLoan');
  };

  return (
    <div className="container py-4">
      <div
        className="card shadow-sm mx-auto"
        style={{
          maxWidth: '600px',
          width: '100%',
          minHeight: '450px', // allows responsiveness while reserving visual space
        }}
      >
        <div className="card-body">
          <h5 className="card-title mb-3">
            <i className="bi bi-envelope-fill me-2"></i>
            Send SMS
          </h5>
          <p className="text-muted mb-3">
            Use this template to send automated loan payment reminders to borrowers. Ensure that{' '}
            <strong>{'{DueAmount}'}</strong> is dynamically replaced with the correct borrower details.
          </p>

          <div className="mb-3">
            <label htmlFor="borrowerSelect" className="form-label">
              Select Borrower
            </label>
            <select
              id="borrowerSelect"
              className="form-select"
              value={selectedBorrower}
              onChange={(e) => setSelectedBorrower(e.target.value)}
            >
              <option value="Liscano">Liscano</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="smsMessage" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="smsMessage"
              rows={3}
              readOnly
              value={`Your loan of Php{Due Balance} is due today. Please ignore this message if you have already made the payment. Do not reply.`}
            />
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 pt-3 w-100">
            <CustomButton label="Cancel" onClick={handleCancelClick} className="flex-fill" />
            <CustomButton label="Send SMS" onClick={handleSendClick} className="flex-fill" />
         </div>

        </div>
      </div>
    </div>
  );
};

export default SendSms;
