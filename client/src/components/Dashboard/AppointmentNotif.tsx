import './AppointmentNotif.css';
import { useNavigate } from 'react-router-dom';

const AppointmentNotifCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/appointmentRequest');
  };

  return (
    <div className="container card p-3" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* Title */}
      <h3 className="header gothic-a1-bold mb-1">
        <i className="bi bi-bell"></i> Appointment Request
      </h3>

      {/* Date below title */}
      <h6 className="date text-muted gothic-a1-regular mb-2">July 15</h6>

      {/* Message */}
      <p className="mb-2">
        Carlos requests an appointment for consultation.
      </p>

      {/* Action Link */}
      <a href="#" onClick={(e) => e.preventDefault()} className="card-link">
        View
      </a>
    </div>
  );
};

export default AppointmentNotifCard;
