import React, { useState, useEffect } from 'react';
import '../../../src/styles/custom-bootsrap.scss';
import logo from '../../../src/assets/Images/mhstempc_logo.png';
import InputField from './InputField';
import PasswordField from './PasswordField';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import { AxiosError } from 'axios';
import './LoginCard.css';

const LOCKOUT_KEY = 'lockoutExpiresAt';

const LoginCard: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number | null>(null);

  // On mount, restore any lockout expiry
  useEffect(() => {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    if (raw) {
      const expiry = parseInt(raw, 10);
      const msLeft = expiry - Date.now();
      if (msLeft > 0) {
        setLockoutSeconds(Math.ceil(msLeft / 1000));
      } else {
        localStorage.removeItem(LOCKOUT_KEY);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (lockoutSeconds == null) return;

    if (lockoutSeconds <= 0) {
      localStorage.removeItem(LOCKOUT_KEY);
      setLockoutSeconds(null);
      setErrors({});
      return;
    }

    const timer = setTimeout(() => {
      setLockoutSeconds(lockoutSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [lockoutSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleLogin = async () => {
    // client-side validation
    const validationErrors: typeof errors = {};
    if (!email) validationErrors.email = 'Email is required';
    else if (!validateEmail(email)) validationErrors.email = 'Enter a valid email';
    if (!password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      const { jwtToken } = data;

      // decode and store token
      type JwtPayload = {
        user?: {
          isAdmin?: boolean;
          [key: string]: unknown;
        };
        [key: string]: unknown;
      };
      let payload: JwtPayload;
      try {
        payload = JSON.parse(atob(jwtToken.split('.')[1]));
      } catch {
        setErrors({ general: 'Invalid token received.' });
        return;
      }
      const isAdmin = payload.user?.isAdmin ?? false;
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('role', isAdmin ? 'admin' : 'user');

      // clear any lockout
      localStorage.removeItem(LOCKOUT_KEY);
      setLockoutSeconds(null);

      navigate('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const { status, headers } = err.response;

        if (status === 429) {
          // read Retry-After header
          const ra = parseInt(headers['retry-after'] as string, 10) || 5 * 60;
          const expiresAt = Date.now() + ra * 1000;
          localStorage.setItem(LOCKOUT_KEY, expiresAt.toString());
          setLockoutSeconds(ra);
          setErrors({ general: `Too many attempts. Try again in ${formatTime(ra)}.` });
        } else if (status === 401) {
          setErrors({ general: 'Invalid email or password' });
        } else if (status === 403) {
          setErrors({ general: 'Access denied. Please contact administrator.' });
        } else {
          setErrors({ general: 'Server error. Please try again later.' });
        }
      } else {
        setErrors({ general: 'Network error. Please check your connection.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="login-card-wrapper">
    <div
      className="row border rounded-3 p-3 bg-white shadow login-box-area"
      style={{ maxWidth: 800, height: 570, margin: '0 auto' }}
    >
      {/* Left Column */}
      <div
        className="col-lg-6 col-12 rounded-3 d-flex justify-content-center align-items-center flex-column left-box"
        style={{ background: '#f7f7f7', padding: '25px 10px' }}
      >
        <img src={logo} alt="MHSTEMPC Logo" className="img-fluid mb-4" style={{ maxWidth: 250 }} />
        <small className="fs-responsive-company d-block alegreya-sans-regular" style={{textAlign: 'center'}}>
          MARIKINA HIGH SCHOOL TEACHERS EMPLOYEE
        </small>
        <p className="fs-responsive-title fw-bold mb-0 alegreya-sans-bold">MHSTEMPC</p>
        <small className="fs-responsive-company d-block alegreya-sans-regular">
          MULTI-PURPOSE COOPERATIVE
        </small>
      </div>

      {/* Right Column */}
      <div className="col-md-6 col-12 right-box" style={{ paddingTop: '80px' }}>
        {errors.general && (
          <div className="alert alert-danger login-error-alert mb-3">
            {errors.general}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="login-form-field mb-3">
            <small className="LogInText gothic-a1-bold" style={{textAlign: 'left', fontSize: '25px', paddingBottom: '10px'}}>
              Log in to your account
            </small>
            <InputField
              value={email}
              onChange={setEmail}
              error={errors.email}
              placeholder="Email"
            />
          </div>

          <div className="login-form-field mb-4">
            <PasswordField
              value={password}
              onChange={setPassword}
              error={errors.password}
              placeholder="Password"
            />
          </div>

          <CustomButton
            label={
              lockoutSeconds != null
                ? `Try again in ${formatTime(lockoutSeconds)}`
                : isLoading
                ? 'Logging in...'
                : 'Log in'
            }
            type="submit"
            disabled={isLoading || lockoutSeconds != null}
          />
        </form>
      </div>
    </div>
  </div>
);

};

export default LoginCard;
