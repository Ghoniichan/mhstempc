import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AddPaymentCard.css';
import { useNavigate } from 'react-router-dom';

const AddPaymentCard: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Container fluid className="add-payment-container py-5">
            <Row className="justify-content-center">
                <Col xs={12}>
                    <div className="form-wrapper">
                        {/* Card with Top Bar Integrated */}
                        <div className="card shadow-lg mb-5 apc-card">
                            {/* Top Bar */}
                            <div className="top-bar">
                                <span className="top-bar-text gothic-a1-bold">Add New Payment</span>
                            </div>

                            {/* Card Body */}
                            <div className="card-body">
                                <form>
                                    {/* Row 1: Full Name & Date Issued */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={6}>
                                            <label htmlFor="fullName" className="form-label gothic-a1-bold">Full Name</label>
                                            <input type="text" className="form-control" id="fullName" placeholder="Surname, First Name, M.I., Suffix" required />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <label htmlFor="dateIssued" className="form-label gothic-a1-bold">Date Issued</label>
                                            <div className="date-select d-flex gap-2">
                                                <select className="form-select" id="month" required>
                                                    <option value="">Month</option>
                                                    {[
                                                        'January', 'February', 'March', 'April',
                                                        'May', 'June', 'July', 'August',
                                                        'September', 'October', 'November', 'December'
                                                    ].map((month, index) => (
                                                        <option key={index} value={month}>{month}</option>
                                                    ))}
                                                </select>
                                                <select className="form-select" id="day" required>
                                                    <option value="">Day</option>
                                                    {Array.from({ length: 31 }, (_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                                <select className="form-select" id="year" required>
                                                    <option value="">Year</option>
                                                    {Array.from({ length: 96 }, (_, i) => (
                                                        <option key={1930 + i} value={1930 + i}>{1930 + i}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 2: Account ID & Collected By */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={6}>
                                            <label htmlFor="accountID" className="form-label gothic-a1-bold">Account ID</label>
                                            <input type="text" className="form-control" id="accountID" required />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <label htmlFor="collectedBy" className="form-label gothic-a1-bold">Collected By</label>
                                            <input type="text" className="form-control" id="collectedBy" required />
                                        </Col>
                                    </Row>

                                    {/* Row 3: Loan ID */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="loanId" className="form-label gothic-a1-bold">Loan ID</label>
                                            <input type="text" className="form-control" id="loanId" required />
                                        </Col>
                                    </Row>

                                    {/* Row 4: Loan Amount */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="loanAmount" className="form-label gothic-a1-bold">Loan Amount</label>
                                            <input type="text" className="form-control" id="loanAmount" required />
                                        </Col>
                                    </Row>

                                    {/* Buttons */}
                                    <div className="mt-4 d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary px-4 me-2 gothic-a1-bold"
                                            style={{ color: '#002d62', backgroundColor: 'white' }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4 gothic-a1-bold"
                                            onClick={() => navigate('/payment')}
                                            style={{ backgroundColor: '#002d62' }}
                                        >
                                            Save Payment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPaymentCard;
