import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomButton from "./CustomButton";

const SettingChangePass = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChangedPassClick = () => {
    alert(`Password changed successfully!`);
  };

    return (
        <div className='small-setting-section'>
            {/* Change Password Section */}
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
                <label htmlFor="confirmPassword" className="form-label mb-4" style={{ color: '#002d62' }}>
                    Confirm Your New Password
                    <div className="position-relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            className="form-control mt-2 pe-5"
                            id="confirmPassword"
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
                <div className="mb-3">
                    <CustomButton label="Confirm" onClick={handleChangedPassClick} className="flex-fill" />
                </div>
            </div>
        </div>
    );
};

export default SettingChangePass;
