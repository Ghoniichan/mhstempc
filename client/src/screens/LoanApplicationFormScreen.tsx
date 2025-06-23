/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import ApplicationForm from "../components/Dashboard/ApplicationForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../api/axiosInstance';

type PolicyNumberFormProps = {
  policyNumber: string;
  setPolicyNumber: (value: string) => void;
  onSubmit: (policyNumber: string) => void;
};

const PolicyNumberForm: React.FC<PolicyNumberFormProps> = ({
  policyNumber,
  setPolicyNumber,
  onSubmit,
}) => {
  const [localPolicyNumber, setLocalPolicyNumber] = useState(policyNumber);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (localPolicyNumber.trim()) {
      setPolicyNumber(localPolicyNumber);
      onSubmit(localPolicyNumber);
    } else {
      alert('Please enter a policy number');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPolicyNumber(e.target.value);
  };

  return (
    <div className="pnf-container container-fluid mb-4">
      <div className="pnf-row row justify-content-center">
        <div className="pnf-col col-12 col-md-10 col-lg-8">
          <div className="pnf-card card shadow rounded-3" style={{ width: '1200px', maxWidth: '970px' }}>
            <div className="pnf-body card-body p-1">
              <div className="pnf-instruction mb-1">
                <p
                  className="pnf-instruction-text text-muted mb-1 gothic-a1-regular"
                  style={{ fontSize: '16px', paddingTop: '20px', paddingLeft: '20px', textAlign: 'left' }}
                >
                  Enter MHSTEMPC Policy Number to auto-fill personal information.
                </p>
              </div>

              <div className="pnf-form-wrapper" style={{ padding: '15px', textAlign: 'left' }}>
                <div className="pnf-field mb-3">
                  <label
                    htmlFor="policyNumber"
                    className="pnf-label form-label gothic-a1-bold"
                    style={{ fontSize: '17px', textAlign: 'left' }}
                  >
                    MHSTEMPC Policy Number
                  </label>
                  <div className="pnf-input-row row g-2">
                    <div className="pnf-input-col col-12 col-sm-10">
                      <input
                        type="text"
                        id="policyNumber"
                        className="pnf-input form-control form-control-lg"
                        value={localPolicyNumber}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSubmit(e);
                        }}
                        style={{
                          borderRadius: '8px',
                          border: '1px solid #002d62',
                          fontSize: '1rem',
                        }}
                      />
                    </div>
                    <div className="pnf-button-col col-12 col-sm-2">
                      <button
                        type="button"
                        className="pnf-button btn btn-primary btn-lg w-100 gothic-a1-bold"
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: '#002d62',
                          borderRadius: '10px',
                          fontSize: '17px',
                        }}
                      >
                        Enter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoanApplicationFormScreen = () => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [data, setData] = useState<any>({});

  const handlePolicyNumberSubmit = async (policy_no: string) => {
    try {
      const response = await axios.get(`/api/user/${policy_no}`);
      if (response.data) {
        setData(response.data);
      } else {
        console.error('No data found for the given policy number');
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  return (
    <div
      className="lf-wrapper"
      style={{
        marginLeft: '130px',
        paddingTop: '45px',
        paddingLeft: '10px',
        paddingRight: '20px',
        maxWidth: 'calc(100vw - 240px)',
        boxSizing: 'border-box',
      }}
    >
      <h3
        className="lf-heading"
        style={{
          margin: '10px',
          width: '100%',
          paddingLeft: '80px',
          paddingBottom: '20px',
        }}
      >
        Loan Application
      </h3>

      <div className="lf-policy-section">
        <PolicyNumberForm
          policyNumber={policyNumber}
          setPolicyNumber={setPolicyNumber}
          onSubmit={handlePolicyNumberSubmit}
        />
      </div>

      <div className="lf-application-form">
        <ApplicationForm user={data} />
      </div>
    </div>
  );
};

export default LoanApplicationFormScreen;
