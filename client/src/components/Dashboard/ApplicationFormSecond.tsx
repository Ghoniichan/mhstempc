import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ApplicationFormSecond.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import calculateComputations from '../../utils/computations';
import log from '../../api/log';
import { getUserIdFromJwt } from '../../utils/tokenDecoder';

interface ApplicationFormSecondProps {
  onCancel: () => void;
}

interface FormData {
  termsAccepted: boolean;
  signedDate: string; // Fixed: was "signedData"
  computations: {
    loanAmount: string;
    interest: string;
    paidUpCapital: string;
    serviceFee: string;
    savings: string;
    netLoanProceeds: string; // Fixed: was "netLoansProceeds"
  };
  submissionTimestamp: string;
}

const ApplicationFormSecond: React.FC<ApplicationFormSecondProps> = ({ onCancel }) => {
  const navigate = useNavigate();

  // Get cleanedData passed from ApplicationForm (via location state)
  const location = useLocation();
  const cleanedData = location.state?.formData || {};

  const [formData, setFormData] = useState<FormData>({
    termsAccepted: false,
    signedDate: '',
    computations: {
      loanAmount: cleanedData.loanInfo?.amount || '',
      interest: '',
      paidUpCapital: '',
      serviceFee: '',
      savings: '',
      netLoanProceeds: '',
    },
    submissionTimestamp: ''
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      termsAccepted: e.target.checked
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      signedDate: e.target.value
    }));
  };

  const handleComputationChange = (field: keyof FormData['computations']) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        computations: {
          ...prev.computations,
          [field]: e.target.value
        }
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions before submitting.');
      return;
    }
    
    if (!formData.signedDate) {
      alert('Please select a signing date.');
      return;
    }

    try {
        console.log(cleanedData)
        const response = await axios.post('/api/loans/new', cleanedData);
        if (response.status === 201) {
          console.log('Form submitted successfully');
          log(getUserIdFromJwt(response.data.jwtToken) || '', 'submitted loan application', 'Loan application submitted');
        } else {
          console.error('Failed to submit form:', response.data);
          alert('Failed to submit form. Please try again later.');
          return;
        }

        // const data = {
        //   loan_id: response.data.loan_id,
        //   loan_amount: formData.computations.loanAmount,
        //   interest: formData.computations.interest,
        //   paid_up_capital: formData.computations.paidUpCapital,
        //   service_fee: formData.computations.serviceFee,
        //   savings: formData.computations.savings,
        //   net_loan_proceeds: formData.computations.netLoanProceeds,
        // }

        // await axios.post('/api/loans/new/computations', data);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again later.');
      return;
    }
    
    // Show JSON in alert (you can remove this in production)
    alert(`Form submitted successfully!`);

    // Navigate to next page
    navigate('/application');
  };

  useEffect(() => {
    // Parse the user-typed loan amount
    const loanAmount = parseFloat(formData.computations.loanAmount);
    const paymentTerm = cleanedData.loanInfo.paymentTerms;

    if (!isNaN(loanAmount) && paymentTerm) {
      const {
        interest,
        paidUpCapital,
        serviceFee,
        savings,
        netAmount
      } = calculateComputations(loanAmount, paymentTerm);

      setFormData(prev => ({
        ...prev,
        computations: {
          // preserve whatever the user just typed:
          loanAmount: prev.computations.loanAmount,

          // overwrite only the computed outputs:
          interest:        interest.toFixed(2),
          paidUpCapital:   paidUpCapital.toFixed(2),
          serviceFee:      serviceFee.toFixed(2),
          savings:         savings.toFixed(2),
          netLoanProceeds: netAmount.toFixed(2),
        }
      }));
    }

  }, [
    formData.computations.loanAmount,
    cleanedData.loanInfo.paymentTerms
  ]);

  return (
    <Container fluid className="py-3 main-content">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={9} xl={8}>
          <div className="top-bar">
            <span className="top-bar-text gothic-a1-bold">
              MULTI-PURPOSE LOAN PROGRAM APPLICATION FORM
            </span>
          </div>
 
          <div className="card shadow-lg p-4 mb-5 bg-white rounded afs-card" style={{width: '1200px', maxWidth: '970px'}}>
            <div className="scrollable-form">
              <form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col>
                    <h5 className="text-center gothic-a1-bold" style={{ fontSize: '20px' }}>
                      PROGRAM TUTORIAL
                    </h5>
                    <p className="gothic-a1-regular" style={{ fontSize: '16px' }}>
                      The Multi-Purpose Loan Project is to financially assist all legitimate members of the MHSTEMPC and teachers and employees of Marikina High School.
                    </p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <h5 className="text-center" style={{ fontSize: '20px' }}>GUIDELINES</h5>
                  </Col>
                </Row>

                {[
                  "Only members of MHSTEMPC, teachers, and other employees of Marikina High School can avail the Multi-Purpose Loan Project.",
                  "Loanable amount starts at Php 3,000 up to 80% of the Capital Share of a Regular Member.",
                  "Interest and other fees will be automatically deducted from the approved loanable amount.",
                  "If a borrower wishes to avail loan greater than 80% of his capital share, he must have a co-maker who is in good standing and only 90% of the co-maker's capital share can be a collateral for the said loan.",
                  "If a borrower failed to pay the monthly amortization for three consecutive months, the co-maker is responsible for the borrower's payment.",
                  "A co-maker can avail a loan if the borrower has paid 50% of his loan. However, if the remaining 50% loan balance is less than the capital share of the borrower, the loan difference will be deducted from the co-maker.",
                  "MHTEMPC members will have a 5% interest for 6 months term of payment and 10% interest for 12 months amortization."
                ].map((text, idx) => (
                  <Row key={idx} className="mb-3">
                    <Col>
                      <p className={`gothic-a1-regular ${idx > 0 ? 'indented-paragraph' : ''}`} style={{ fontSize: '16px' }}>
                        &bull; {text}
                      </p>
                    </Col>
                  </Row>
                ))}

                <Row className="mb-4">
                  <Col xs={12}>
                    <div className="d-flex align-items-start gap-3">
                      <input
                        type="checkbox"
                        id="termsAndConditionsCheckbox"
                        name="paymentTerms"
                        className="form-check-input"
                        checked={formData.termsAccepted}
                        onChange={handleCheckboxChange}
                        required
                      />
                      <label
                        htmlFor="termsAndConditionsCheckbox"
                        className="form-check-label gothic-a1-bold mb-0"
                        style={{ fontSize: '16px', lineHeight: '1.4' }}
                      >
                        I hereby declare that I have read and understood the foregoing and have executed this document willingly and voluntarily.
                      </label>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <Col xs={12}>
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      <span className="gothic-a1-bold">SIGNED this</span>
                      <input
                        type="date"
                        className="form-control"
                        style={{ maxWidth: '250px', flexGrow: 1 }}
                        value={formData.signedDate}
                        onChange={handleDateChange}
                        required
                      />
                      <span className="gothic-a1-bold">
                        at Marikina High School, Concepcion, Marikina City.
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-5 justify-content-center">
                  <Col xs={12} md={10} xl={6}>
                    <div className="box-container">
                      <h6 className="box-title gothic-a1-bold" style={{ fontSize: '15px' }}>Computations:</h6>

                      {[
                        { label: "Amount of Loan", id: "loanAmountBox", field: "loanAmount" as keyof FormData['computations'] },
                        { label: "Interest", id: "interestBox", field: "interest" as keyof FormData['computations'] },
                        { label: "Paid-Up Capital", id: "paidUpCapitalBox", field: "paidUpCapital" as keyof FormData['computations'] },
                        { label: "Service Fee", id: "serviceFeeBox", field: "serviceFee" as keyof FormData['computations'] },
                        { label: "Savings", id: "savingsBox", field: "savings" as keyof FormData['computations'] },
                        { label: "Net Loan Fee Proceeds", id: "netLoanProceedsBox", field: "netLoanProceeds" as keyof FormData['computations'] }
                      ].map(({ label, id, field }) => (
                        <div className="mb-3" key={id}>
                          <label htmlFor={id} className="form-label gothic-a1-bold" style={{ fontSize: '15px' }}>
                            {label}:
                          </label>
                          <input 
                            type="text" 
                            id={id} 
                            className="form-control" 
                            placeholder={`Enter ${label.toLowerCase()}`} 
                            value={formData.computations[field]}
                            onChange={handleComputationChange(field)}
                          />
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 d-flex flex-wrap justify-content-end gap-2" style={{ paddingBottom: '20px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary gothic-a1-bold px-4"
                    onClick={onCancel}
                    style={{ color: '#002d62', backgroundColor: '#ffffff', borderColor: '#002d62', borderRadius: '20px', height: '45px', width: '110px' }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary gothic-a1-bold px-4"
                    style={{ backgroundColor: '#002d62', color: '#ffffff', borderRadius: '20px', height: '45px', width: '110px' }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationFormSecond;