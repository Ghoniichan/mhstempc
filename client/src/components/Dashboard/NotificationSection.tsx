import { useEffect, useState } from "react";
import NotifCard from "./NotifCard";
import axios from "../../api/axiosInstance";
import { getUserIdFromJwt } from '../../utils/tokenDecoder';

type Notification = {
  id: string;
  sender: string;
  receiver: string[];
  message: string;
  isRead: boolean;
  created_at: string;
  subject: string;
};

const NotificationSection = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const userId = getUserIdFromJwt(token);

    if (!userId) {
      console.error("User ID not found in JWT token");
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="notif-wrapper">
      {notifications.length === 0 ? (
        <div>No notifications found.</div>
      ) : (
        notifications.map((notif) => (
          <NotifCard key={notif.id} notification={notif} />
        ))
      )}
    </div>
  );
};

export default NotificationSection;