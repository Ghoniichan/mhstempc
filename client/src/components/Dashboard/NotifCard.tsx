import { useNavigate } from 'react-router-dom';
import './Notifcard.css';

const NotifCard: React.FC = () => {
  const navigate = useNavigate();
  const handleCardClick = () => navigate('/appointmentRequest');

  return (
    <div className="notif-card-container" onClick={handleCardClick}>
      <div className="notif-card-header">
        <div className="notif-card-header-left">
          <i className="bi bi-bell" />
          <span className="notif-card-title gothic-a1-bold">Account Changed</span>
        </div>
        <div className="notif-card-header-date gothic-a1-regular">
          July 15
        </div>
      </div>

      {/* Message */}
      <p className="notif-card-text">
        Carlos changed his phone number
      </p>

      {/* View link */}
      <button className="notif-card-link gothic-a1-bold" onClick={e => e.stopPropagation()}>
        View
      </button>
    </div>
  );
};

export default NotifCard;
