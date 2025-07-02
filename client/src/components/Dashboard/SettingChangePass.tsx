import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomButton from "./CustomButton";
import axios from "../../api/axiosInstance";
import {getUserIdFromJwt} from "../../utils/tokenDecoder";

const SettingChangePass = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const userId = getUserIdFromJwt(localStorage.getItem('token') || '');

  const changePassword = async (current: string, newPass: string) => {

    try {
      const response = await axios.post('/api/auth/settings-change-pass', {
        currentPassword: current,
        newPassword: newPass,
        userId: userId
      });

      if (response.status === 200) {
        // Password changed successfully
        alert('Password changed successfully');
      } else {
        // Handle unexpected response
        setError('Unexpected response from server.');
      }
    } catch (err) {
      if (err) {
        // Handle Axios error
        setError('An error occurred while changing password.');
      } else {
        // Handle other errors
        setError('An unexpected error occurred.');
      }
    }
  }

  const handleChangedPassClick = () => {
    // Reset previous error
    setError('');

    // Validation: new and confirm must match
    if (newPass !== confirmPass) {
      setError('New password and confirmation do not match.');
      return;
    }

    // Optional: further validation (length, complexity)...

    if (newPass.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    changePassword(currentPass, newPass)
    // Clear fields
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className='small-setting-section'>
      <div
        className="d-flex flex-column mb-5 w-100 card shadow-sm mb-4 custom-card-setting"
        style={{ minWidth: 300, marginLeft: 'auto' }}
      >
        {/* Current Password */}
        <label htmlFor="currentPassword" className="form-label mb-4" style={{ color: '#002d62' }}>
          Enter Current Password
          <div className="position-relative">
            <input
              type={showCurrent ? "text" : "password"}
              className="form-control mt-2 pe-5"
              id="currentPassword"
              value={currentPass}
              onChange={e => setCurrentPass(e.target.value)}
              formNoValidate
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowCurrent(prev => !prev)}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>

        {/* New Password */}
        <label htmlFor="newPassword" className="form-label mb-4" style={{ color: '#002d62' }}>
          Enter New Password
          <div className="position-relative">
            <input
              type={showNew ? "text" : "password"}
              className="form-control mt-2 pe-5"
              id="newPassword"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              formNoValidate
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowNew(prev => !prev)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="form-label mb-2" style={{ color: '#002d62' }}>
          Confirm Your New Password
          <div className="position-relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="form-control mt-2 pe-5"
              id="confirmPassword"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              formNoValidate
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowConfirm(prev => !prev)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </label>
        {error && (
          <div className="text-danger mb-3 ms-2">{error}</div>
        )}

        <div className="mb-3 ps-2 pe-2">
          <CustomButton
            label="Confirm"
            onClick={handleChangedPassClick}
            className="flex-fill"
            disabled={!currentPass || !newPass || !confirmPass}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingChangePass;
