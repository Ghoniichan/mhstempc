import { Container } from 'react-bootstrap';
import ProfileSection from '../components/Dashboard/ProfileSection';
import '../screens/Account.css';

const AccountScreen = () => {
    return (
        <Container fluid className="account-screen px-4 py-4">
            <ProfileSection />
        </Container>
    );
};

export default AccountScreen;
