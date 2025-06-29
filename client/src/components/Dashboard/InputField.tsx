import './InputField.css'

export interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, error, placeholder }) => {
  return (
    <div className="MainContainer mb-1">
      <div className='subCont'>
        <label htmlFor="email" className="TextLabel form-label text-start gothic-a1-semibold mb-0">Email</label>
        <div className="input position-relative">
          <input
            type="email"
            id="email"
            className={`inputBox form-control ps-5 ${error ? 'is-invalid' : ''}`}
            placeholder={placeholder || "Email"}
            style={{ border: '1px solid #002d62', height: '55px', maxWidth: '100%'}}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <i className="icon bi bi-envelope position-absolute" style={{top: '50%'}}></i>
        </div>
        {error && <div className="text-danger mt-1" style={{ fontSize: '14px', paddingTop: '0px' }}>{error}</div>}
      </div>
    </div>
  );
};

export default InputField;
