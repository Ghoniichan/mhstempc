import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileSection from '../components/Dashboard/ProfileSection';
import '../screens/Account.css';
import { getUserIdFromJwt } from '../utils/tokenDecoder';

const UserProfile = () => {
  const [, setUserName] = useState('');
  const [, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = payload.user;
      const fullName = `${user.lastName}, ${user.firstName}`;
      setUserName(fullName);

      // Safe fallback for ID
      const fallbackId = getUserIdFromJwt(token) ?? '';
      setUserId(user.id || fallbackId);
    } catch (err) {
      console.error('Failed to parse user token', err);
    }
  }, []);

  return (
    <Container fluid className="account-screen px-4 py-1">
      <ProfileSection />
    </Container>
  );
};

export default UserProfile;
