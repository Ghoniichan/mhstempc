import { Card } from 'react-bootstrap';
import './AppointmentNotif.css';
import { useNavigate } from 'react-router-dom';

const AppointmentNotifCard = () => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/appointmentRequest'); 
  };

  return (
    <Card className='container' onClick={handleCardClick}>
      <Card.Body>
        {/* Title */}
        <Card.Title className='header gothic-a1-bold' >
          <i className="bi bi-bell"></i> Appointment Request
        </Card.Title>

        {/* Date below title */}
        <Card.Subtitle className="date text-muted gothic-a1-regular mb-2">
          July 15
        </Card.Subtitle>

        {/* Message */}
        <Card.Text>
          Carlos requrests an appointment for consultation.
        </Card.Text>

        {/* Action Link */}
        <Card.Link onClick={(e) => e.preventDefault()}>View</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default AppointmentNotifCard;
