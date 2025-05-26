import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ApplicationForm.css';

interface ApplicationFormProps {
  onNext: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add form validation here if needed
    onNext();
  };

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={10} xl={8}>
          <div className="top-bar">
            <span className="top-bar-text">MULTI-PURPOSE LOAN PROGRAM APPLICATION FORM</span>
          </div>
        </Col>
      </Row>

      {/* Main Form Container */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={10} xl={8}>
          <div className="card shadow-lg p-4 mb-5 bg-white rounded af-card">
            <div className="card-body">

              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <Row className="mb-3">
                  <Col xs={12} md={4}>
                    <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                    <input type="text" className="form-control" id="firstName" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="middleName" className="form-label fw-semibold">Middle Name</label>
                    <input type="text" className="form-control" id="middleName" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                    <input type="text" className="form-control" id="lastName" required />
                  </Col>
                </Row>

                {/* Row 2 */}
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <label htmlFor="address" className="form-label fw-semibold">Address</label>
                    <input type="text" className="form-control custom-address-input" id="address" required />
                  </Col>
                  <Col xs={12} md={6}>
                    <label htmlFor="policyNumber" className="form-label fw-semibold">MHSTEMPC Policy Number</label>
                    <input type="text" className="form-control" id="policyNumber" required />
                  </Col>
                </Row>

                {/* Row 3 */}
                <Row className="mb-3">
                  <Col xs={12} md={4}>
                    <label htmlFor="contactNumber" className="form-label fw-semibold">Contact Number</label>
                    <input type="text" className="form-control" id="contactNumber" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="membershipType" className="form-label fw-semibold">Type of Membership</label>
                    <input type="text" className="form-control" id="membershipType" required />
                  </Col>
                  <Col xs={12} md={4}>
                    <label htmlFor="membershipDate" className="form-label fw-semibold">Date of Membership</label>
                    <input type="date" className="form-control" id="membershipDate" required />
                  </Col>
                </Row>

                {/* Row 4 */}
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <label htmlFor="shareNumber" className="form-label fw-semibold">Number of Shares</label>
                    <input type="text" className="form-control custom-shareNumber-input" id="shareNumber" required />
                  </Col>
                  <Col xs={12} md={6}>
                    <label htmlFor="loanPurpose" className="form-label fw-semibold">Purpose of Loan</label>
                    <input type="text" className="form-control" id="loanPurpose" required />
                  </Col>
                </Row>

                {/* Row 5 */}
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <label htmlFor="loanAmount" className="form-label fw-semibold">Amount of Loan</label>
                    <input type="text" className="form-control" id="loanAmount" required />
                  </Col>
                  <Col xs={12} md={6}>
                    <label htmlFor="paymentTerms" className="form-label fw-semibold">Terms of Payment</label>
                    <Row>
                      <Col xs={12} md={4} className="d-flex align-items-center">
                        <input
                          type="radio"
                          id="sixMonths"
                          name="paymentTerms"
                          value="sixMonths"
                          className="form-check-input me-2"
                          required
                        />
                        <label htmlFor="sixMonths" className="form-check-label">6 months</label>
                      </Col>
                      <Col xs={12} md={4} className="d-flex align-items-center">
                        <input
                          type="radio"
                          id="twoMonths"
                          name="paymentTerms"
                          value="twoMonths"
                          className="form-check-input me-2"
                          required
                        />
                        <label htmlFor="twoMonths" className="form-check-label">2 months</label>
                      </Col>
                      <Col xs={12} md={4} className="d-flex align-items-center">
                        <input
                          type="radio"
                          id="others"
                          name="paymentTerms"
                          value="others"
                          className="form-check-input me-2"
                          required
                        />
                        <label htmlFor="others" className="form-check-label me-2">Others:</label>
                        <input 
                          type="text"
                          className="form-control"
                          id="otherPaymentTerms"
                          placeholder="Specify"
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* Row 6 */}
                <Row className="mb-5">
                  <Col xs={12} md={4} className="ms-auto">
                    <label htmlFor="signDate" className="form-label fw-semibold">Date Signed</label>
                    <input type="date" className="form-control" id="signDate" required />
                  </Col>
                </Row>

                <h5 className="card-title mb-4">
                  Co-Makers: <span className="text-muted" style={{ fontSize: "0.9rem" }}>(optional)</span>
                </h5>  
                <p className="card-text mb-4 fixed-paragraph">
                  We agreed and understand that if the borrower whose name appears above was unable to pay for three consecutive months, we will surrender our client ATM card (where we obtain our salary) to MHSTEMPC to deduct payments for the loan involved.
                </p>

                {/* Row 7 */}
                <Row className="mb-5">
                  <Col xs={12} md={6}>
                    <label htmlFor="comakerName" className="form-label fw-semibold">Co-Makers Name</label>
                    <input type="text" className="form-control custom-address-input" id="comakerName" required />
                  </Col>
                  <Col xs={12} md={6}>
                    <label htmlFor="comakerSignDate" className="form-label fw-semibold">Date Signed</label>
                    <input type="date" className="form-control" id="comakerSignDate" required />
                  </Col>
                </Row>

                <h5 className="card-title mb-5 text-center">
                  FOR MHSTEMPC OFFICERS' USE ONLY 
                </h5> 
                <h5 className="card-title mb-5">
                  Approved By: 
                </h5> 

                {/* Row 8 */}
                <Row className="mb-5 text-center">
                  <Col xs={12} md={4}>
                    <h5 className="card-title mb-2">RIZALYN S. SANTOS</h5> 
                    <label className="label">Credit Commitee Chairperson</label>
                  </Col>
                  <Col xs={12} md={4}>
                    <h5 className="card-title mb-2">TERESITA M. VILLARUEL</h5>
                    <label className="label">Treasurer</label>
                  </Col>
                  <Col xs={12} md={4}>
                    <h5 className="card-title mb-2">HELEN M. AQUINO</h5>
                    <label className="label">Chairman</label>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="mt-4 d-flex">
                  <button type="submit" className="btn btn-primary px-5 ms-auto">Next</button>
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
