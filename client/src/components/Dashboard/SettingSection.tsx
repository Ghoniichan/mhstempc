import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingChangePass from './SettingChangePass';
import SettingChangeNumber from './SettingChangeNumber';
import './SettingSection.css';

interface SettingSectionProps {
  role: 'Admin' | 'User';
}

const SettingSection: React.FC<SettingSectionProps> = ({ role }) => {
  const [showSettingsChangePass, setShowSettingsChangePass] = useState(false);
  const [showSettingsChangeNumber, setShowSettingsChangeNumber] = useState(false);

  const navigate = useNavigate();

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSettingsChangePass(prev => !prev);
    setShowSettingsChangeNumber(false);
  };

  const handleChangeNumberClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSettingsChangeNumber(prev => !prev);
    setShowSettingsChangePass(false);
  };

  const handleClosePanel = () => {
    setShowSettingsChangePass(false);
    setShowSettingsChangeNumber(false);
  };

  const handleAuditLogClick = () => {
    handleClosePanel();
    navigate('/auditLog');
  };

  const handleAboutUsClick = () => {
    handleClosePanel();
    navigate('/aboutSetting');
  };

  return (
    <>
      <div className='small-setting-section'>
        <h6 className="custom-header">Account</h6>
        <div className="card shadow-sm mb-4 custom-card-setting">
          <button type="button" className="btn text-nowrap text-start">
            <h6>Update Profile</h6>
            <p className="mb-0">Update your personal info</p>
          </button>

          <button onClick={handleChangeNumberClick} type="button" className="btn text-nowrap text-start">
            <h6>Update Mobile Number</h6>
            <p className="mb-0">Used for OTP</p>
          </button>

          <button onClick={handleSettingsClick} type="button" className="btn text-nowrap text-start">
            <h6>Change Password</h6>
            <p className="mb-0">Secure your account</p>
          </button>
        </div>

        {role === 'Admin' && (
          <>
            <h6 className="custom-header">Security</h6>
            <div className="card shadow-sm mb-4 custom-card-setting">
              <button onClick={handleAuditLogClick} type="button" className="btn text-nowrap text-start">
                <h6>Audit Logs</h6>
                <p className="mb-0">Check your security</p>
              </button>
            </div>
          </>
        )}

        {role === 'User' && (
          <>
            <h6 className="custom-header">Security</h6>
            <div className="card shadow-sm mb-4 custom-card-setting">
              <button onClick={handleAuditLogClick} type="button" className="btn text-nowrap text-start">
                <h6>Report a Bug</h6>
                <p className="mb-0">Report site issues encountered</p>
              </button>
            </div>
          </>
        )}

        <h6 className="custom-header">About</h6>
        <div className="card shadow-sm custom-card-setting">
          <button onClick={handleAboutUsClick} type="button" className="btn text-nowrap text-start">
            <h6 className="mb-0">About MHSTEMPC</h6>
          </button>
        </div>
      </div>

      {showSettingsChangePass && (
        <div className="settings-panel">
          <div className="settings-header d-flex justify-content-between align-items-center p-2 border-bottom">
            <h5 className="ms-3 mt-3 h5-setting">Change Password</h5>
            <button className="btn-close" onClick={handleClosePanel}></button>
          </div>
          <div className="p-3">
            <SettingChangePass />
          </div>
        </div>
      )}

      {showSettingsChangeNumber && (
        <div className="settings-panel">
          <div className="settings-header d-flex justify-content-between align-items-center p-2 border-bottom">
            <h5 className="ms-3 mt-3 h5-setting">Update Mobile Number</h5>
            <button className="btn-close" onClick={handleClosePanel}></button>
          </div>
          <div className="p-3">
            <SettingChangeNumber />
          </div>
        </div>
      )}
    </>
  );
};

export default SettingSection;
