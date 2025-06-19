import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';
import axios from '../api/axiosInstance';

const UserAppointmentScreen = () => {
  const [time, setTime] = useState('10:00');
  const [date, setDate] = useState('2025-03-22');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      //get account_id
      const accountId = token ? JSON.parse(atob(token.split('.')[1])).user.id : null;
      if (!accountId) {
        throw new Error('No account ID found in token.');
      }
      
      const appointmentPayload = {
        // Single sender UUID
        sender: accountId,
        // Table columns mapping
        appointment_date: date,
        appointment_time: time,
        message: subject
      };

      const response = await axios.post('/api/notifications/book-appointment', appointmentPayload);
      if (response.status !== 201) {
        throw new Error('Failed to book appointment.');
      }

      alert('Appointment booked successfully!');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-1" style={{ marginLeft: '200px', padding: '2rem 1rem' }}>
      <h3 className='mb-4'>Schedule Appointment</h3>
      <div className="card shadow-sm mt-3" style={{ maxWidth: '500px', margin: '0 auto', borderRadius: '12px' }}>
        <div className="card-body" style={{ padding: '2rem' }}>
          <h4 className="card-title mb-3">Schedule Appointment</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control 
                type="text" 
                value="Admin" 
                style={{height: '45px'}}
                readOnly />
            </Form.Group>

            <div className="d-flex mb-3 gap-2">
              <InputGroup>
                <InputGroup.Text><FaClock /></InputGroup.Text>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  style={{height: '45px'}}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </InputGroup>
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Message"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
              />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button
              variant="primary"
              type="submit"
              className="w-100 gothic-a1-bold"
              style={{ borderRadius: '999px', backgroundColor: '#002b5c', height: '45px' }}
              disabled={loading}
            >
              {loading ? 'Processing…' : 'Book Appointment'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentScreen;
