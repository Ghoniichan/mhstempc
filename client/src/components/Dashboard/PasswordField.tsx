import { useState } from "react";
import './PasswordField.css'

export interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, error, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="MainContainer mb-1">
      <div className="subCont">
        <label htmlFor="password" className="TextLabel form-label text-start gothic-a1-semibold mb-0">
          Password
        </label>
        <div className="input position-relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={`inputBox form-control ps-5 pe-5 ${error ? 'is-invalid' : ''}`}
            placeholder={placeholder || "Password"}
            style={{ border: '1px solid #002d62', height: '55px', maxWidth: '100%' }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

          {/* Lock Icon - Left */}
          <i className="icon bi bi-lock-fill position-absolute"
            style={{
              left: '15px',
              top: '40%',
              transform: 'translateY(-50%)',
              fontSize: '1rem',
              color: '#000000'}}></i>
          <i className={`iconToggle bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
            onClick={() => setShowPassword(!showPassword)}></i>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-1">
          {error ? (
            <div className="text-danger" style={{ fontSize: '0.875rem' }}>
              {error}
            </div>
          ) : (
            <div></div>
          )}
          <a
            href="/forgot-password"
            className="password gothic-a1-bold"
            style={{ fontSize: '13px', color: '#002d62' }}
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
