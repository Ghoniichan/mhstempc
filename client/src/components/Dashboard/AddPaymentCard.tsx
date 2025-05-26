import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AddPaymentCard.css';

interface AddPaymentCardProps {}

const AddPaymentCard: React.FC<AddPaymentCardProps> = ({}) => {
    return (
        <Container fluid className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={12}>
                    <div className="top-bar">
                        <span className="top-bar-text">ADD NEW PAYMENT</span>
                    </div>
                </Col>
            </Row>

            {/* Main Form Container */}
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={12} xxl={12} >
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded apc-card">
                        <div className="card-body">
                            
                            <form>
                                {/* Row 1 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={6} lg={6} xl={6}>
                                        <label htmlFor="firstName" className="form-label fw-semibold">Full Name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="Surname, First Name, M.I., Suffix" required />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label htmlFor="dateIssued" className="form-label fw-semibold">Date Issued</label>
                                        <Row className="mb-3">
                                            <Col xs={4} md={5} lg={5} xl={5} className="position-relative">
                                                <select className="form-control custom-dropdown" id="month" required>
                                                    <option value="" disabled selected>Month</option>
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                    <option value="March">March</option>
                                                    <option value="April">April</option>
                                                    <option value="May">May</option>
                                                    <option value="June">June</option>
                                                    <option value="July">July</option>
                                                    <option value="August">August</option>
                                                    <option value="September">September</option>
                                                    <option value="October">October</option>
                                                    <option value="November">November</option>
                                                    <option value="December">December</option>
                                                </select>
                                                <i className="bi bi-chevron-down position-absolute dropdown-icon"></i>
                                            </Col>
                                            <Col xs={4} md={3} lg={3} xl={3} className="position-relative">
                                                <select className="form-control custom-dropdown short-dropdown" id="day" required>
                                                    <option value="" disabled selected>
                                                        Day
                                                    </option>
                                                    {Array.from({ length: 31 }, (_, i) => (
                                                        <option key={i + 1} value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                                <i className="bi bi-chevron-down position-absolute dropdown-icon"></i>
                                            </Col>
                                            <Col xs={4} md={4} lg={4} xl={4} className="position-relative">
                                                <select className="form-control custom-dropdown short-dropdown" id="year" required>
                                                    <option value="" disabled selected>
                                                        Year
                                                    </option>
                                                    {Array.from({ length: 2025 - 1930 + 1 }, (_, i) => (
                                                        <option key={i + 1930} value={i + 1930}>
                                                            {i + 1930}
                                                        </option>
                                                    ))}
                                                </select>
                                                <i className="bi bi-chevron-down position-absolute dropdown-icon"></i>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                
                                {/* Row 2 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={6} lg={6} xl={6}>
                                        <label htmlFor="accountID" className="form-label fw-semibold">Account ID</label>
                                        <input type="text" className="form-control custom-address-input" id="accountID" required />
                                    </Col>
                                    <Col xs={12} md={6} lg={6} xl={6}>
                                        <label htmlFor="collectedBy" className="form-label fw-semibold">Collected By</label>
                                        <input type="text" className="form-control custom-address-input" id="collectedBy" required />
                                    </Col>
                                </Row>
                                
                                {/* Row 3 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={6} lg={6} xl={6}>
                                        <label htmlFor="loanId" className="form-label fw-semibold">Loan ID</label>
                                        <input type="text" className="form-control" id="loanId" required />
                                    </Col>
                                </Row>
                                
                                {/* Row 4 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={6} lg={6} xl={6}>
                                        <label htmlFor="loanAmount" className="form-label fw-semibold">Loan Amount</label>
                                        <input type="text" className="form-control" id="loanAmount" required />
                                    </Col>
                                </Row>
                                
                                {/* Submit Button */}
                                <div className="mt-4 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary px-4 me-2">Cancel</button>
                                    <button type="submit" className="btn btn-primary px-4">Save Payment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPaymentCard;