import CustomButton from "../components/Dashboard/CustomButton";
import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard";
import '../screens/ForgotPass.css';
import { useNavigate } from "react-router-dom";
import InputField from "../components/Dashboard/InputField";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate(); 

  const handleEmailVerif = () => {
    navigate('/emailVerif'); 
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '45vh',
      padding: '30px 0'}}>
      <ColumnLayoutCard
        title="Forgot Password"
        description="Enter your email address associated with your account."
        titleStyle={{fontSize: '20px', paddingLeft: '15px'}}
        descriptionStyle={{fontSize: '15px',
                            color: '#1e1e1e',
                            textAlign: 'left',
                            paddingLeft: '15px'
                           
        }}>
        <form>
          <InputField />
          <div className="left-align-button">
            <CustomButton label="Send email" type="button" onClick={handleEmailVerif} />
          </div>
          
        </form>
      
      </ColumnLayoutCard>
    </div>
  );
};

export default ForgotPasswordScreen;
