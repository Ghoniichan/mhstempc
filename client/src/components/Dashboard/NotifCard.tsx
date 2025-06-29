import React, { useState } from 'react';
import axios from '../../api/axiosInstance'; // <-- Add this import
import './Notifcard.css';

type Notification = {
  id: string;
  sender: string;
  receiver: string[];
  message: string;
  isRead: boolean;
  created_at: string;
  subject: string;
  sender_name: string; 
};

interface NotifCardProps {
  notification: Notification;
}

const NotifCard: React.FC<NotifCardProps> = ({ notification }) => {
  const [showModal, setShowModal] = useState(false);
  const [isRead, setIsRead] = useState(notification.isRead);

  const handleCardClick = () => {
    // Optionally open modal on card click
  };

  const handleViewClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);

    if (!isRead) {
      setIsRead(true); // Optimistic update

      // Call backend to mark as read
      try {
        await axios.patch(`/api/notifications/read/${notification.id}`);
      } catch (err) {
        // Optionally revert UI on error
        setIsRead(false);
        // Optionally show a toast/error message
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Format date and time separately
  const dateObj = new Date(notification.created_at);
  const formattedDate = dateObj.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = dateObj.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <>
      <div
        className={`notif-card-container${isRead ? ' read' : ' unread'}`}
        onClick={handleCardClick}
      >
        <div className="notif-card-header">
          <div className="notif-card-header-left">
            <i className="bi bi-bell" />
            <span
              className="notif-card-title gothic-a1-bold"
              style={{
                fontWeight: isRead ? 'normal' : 'bold'
              }}
            >
              {notification.subject}
            </span>
            {!isRead && <span className="notif-card-unread-dot" />}
          </div>
          <div className="notif-card-header-date gothic-a1-regular">
            {formattedDate} &middot; {formattedTime}
          </div>
        </div>
        <p
          className="notif-card-text"
          style={{
            fontWeight: isRead ? 'normal' : 'bold'
          }}
        >
          {notification.message}
        </p>
        <button
          className="notif-card-link gothic-a1-bold"
          onClick={handleViewClick}
        >
          View
        </button>
      </div>
      {showModal && (
        <div className="notif-modal-overlay" onClick={handleCloseModal}>
          <div
            className="notif-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <div className="notif-modal-header">
              <span className="notif-modal-title">{notification.subject}</span>
              <button className="notif-modal-close" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="notif-modal-body">
              <p>
                <strong>Date:</strong> {formattedDate}
              </p>
              <p>
                <strong>Time:</strong> {formattedTime}
              </p>
              <p>
                <strong>From:</strong> {notification.sender_name}
              </p>
              <p>
                <strong>Message:</strong>
              </p>
              <p>{notification.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotifCard;