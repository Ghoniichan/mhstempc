import { useState } from 'react';
import ApplicationForm from "../components/Dashboard/ApplicationForm"
import 'bootstrap/dist/css/bootstrap.min.css';

const PolicyNumberForm = () => {
  const [policyNumber, setPolicyNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (policyNumber.trim()) {
      console.log('Policy Number submitted:', policyNumber);
      // Add your auto-fill logic here
      alert(`Policy Number ${policyNumber} submitted for auto-fill`);
    } else {
      alert('Please enter a policy number');
    }
  };

  const handleInputChange = (e) => {
    setPolicyNumber(e.target.value);
  };

  return (
    <div className="container-fluid mb-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow rounded-3" style={{width: '1200px', maxWidth: '970px'}}>
            <div className="card-body p-1">
              <div className="mb-3">
                <p className="text-muted mb-2 gothic-a1-normal" style={{fontSize: '16px'}}>
                  Enter MHSTEMPC Policy Number to auto-fill personal information.
                </p>
              </div>
              
              <div>
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
                        placeholder="123456789"
                        value={policyNumber}
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
            paddingLeft: '80px'
            }}>Loan Application</h3>


            <PolicyNumberForm />
            <ApplicationForm/>
        </div>
    )
}

export default LoanApplicationFormScreen