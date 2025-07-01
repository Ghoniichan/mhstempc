import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/Dashboard/CustomButton";
import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard";
import '../screens/ForgotPass.css';
import axios from "../api/axiosInstance";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // ✅ Email validation
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Handle form submission
  const handleEmailVerif = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    try {
      await axios.post("/api/auth/forgot-password", { email: email });
      
      navigate("/emailVerif", {state: { email } });
    } catch (error) {
      console.error("Error sending verification email:", error);
      setError("Failed to send verification email. Please try again later.");
      return;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  // ✅ Submit form when Enter key is pressed
  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEmailVerif();
    }
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
        description="Enter the email address associated with your account."
        titleStyle={{ fontSize: '20px', paddingLeft: '15px', paddingTop: '20px' }}
        descriptionStyle={{
          fontSize: '15px',
          color: '#1e1e1e',
          textAlign: 'left',
          paddingLeft: '15px',
        }}
      >
        <form onKeyDown={handleKeyPress}>
          <div style={{ padding: "0 5px 10px 5px" }}>
            <label
              className="phonelabel gothic-a1-bold"
              style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #002d62",
                borderRadius: "5px",
                height: "55px"
              }}
            />
            {error && (
              <div style={{ color: "red", marginTop: "5px", fontSize: "13px" }}>
                {error}
              </div>
            )}
          </div>

          <div className="left-align-button">
            <CustomButton
              label="Send code"
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
