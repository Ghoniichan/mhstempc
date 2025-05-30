import React, { useState } from 'react';
import SettingChangePass from './SettingChangePass';
import './SettingSection.css';


const SettingSection = () => {

    const [showSettingsChangePass, setShowSettingsChangePass] = useState(false);
      // const location = useLocation();
    
      const handleSettingsClick = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent default navigation
        setShowSettingsChangePass((prev) => !prev); // toggle panel
      };
    
      const handleClosePanel = () => {
        setShowSettingsChangePass(false);
      };

    return (
        <>
        <div className='small-setting-section'>
            {/* <h5 className="custom-header">Settings</h5> */}
            {/* <hr /> */}
            
            <h6 className="custom-header">Account</h6>
            <div className="card shadow-sm mb-4 custom-card-setting">
                <button type="button" className="btn text-nowrap text-start">
                    <h6>Update Profile</h6>
                    <p className="mb-0">Update your personal info</p>
                </button>

                <button type="button" className="btn text-nowrap text-start">
                    <h6>Update Mobile Number</h6>
                    <p className="mb-0">Used for OTP</p>
                </button>

                <button onClick={handleSettingsClick} type="button" className="btn text-nowrap text-start">
                    <h6>Change Password</h6>
                    <p className="mb-0">Secure your account</p>
                </button>
            </div>

            <h6 className="custom-header">Security</h6>
            <div className="card shadow-sm mb-4 custom-card-setting">
                <button type="button" className="btn text-nowrap text-start">
                    <h6>Audit Logs</h6>
                    <p className="mb-0">Check your security</p>
                </button>
            </div>

            <h6 className="custom-header">About</h6>
            <div className="card shadow-sm custom-card-setting">
                <button type="button" className="btn text-nowrap text-start">
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
            </div>)}
        </>

        
    );
};

export default SettingSection;
