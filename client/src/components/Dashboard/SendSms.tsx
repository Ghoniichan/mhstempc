import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import axios from '../../api/axiosInstance';

const SendSms: React.FC = () => {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const email = localStorage.getItem('selectedEmail');
  const [message, setMessage] = useState(`Your loan of Php{Due Balance} is due today. Please ignore this message if you have already made the payment. Do not reply.`);

  const handleSendClick = async () => {
    try {
      const smsMessage = message;
      const payload = {
        to: email,
        subject: `Message From MHSTEMPC`,
        text: smsMessage
      };
      await axios.post('/api/emailer/send-email', payload);
      setEmailSent(true);
      navigate('/clientLoan');
    } catch (error) {
      console.error('Error sending Email:', error);
      alert('Failed to send Email. Please try again later.');
      return;
    }
  };

  const handleCancelClick = () => {
    navigate('/clientLoan');
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100" >
      <div
        className="card shadow-sm mx-auto"
        style={{
          maxWidth: '600px',
          width: '100%',
          minHeight: '450px', 
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
            <label htmlFor="smsMessage" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              style={{ maxWidth: '600px'}}
              id="smsMessage"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {emailSent && (
            <div className="alert alert-success" role="alert">
              Email sent successfully!
            </div>
          )}

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
