type InputFieldProps = {
  value: string;
  onChange: (val: string) => void;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({ value, onChange, error }) => {
  return (
    <div className="MainContainer mb-1">
      <div className='subCont'>
        <label htmlFor="email" className="TextLabel form-label text-start gothic-a1-semibold mb-0">Email</label>
        <div className="input position-relative">
          <input
            type="email"
            id="email"
            className={`inputBox form-control ps-5 ${error ? 'is-invalid' : ''}`}
            placeholder="Email"
            style={{ border: '1px solid #002d62' }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <i className="icon bi bi-envelope position-absolute"></i>
        </div>
        {error && <div className="text-danger mt-1" style={{ fontSize: '14px', paddingTop: '0px' }}>{error}</div>}
      </div>
    </div>
  );
};

export default InputField;
