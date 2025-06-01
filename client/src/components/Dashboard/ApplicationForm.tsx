import React from 'react';
import './ApplicationForm.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

interface ApplicationFormProps {
  onNext: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const navigate = useNavigate();

  

  return (
    <Container fluid className="py-3 main-content">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={9} xl={8}>
          <div className="top-bar">
            <span className="top-bar-text gothic-a1-bold">
              MULTI-PURPOSE LOAN PROGRAM APPLICATION FORM
            </span>
          </div>

          <div className="card shadow-lg p-4 mb-5 bg-white rounded af-card">
            <div className="card-body scrollable-form">
              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <Row className="mb-3">
                  <Col xs={12} md={4}>
                    <label htmlFor="firstName" className="form-label gothic-a1-bold">First Name</label>
                    <input type="text" className="form-control" id="firstName" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="middleName" className="form-label gothic-a1-bold">Middle Name</label>
                    <input type="text" className="form-control" id="middleName" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="lastName" className="form-label gothic-a1-bold">Last Name</label>
                    <input type="text" className="form-control" id="lastName" required />
                  </Col>
                </Row>

                {/* Row 2 */}
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <label htmlFor="address" className="form-label gothic-a1-bold">Address</label>
                    <input type="text" className="form-control" id="address" required />
                  </Col>
                  <Col xs={12} md={6}>
                    <label htmlFor="policyNumber" className="form-label gothic-a1-bold">MHSTEMPC Policy Number</label>
                    <input type="text" className="form-control" id="policyNumber" required />
                  </Col>
                </Row>

                {/* Row 3 */}
                <Row className="mb-3">
                  <Col xs={12} md={4}>
                    <label htmlFor="contactNumber" className="form-label gothic-a1-bold">Contact Number</label>
                    <input type="text" className="form-control" id="contactNumber" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="membershipType" className="form-label gothic-a1-bold">Type of Membership</label>
                    <input type="text" className="form-control" id="membershipType" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="membershipDate" className="form-label gothic-a1-bold">Date of Membership</label>
                    <input type="date" className="form-control" id="membershipDate" required />
                  </Col>
                </Row>

                {/* Row 4 */}
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <label htmlFor="shareNumber" className="form-label gothic-a1-bold">Number of Shares</label>
                    <input type="text" className="form-control" id="shareNumber" required />
                  </Col>
                  <Col xs={12} md={6}>
                    <label htmlFor="loanPurpose" className="form-label gothic-a1-bold">Purpose of Loan</label>
                    <input type="text" className="form-control" id="loanPurpose" required />
                  </Col>
                </Row>

                {/* Row 5 */}
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <label htmlFor="loanAmount" className="form-label gothic-a1-bold">Amount of Loan</label>
                    <input type="text" className="form-control" id="loanAmount" required />
                  </Col>
                  <Col xs={12} md={6}>
                    <label className="form-label gothic-a1-bold">Terms of Payment</label>
                    <Row className="gx-2 gy-2">
                      <Col xs={12} sm={4}>
                        <input type="radio" id="sixMonths" name="paymentTerms" value="sixMonths" className="form-check-input me-2" required />
                        <label htmlFor="sixMonths" className="form-check-label gothic-a1-bold">6 months</label>
                      </Col>
                      <Col xs={12} sm={4}>
                        <input type="radio" id="twoMonths" name="paymentTerms" value="twoMonths" className="form-check-input me-2" required />
                        <label htmlFor="twoMonths" className="form-check-label gothic-a1-bold">2 months</label>
                      </Col>
                      <Col xs={12} sm={4}>
                        <div className="d-flex flex-column flex-sm-row align-items-start gap-2">
                          <input type="radio" id="others" name="paymentTerms" value="others" className="form-check-input" required />
                          <label htmlFor="others" className="form-check-label gothic-a1-bold">Others:</label>
                          <input type="text" className="form-control" id="otherPaymentTerms" placeholder="Specify" />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Row 6 */}
                <Row className="mb-5">
                  <Col xs={12} md={4} className="ms-auto">
                    <label htmlFor="signDate" className="form-label gothic-a1-bold">Date Signed</label>
                    <input type="date" className="form-control" id="signDate" required />
                  </Col>
                </Row>

                {/* Co-Maker Section */}
                <h5 className="card-title mb-4">Co-Makers: <span className="text-muted" style={{ fontSize: "0.9rem" }}>(optional)</span></h5>
                <p className="card-text mb-4 gothic-a1-regular">
                  We agreed and understand that if the borrower whose name appears above was unable to pay for three consecutive months, we will surrender our client ATM card (where we obtain our salary) to MHSTEMPC to deduct payments for the loan involved.
                </p>

                <Row className="mb-5">
                  <Col xs={12} md={6}>
                    <label htmlFor="comakerName" className="form-label gothic-a1-bold">Co-Makers Name</label>
                    <input type="text" className="form-control" id="comakerName" />
                  </Col>
                  <Col xs={12} md={6}>
                    <label htmlFor="comakerSignDate" className="form-label gothic-a1-bold">Date Signed</label>
                    <input type="date" className="form-control" id="comakerSignDate" />
                  </Col>
                </Row>

                {/* Officer Use Section */}
                <h4 className="card-title mb-5 text-center gothic-a1-bold" style={{ fontSize: '20px' }}>
                  FOR MHSTEMPC OFFICERS' USE ONLY
                </h4>
                <h4 className="card-title mb-5 gothic-a1-bold" style={{ fontSize: '20px' }}>Approved By:</h4>

                <Row className="mb-5 text-center">
                  <Col xs={12} md={4}>
                    <h5 className="gothic-a1-bold">RIZALYN S. SANTOS</h5>
                    <p className="officer-title">Credit Committee Chairperson</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <h5 className="gothic-a1-bold">TERESITA M. VILLARUEL</h5>
                    <p className="officer-title">Treasurer</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <h5 className="gothic-a1-bold">HELEN M. AQUINO</h5>
                    <p className="officer-title">Chairman</p>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="mt-4 d-flex">
                  <button type="submit" className="btn btn-primary px-5 ms-auto gothic-a1-bold" onClick={() => navigate('/applicationFormTwo')} style={{ backgroundColor: '#002d62' }}>
                    Next
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

export default ApplicationForm;
