import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileSection from '../components/Dashboard/ProfileSection';
import '../screens/Account.css';
import ButtonCustom from '../components/Dashboard/ButtonCustom';
import StatementOfAccount from '../components/Dashboard/StatementOfAccount';
import { getUserIdFromJwt } from '../utils/tokenDecoder';

const UserProfile = () => {
  const [showStatement, setShowStatement] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = payload.user;
      const fullName = `${user.lastName}, ${user.firstName}`;
      setUserName(fullName);
      setUserId(user.id || getUserIdFromJwt(token));
    } catch (err) {
      console.error('Failed to parse user token', err);
    }
  }, []);

  return (
    <Container fluid className="account-screen px-4 py-1">
      {/* Top right-aligned button */}
      <div className="d-flex justify-content-end mb-1" style={{ position: 'absolute', top: '30px', right: '100px'}}>
        <ButtonCustom
          text="Statement of Account"
          icon="bi bi-download"
          backgroundColor="#fff"
          textColor="#000"
          borderColor="#d9d9d9"
          height="45px"
          onClick={() => setShowStatement(true)}
        />
      </div>

      {/* Profile Details */}
      <ProfileSection />

      {/* Modal */}
      {showStatement && (
        <StatementOfAccount
          show={showStatement}
          onClose={() => setShowStatement(false)}
          user={{ name: userName, id: userId }}
          totals={{
            totalLoan: "₱5,000.00",
            totalPaid: "₱2,000.00",
            remainingBalance: "₱3,000.00"
          }}
          payments={[
            { date: "Jan 15, 2025", amount: "₱1,000.00" },
            { date: "Feb 15, 2025", amount: "₱1,000.00" },
          ]}
        />
      )}
    </Container>
  );
};

export default UserProfile;
