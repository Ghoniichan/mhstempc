import { Card } from 'react-bootstrap';
import './Notifcard.css'

const NotifCard = () => {
  return (
    <Card className='container'>
      <Card.Body>
        {/* Title and Date in a Flex Container */}
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className='header gothic-a1-bold'>
            <i className="bi bi-bell"></i> Account Changes
          </Card.Title>
          <Card.Subtitle className="date text-muted gothic-a1-regular">July 15</Card.Subtitle>
        </div>

        {/* Message */}
        <Card.Text className=''>Carlos changed his phone number</Card.Text>

        {/* Action Link */}
        <Card.Link href="#">View</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default NotifCard;
