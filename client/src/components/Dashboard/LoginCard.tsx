import '../../../src/styles/custom-bootsrap.scss';
import logo from '../../../src/assets/Images/mhstempc_logo.png';
import InputField from './InputField';
import PasswordField from './PasswordField';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
axios.defaults.baseURL = 'http://localhost:9000'

const LoginCard = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setErrors({});
    setIsLoading(true);
    
    console.log(`Email is ${email} and pass is ${password}`);
    try {
      const response = await axios.post('/auth/login', {
        email: email,
        password: password
      });
      
      const { jwtToken } = response.data;
      
      // Store the token (localStorage, sessionStorage, or state)
      localStorage.setItem('token', jwtToken);
      
      // Redirect or update UI
      console.log('Login successful!');
      navigate('/account');
      
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('Login error:', err.response?.data || err.message);
        
        // Show user-friendly error messages
        if (err.response?.status === 401) {
          setErrors({ general: 'Invalid email or password' });
        } else if (err.response?.status === 500) {
          setErrors({ general: 'Server error. Please try again later.' });
        } else {
          setErrors({ general: 'An error occurred. Please try again.' });
        }
      } else {
        setErrors({ general: 'Network error. Please check your connection.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='MainContainer'>
      <div className='row border rounded-3 p-3 bg-white shadow box-area' style={{ width: '850px', height: '600px', margin: '0 auto' }}>
        {/* Left box */}
        <div className='col-md-6 rounded-3 d-flex justify-content-center align-items-center flex-column left-box'
          style={{ background: '#f7f7f7', height: '100%', padding: '25px 10px' }}>
          <div>
            <img src={logo} alt='mhstempcLogo' className='img-fluid'
              width="400px"
              style={{
                marginBottom: '30px',
                paddingTop: '25px',
                maxWidth: '80%',
                alignItems: 'center',
                paddingLeft: '60px'
              }} />
          </div>
          <small className='fs-5 fw-normal alegreya-sans-regular'>MARIKINA HIGH SCHOOL TEACHERS EMPLOYEE</small>
          <p className='mb-0 fs-1 fw-bold alegreya-sans-bold'>MHSTEMPC</p>
          <small className='d-block mb-5 fs-5 fw-normal alegreya-sans-regular'>MULTI-PURPOSE COOPERATIVE</small>
        </div>

        {/* Right box */}
        <div className="col-md-6 right-box" style={{ paddingBottom: '50px' }}>
          <div className='align-items-center'>
            <div className="header">
              <p className="mb-0 fw-bold gothic-a1-bold" style={{ fontSize: '25px', paddingLeft: '10px' }}>Log In to your Account</p>
              <small className="d-block mb-5 fs-normal gothic-a1-regular" style={{ paddingLeft: '10px' }}>Welcome back!</small>
            </div>
          </div>
          <div className="px-3">
            {errors.general && (
              <div className="alert alert-danger" style={{ marginLeft: '13px', marginBottom: '16px' }}>
                {errors.general}
              </div>
            )}

            <div style={{ paddingLeft: '13px', marginBottom: '4px' }}>
              <InputField value={email} onChange={setEmail} error={errors.email} />
            </div>
            <div style={{ paddingLeft: '13px', marginBottom: '16px' }}>
              <PasswordField value={password} onChange={setPassword} error={errors.password} />
            </div>
            <div className="mb-2" style={{ paddingLeft: '13px' }}>
              <CustomButton 
                label={isLoading ? 'Logging in...' : 'Log in'} 
                type='button' 
                onClick={handleLogin}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
