import { useState } from 'react';
import ApplicationForm from "../components/Dashboard/ApplicationForm"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../api/axiosInstance';

type PolicyNumberFormProps = {
  policyNumber: string;
  setPolicyNumber: (value: string) => void;
  onSubmit: (policyNumber: string) => void;
};

const PolicyNumberForm = ({ policyNumber, setPolicyNumber, onSubmit }: PolicyNumberFormProps) => {
  const [localPolicyNumber, setLocalPolicyNumber] = useState(policyNumber);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (localPolicyNumber.trim()) {
      console.log('Policy Number submitted:', localPolicyNumber);
      setPolicyNumber(localPolicyNumber);
      onSubmit(localPolicyNumber); // Call the parent's submit handler
    } else {
      alert('Please enter a policy number');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPolicyNumber(e.target.value);
  };

  return (
    <div className="container-fluid mb-4">
      <div className="row justify-content-center" >
        <div className="col-12 col-md-10 col-lg-8" >
          <div className="card shadow rounded-3" style={{width: '1200px', maxWidth: '970px', }}>
            <div className="card-body p-1">
              <div className="mb-1" >
                <p className="text-muted mb-2 gothic-a1-normal" style={{fontSize: '16px', paddingTop: '20px', paddingLeft: '20px'}}>
                  Enter MHSTEMPC Policy Number to auto-fill personal information.
                </p>
              </div>
              
              <div style={{padding:'15px'}}>
                <div className="mb-3">
                  <label htmlFor="policyNumber" className="form-label gothic-a1-bold" style={{fontSize: '17px'}}>
                    MHSTEMPC Policy Number
                  </label>
                  <div className="row g-2">
                    <div className="col-12 col-sm-10">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="policyNumber"
                        value={localPolicyNumber}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSubmit(e);
                          }
                        }}
                        style={{
                          borderRadius: '8px',
                          border: '2px solid #e9ecef',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-2">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg w-100 fw-semibold"
                        onClick={handleSubmit}
                        style={{
                          backgroundColor: '#002d62',
                          borderRadius: '10px',
                          width: '20px'
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
    const [data , setData] = useState<{
        first_name?: string;
        middle_name?: string;
        last_name?: string;
        present_address?: string;
        tel_cel_no?: string;
        policy_number?: string;
        membership_date?: string;
    }>({});

    const handlePolicyNumberSubmit = async (policy_no: string) => {
        try {
          const response = await axios.get(`/api/user/${policy_no}`);
          if (response.data) {
            setData(response.data);
            console.log('Fetched data:', response.data);
          } else {
            console.error('No data found for the given policy number');
          }
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
    };

    return(
        <div style={{
            marginLeft: '130px',
            paddingTop: "45px",
            paddingLeft: '10px',
            paddingRight: '20px',
            maxWidth: 'calc(100vw - 240px)',
            boxSizing: 'border-box'
        }}>
            <h3 style={{
            margin: '10px',
            width: "100%",
            paddingLeft: '80px',
            paddingBottom: '20px'
            }}>Loan Application</h3>

            <div className="">
                <PolicyNumberForm 
                    policyNumber={policyNumber}
                    setPolicyNumber={setPolicyNumber}
                    onSubmit={handlePolicyNumberSubmit}
                />
            </div>
            <ApplicationForm user={data} />
        </div>
    );  
}

export default LoanApplicationFormScreen