import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

const UserAppointmentScreen = () => {
  const [time, setTime] = useState('10:00 am');
  const [date, setDate] = useState('2025-03-22');
  const [subject, setSubject] = useState('');

  return (
    <div
      className="mt-1"
      style={{
        marginLeft: '200px',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
    <h1>Schedule Appointment</h1>
      <div
        className="card shadow-sm mt-3"
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          borderRadius: '12px',
        }}
      >
        <div className="card-body">
          <h5 className="card-title mb-3">Schedule Appointment</h5>

          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" value="Admin" readOnly />
            </Form.Group>

            <div className="d-flex mb-3 gap-2">
              <InputGroup>
                <InputGroup.Text>
                  <FaClock />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <InputGroup.Text>
                  <FaCalendarAlt />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </InputGroup>
            </div>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                borderRadius: '999px',
                backgroundColor: '#002b5c', 
              }}
            >
              Book Appointment
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentScreen;
