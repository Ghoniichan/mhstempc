import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard";
import '../screens/PasswordReset.css';
import { useNavigate } from "react-router-dom";

import CustomButton from "../components/Dashboard/CustomButton";

const PasswordReset = () => { 
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/login');
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: "100%",
            width: "100vw",
            height: "35vh",
            padding: "30px 0",
            boxSizing: "border-box",
            marginTop: "200px"
        }}>
                <ColumnLayoutCard 
                    title="Password Reset!"
                    description="Your password has been successfully reset. Click below to continue."
                    titleStyle={{ fontSize: '23px', textAlign: 'center', paddingTop: '20px' }}
                    descriptionStyle={{ fontSize: '15px', color: '#1e1e1e', textAlign: 'center', margin: '10px' }}
                >
                    <CustomButton label="Back to Login" onClick={handleBackToLogin} />
                </ColumnLayoutCard>
                
        </div>
    );
};

export default PasswordReset;
