import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ApplicationFormSecond.css';

interface ApplicationFormSecondProps {
  onCancel: () => void;
}

const ApplicationFormSecond: React.FC<ApplicationFormSecondProps> = ({ onCancel }) => {
  return (
    <Container fluid className="py-3 main-content">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={9} xl={8}>
          <div className="top-bar">
            <span className="top-bar-text gothic-a1-bold">
              MULTI-PURPOSE LOAN PROGRAM APPLICATION FORM
            </span>
          </div>

          <div className="card shadow-lg p-4 mb-5 bg-white rounded afs-card">
            <div className="scrollable-form">
              <form>
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
                    <div className="d-flex align-items-start flex-wrap gap-2">
                      <input
                        type="checkbox"
                        id="termsAndConditionsCheckbox"
                        name="paymentTerms"
                        className="form-check-input mt-1"
                        required
                      />
                      <label
                        htmlFor="termsAndConditionsCheckbox"
                        className="form-check-label gothic-a1-bold"
                        style={{ fontSize: '16px' }}
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
                        style={{ maxWidth: '150px', flexGrow: 1 }}
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
                        { label: "Amount of Loan", id: "loanAmountBox" },
                        { label: "Interest", id: "interestBox" },
                        { label: "Paid-Up Capital", id: "paidUpCapitalBox" },
                        { label: "Service Fee", id: "serviceFeeBox" },
                        { label: "Savings", id: "savingsBox" },
                        { label: "Net Loan Fee Proceeds", id: "netLoanProceedsBox" }
                      ].map(({ label, id }) => (
                        <div className="mb-3" key={id}>
                          <label htmlFor={id} className="form-label gothic-a1-bold" style={{ fontSize: '15px' }}>
                            {label}:
                          </label>
                          <input type="text" id={id} className="form-control" placeholder={`Enter ${label.toLowerCase()}`} />
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>

                <div className="mt-4 d-flex flex-wrap justify-content-end gap-2" style={{ paddingBottom: '20px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={onCancel}
                    style={{ color: '#002d62', backgroundColor: 'white' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    style={{ backgroundColor: '#002d62', color: 'white' }}
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
