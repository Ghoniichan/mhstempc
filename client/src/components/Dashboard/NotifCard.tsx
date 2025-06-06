import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Notifcard.css';

const NotifCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/appointmentRequest'); 
  };

  return (
    <Card className='container notif-card' onClick={handleCardClick}>
      <Card.Body>
        {/* Title */}
        <Card.Title className='header gothic-a1-bold'>
          <i className="bi bi-bell"></i> Account Changes
        </Card.Title>

        {/* Date below title */}
        <Card.Subtitle className="date text-muted gothic-a1-regular mb-2">
          July 15
        </Card.Subtitle>

        {/* Message */}
        <Card.Text>
          Carlos changed his phone number
        </Card.Text>

        {/* Action Link */}
        <Card.Link onClick={(e) => e.preventDefault()}>View</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default NotifCard;
