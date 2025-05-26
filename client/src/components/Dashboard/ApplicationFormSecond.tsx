import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ApplicationFormSecond.css';

interface ApplicationFormSecondProps {}

const ApplicationFormSecond: React.FC<ApplicationFormSecondProps> = ({}) => {
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
                <Col xs={12} md={12} lg={12} xl={8} >
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded afs-card">
                        <div className="card-body">
                            
                            <form>
                                <Row className="mb-5">
                                    <h5 className='text-center'>PROGRAM TUTORIAL</h5>
                                    <p>The Multi-Purpose Loan Project is to financially assist all legitimate members of the MHSTEMPC and teachers and employees of Marikina High School.</p>
                                </Row>
                                
                                <Row className="mb-3">
                                    <h5 className='text-center'>GUIDELINES</h5>
                                </Row>
                                
                                {/* Row 1 */}
                                <Row className="mb-3">
                                    <p>&bull; Only members of MHSTEMPC, teachers, and other employees of Marikina High School can avail the Multi-Purpose Loan Project.</p>
                                </Row>
                                
                                {/* Row 2 */}
                                <Row className="mb-3 indented-paragraph">
                                    <p>&bull; Loanable amount starts at Php 3,000 up to 80% of the Capital Share of a Regular Member.</p>
                                </Row>
                                
                                {/* Row 3 */}
                                <Row className="mb-3 indented-paragraph">
                                    <p>&bull; Interest and other fees will be automatically deducted from the approved loanable amount. </p>
                                </Row>
                                
                                {/* Row 4 */}
                                <Row className="mb-3 indented-paragraph">
                                    <p>&bull; If a borrower wishes to avail loan greater than 80% of his capital share, he must have a co-maker who is in good standing and only 90% of the co-maker's capital share can be a colateral for the said loan.
                                    </p>
                                </Row>

                                {/* Row 5 */}
                                <Row className="mb-3 indented-paragraph">
                                    <p>&bull; If a borrower failed to pay the monthly amortization for three consecutive months, the co- maker is responsible for the borrower's payment.</p>
                                </Row>

                                {/* Row 6 */}
                                <Row className="mb-3 indented-paragraph">
                                    <p>&bull; A co-maker can avail a loan if the borrower has paid 50% of his loan. However, if the remaining 50% loan balance is less than the capital share of the borrower, the loan difference will be deducted from the co-maker.</p>
                                </Row>

                                {/* Row 7 */}
                                <Row className="mb-5 indented-paragraph">
                                    <p>&bull; MHTEMPC members will have a 5% interest for 6 months term of payment and 10% interest for 12 months amortization. </p>
                                </Row>

                                {/* checkbox */}
                                <Row className="mb-5">
                                    <Col xs={12} md={6} xl={12} className="d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            id="termsAndConditionsCheckbox"
                                            name="paymentTerms"
                                            value="termsAndConditionsCheckbox"
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="termsAndConditionsCheckbox" className="form-check-label fw-semibold">I hereby declare that I have read and understood the foregoing and have executed this document willingly and voluntarily.
                                        </label>
                                    </Col>
                                </Row>
                                
                                {/* sign */}
                                <Row className="mb-5 fw-semibold">
                                    <Col xs={12} className="d-flex align-items-center">
                                        <span className="me-2">SIGNED this</span>
                                        <input
                                            type="date"
                                            className="form-control mx-2"
                                            style={{ width: '150px' }}
                                            placeholder="Date"
                                        />
                                        <span className="ms-2">at Marikina High School, Concepcion, Marikina City.</span>
                                    </Col>
                                </Row>

                                {/* box container */}
                                                                {/* Box Container */}
                                <Row className="mb-5 justify-content-center">
                                    <Col xs={12} md={6} xl={6} className="d-flex justify-content-center">
                                        <div className="box-container">
                                            <h6 className="box-title">Computations:</h6>
                                            <div className="mb-3">
                                                <label htmlFor="loanAmountBox" className="form-label">Amount of Loan:</label>
                                                <input type="text" id="loanAmountBox" className="form-control" placeholder="Enter amount" />
                                            </div>
                                            <p>Less:</p>
                                            <div className="mb-3">
                                                <label htmlFor="interestBox" className="form-label">Interest:</label>
                                                <input type="text" id="interestBox" className="form-control" placeholder="Enter interest" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="paidUpCapitalBox" className="form-label">Paid-Up Capital:</label>
                                                <input type="text" id="paidUpCapitalBox" className="form-control" placeholder="Enter paid-up capital" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="serviceFeeBox" className="form-label">Service Fee:</label>
                                                <input type="text" id="serviceFeeBox" className="form-control" placeholder="Enter service fee" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="savingsBox" className="form-label">Savings:</label>
                                                <input type="text" id="savingsBox" className="form-control" placeholder="Enter savings" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="netLoanProceedsBox" className="form-label">Net Loan Fee Proceeds:</label>
                                                <input type="text" id="netLoanProceedsBox" className="form-control" placeholder="Enter net loan fee proceeds" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                
                                {/* Submit Button */}
                                <div className="mt-4 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary px-5 me-3">Cancel</button>
                                    <button type="submit" className="btn btn-primary px-5">Next</button>
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