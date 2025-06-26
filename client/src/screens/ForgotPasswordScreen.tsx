import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/Dashboard/CustomButton";
import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard";
import '../screens/ForgotPass.css';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // ✅ Philippine number validation
  const isValidPhilippinePhoneNumber = (phone: string): boolean => {
    const regex = /^(09\d{9}|\+639\d{9})$/;
    return regex.test(phone);
  };

  // ✅ Handle form submission
  const handlePhoneVerif = () => {
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }
    if (!isValidPhilippinePhoneNumber(phoneNumber)) {
      setError("Please enter a valid Philippine phone number");
      return;
    }

    setError("");
    navigate("/emailVerif");
  };

  // ✅ Restrict input to only digits (and optional '+' at the start)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (input.startsWith("+")) {
      input = "+" + input.slice(1).replace(/\D/g, "");
    } else {
      input = input.replace(/\D/g, "");
    }

    setPhoneNumber(input);
    setError("");
  };

  // ✅ Submit form when Enter key is pressed
  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePhoneVerif();
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
        description="Enter your mobile number associated with your account."
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
              Phone
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={phoneNumber}
              onChange={handleInputChange}
              placeholder="+639123456789"
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
              onClick={handlePhoneVerif}
            />
          </div>
        </form>
      </ColumnLayoutCard>
    </div>
  );
};

export default ForgotPasswordScreen;
