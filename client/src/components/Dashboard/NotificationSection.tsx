
import NotifCard from './NotifCard';
import AppointmentNotif from './AppointmentNotif';

const NotificationSection = () => {
  return (
    <div className="notif-wrapper">
      <NotifCard />
      <NotifCard />
      <NotifCard />
      <AppointmentNotif />
      <AppointmentNotif />
    </div>
  );
};

export default NotificationSection;
