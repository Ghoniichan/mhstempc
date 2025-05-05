import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './InformationCard.css';
import CustomTable from './CustomTable'; 

interface InformationCardProps {
    title: string;
    department: string;
    policyNumber: string;
    address: string;
    contactNumber: string;
    loanStatus: string;
    membershipType: string;
    membershipDate: string;
    onSendSMS?: () => void; 
}

const InformationCard: React.FC<InformationCardProps> = ({title, department, policyNumber, address, contactNumber, loanStatus, membershipType, membershipDate}) => {
    const columnHeadings = [
        'Date',
        'OR',
        'Interest',
        'Srevice Fee',
        'Fines',
        'Due Date',
        'Received Amount'
    ];

    const rows = [
        ['John Doe', '123', 'LN001', '$10,000', '2023-01-01', 'Manager A', '2023-12-31'],
        ['Jane Smith', '124', 'LN002', '$15,000', '2023-02-01', 'Manager B', '2024-01-31'],
    ];

    return (
        <Container fluid className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={8}>
                    <div className="top-bar">
                        <span className="top-bar-text">{title}</span>
                    </div>
                </Col>
            </Row>

            {/* Main Form Container */}
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={8} >
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded ic-card">
                        <div className="card-body">
                            <Row className="mb-3 align-items-center">
                                <Col xs={3} md={3} lg={2} xl={1} xxl={1} className="align-self-start">
                                    <img
                                        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Profile Placeholder"
                                        className="rounded-circle img-fluid"
                                    />
                                </Col>
                                <Col xs={9} md={9} lg={10} xl={11}>
                                    <Row>
                                        <Col xs={6}>
                                            <h5 className="form-label fw-semibold mb-3">Department: <span className="fw-normal">{department}</span></h5>
                                            <h5 className="form-label fw-semibold mb-3">MHSTEMPC Policy Number: <span className="fw-normal">{policyNumber}</span></h5>
                                            <h5 className="form-label fw-semibold mb-3">Address: <span className="fw-normal">{address}</span></h5>
                                            <h5 className="form-label fw-semibold mb-3">Contact Number: <span className="fw-normal">{contactNumber}</span></h5>
                                        </Col>

                                        <Col xs={6}>
                                            <h5 className="form-label fw-semibold mb-3">Loan Status: <span className="fw-normal">{loanStatus}</span></h5>
                                            <h5 className="form-label fw-semibold mb-3">Type of Membership: <span className="fw-normal">{membershipType}</span></h5>
                                            <h5 className="form-label fw-semibold mb-3">Date of Membership: <span className="fw-normal">{membershipDate}</span></h5>
                                            <button className="btn btn-danger">Send SMS</button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={8} >
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded">
                        <div className="card-body">
                            <CustomTable columnHeadings={columnHeadings} rows={rows} className="w-100"></CustomTable>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

        
    );
};

export default InformationCard;