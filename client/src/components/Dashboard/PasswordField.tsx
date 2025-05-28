type PasswordFieldProps = {
  value: string;
  onChange: (val: string) => void;
  error?: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, error }) => {
  return (
    <div className="MainContainer mb-1">
      <div className="subCont">
        <label htmlFor="password" className="TextLabel form-label text-start gothic-a1-semibold mb-0">
          Password
        </label>
        <div className="input position-relative">
          <input
            type="password"
            id="password"
            className={`inputBox form-control ps-5 ${error ? 'is-invalid' : ''}`}
            placeholder="Password"
            style={{ border: '1px solid #002d62' }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <i className="icon bi bi-lock-fill position-absolute"></i>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-1">
          {error ? (
            <div className="text-danger" style={{ fontSize: '0.875rem' }}>
              {error}
            </div>
          ) : (
            <div></div>
          )}
          <a href="/forgot-password" className="password gothic-a1-bold" 
            style={{fontSize: '13px', color: '#002d62'}}>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
