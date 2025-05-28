import { useState } from 'react';
import CustomButton from "../components/Dashboard/CustomButton";
import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard";
import '../screens/CreateNewPass.css';
import { useNavigate } from 'react-router-dom';

const CreateNewPass = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePasswords = () => {
    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    // Add more validation rules here if needed
    setError("");
    return true;
  };

  const handleReset = () => {
    if (validatePasswords()) {
      navigate('/password-reset');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: "100%",
        width: "100vw",
        height: "55vh",
        padding: "30px 0",
        boxSizing: "border-box",
        marginTop: "200px"
      }}
    >
      <ColumnLayoutCard
        title="Create new password"
        description="Your new password must be different from your previously used password."
        titleStyle={{ fontSize: '21px', paddingLeft: '15px' }}
        descriptionStyle={{
          fontSize: '15px',
          color: '#1e1e1e',
          textAlign: 'left',
          paddingLeft: '15px'
        }}
      >
        <div className='subCont'>
          <div className="input">
            <input
              type="password"
              id="password"
              className="inputBox form-control ps-5"
              placeholder="Enter New Password"
              style={{ border: '1px solid #002d62' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="icon bi bi-lock-fill position-absolute"></i>
          </div>

          <div className="input">
            <input
              type="password"
              id="confirmPassword"
              className="inputBox form-control ps-5"
              placeholder="Re-enter Password"
              style={{ border: '1px solid #002d62' }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i className="icon bi bi-lock-fill position-absolute"></i>
          </div>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "0px", textAlign: "center", paddingBottom: '15px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <CustomButton label="Reset Password" type="button" onClick={handleReset} />
      </ColumnLayoutCard>
    </div>
  );
};

export default CreateNewPass;
