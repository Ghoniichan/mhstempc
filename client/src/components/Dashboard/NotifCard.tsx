import { useNavigate } from 'react-router-dom';
import './Notifcard.css';

type Notification = {
  id: string;
  sender: string;
  receiver: string[];
  message: string;
  isRead: boolean;
  created_at: string;
  subject: string;
};

interface NotifCardProps {
  notification: Notification;
}

const NotifCard: React.FC<NotifCardProps> = ({ notification }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    // If you want to navigate to a notification detail, update the url below
    // Example: navigate(`/notifications/${notification.id}`);
    navigate('');
  };

  // Format date as "Month Day" (e.g., July 15)
  const formattedDate = new Date(notification.created_at).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="notif-card-container" onClick={handleCardClick}>
      <div className="notif-card-header">
        <div className="notif-card-header-left">
          <i className="bi bi-bell" />
          <span className="notif-card-title gothic-a1-bold">{notification.subject}</span>
        </div>
        <div className="notif-card-header-date gothic-a1-regular">
          {formattedDate}
        </div>
      </div>

      {/* Message */}
      <p className="notif-card-text">
        {notification.message}
      </p>

      {/* View link */}
      <button
        className="notif-card-link gothic-a1-bold"
        onClick={e => e.stopPropagation()}
      >
        View
      </button>
    </div>
  );
};

export default NotifCard;