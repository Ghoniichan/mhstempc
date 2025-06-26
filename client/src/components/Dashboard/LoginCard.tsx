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
import log from '../../api/log';
import { getUserIdFromJwt } from '../../utils/tokenDecoder';

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

      log(getUserIdFromJwt(jwtToken) || '', 'logged in', 'User logged in');

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
          log(getUserIdFromJwt(localStorage.getItem('token') || '') || '', 'login failed', 'Too many attempts, lockout started');
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
    <div className="login-card-wrapper container-fluid px-2 px-md-0">
      <div
        className="row border rounded-3 p-2 p-md-3 bg-white shadow login-box-area mx-auto"
        style={{
          maxWidth: 800,
          minHeight: 500,
          height: '100%',
          margin: '0 auto',
        }}
      >
        {/* Left Column */}
        <div
          className="col-12 col-md-6 rounded-3 d-flex justify-content-center align-items-center flex-column left-box mb-4 mb-md-0"
          style={{
            background: '#f7f7f7',
            padding: '25px 10px',
            minHeight: 200,
          }}
        >
          <img
            src={logo}
            alt="MHSTEMPC Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: 200, width: '80%' }}
          />
          <small
            className="fs-responsive-company d-block alegreya-sans-regular text-center"
            style={{ whiteSpace: 'nowrap', fontSize: '19px' }}
          >
            MARIKINA HIGH SCHOOL TEACHERS EMPLOYEE
          </small>
          <p className="fs-responsive-title fw-bold mb-0 alegreya-sans-bold text-center" style={{fontSize: '35px'}}>
            MHSTEMPC
          </p>
          <small className="fs-responsive-company d-block alegreya-sans-regular text-center" style={{fontSize: '19px'}}>
            MULTI-PURPOSE COOPERATIVE
          </small>
        </div>

        {/* Right Column */}
        <div
          className="col-12 col-md-6 right-box d-flex flex-column justify-content-center"
          style={{ paddingTop: '30px', minHeight: 200 }}
        >
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
            className="w-100"
          >
            <div className="login-form-field mb-3">
              <small
                className="LogInText gothic-a1-bold"
                style={{
                  textAlign: 'left',
                  fontSize: '22px',
                  paddingBottom: '10px',
                  display: 'block',
                }}
              >
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

            <div className="login-form-field mb-3 d-flex flex-column">
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
            </div>
          </form>
        </div>
      </div>
      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 767.98px) {
            .login-box-area {
              flex-direction: column !important;
              min-height: unset !important;
              height: auto !important;
            }
            .left-box, .right-box {
              min-height: 180px !important;
              padding-top: 20px !important;
              padding-bottom: 20px !important;
            }
            .login-card-wrapper {
              padding: 0 !important;
            }
          }
          @media (max-width: 575.98px) {
            .login-box-area {
              padding: 0.5rem !important;
            }
            .left-box img {
              max-width: 150px !important;
            }
            .LogInText {
              font-size: 18px !important;
            }
          }
        `}
      </style>
    </div>
  );

};

export default LoginCard;
