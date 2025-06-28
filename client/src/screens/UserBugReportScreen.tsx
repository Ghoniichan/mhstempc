import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { getUserIdFromJwt } from '../utils/tokenDecoder';
import axios from '../api/axiosInstance';

const UserBugReportScreen = () => {
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = getUserIdFromJwt(localStorage.getItem('token') || '');

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await axios.post('/api/bugs/submit', {
        reporter_id: userId,
        subject,
        details
      });
      setFeedback({ type: 'success', message: 'Bug report submitted successfully!' });
      setSubject('');
      setDetails('');
      // Optionally, you can also clear feedback after some seconds:
      // setTimeout(() => setFeedback(null), 4000);
    } catch (error) {
      setFeedback({ type: 'error', message: 'Error submitting bug report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="mt-1"
      style={{
        marginLeft: '200px',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
      }}
    >
      <h1>Bug Reports</h1>
      <div
        className="card shadow-sm mt-3"
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          borderRadius: '12px',
        }}
      >
        <div className="card-body">
          <h5 className="card-title mb-3" style={{ fontWeight: 'bold', color: '#002b5c' }}>
            Report a Bug
          </h5>

          {feedback && (
            <Alert variant={feedback.type === 'success' ? 'success' : 'danger'} onClose={() => setFeedback(null)} dismissible>
              {feedback.message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Details"
                rows={5}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                disabled={isSubmitting}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="primary"
                type="submit"
                style={{
                  borderRadius: '999px',
                  padding: '0.375rem 1.25rem',
                  backgroundColor: '#002b5c',
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserBugReportScreen;