import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/Dashboard/CustomButton";
import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard";
import InputField from "../components/Dashboard/InputField";
import '../screens/ForgotPass.css';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailVerif = () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    navigate("/emailVerif");
  };

  useEffect(() => {
        document.title = "MHSTEMPC | Forgot Password";
      }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '100%',
        width: '100vw',
        height: '48vh',
        padding: '30px 0',
        boxSizing: 'border-box',
        marginTop: '200px'
      }}
    >
      <ColumnLayoutCard
        title="Forgot Password"
        description="Enter your email address associated with your account."
        titleStyle={{ fontSize: '20px', paddingLeft: '15px' }}
        descriptionStyle={{
          fontSize: '15px',
          color: '#1e1e1e',
          textAlign: 'left',
          paddingLeft: '15px'
        }}
      >
        <form>
          <InputField
            value={email}
            onChange={(val: string) => {
              setEmail(val);
              setError(""); 
            }}
            error={error} 
          />
          <div className="left-align-button">
            <CustomButton
              label="Send email"
              type="button"
              onClick={handleEmailVerif}
            />
          </div>
        </form>
      </ColumnLayoutCard>
    </div>
  );
};

export default ForgotPasswordScreen;
