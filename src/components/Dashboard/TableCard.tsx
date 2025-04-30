import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomTable from './CustomTable'; 
import './TableCard.css';

interface TableCardProps {}

const TableCard: React.FC<TableCardProps> = ({}) => {

    const columnHeadings = [
        'Date',
        'OR',
        'Interest',
        'SErvice Fee',
        'Fines',
        'Due Date',
        'Recieved Amount',
        'Recieved Amount2',
        'Recieved Amount3',
        'Recieved Amount4'
    ];

    const rows = [
        ['John Doe', '123', 'LN001', '$10,000', '2023-01-01', 'Manager A', '2023-12-31' , '$10,000', '$10,000', '$10,000'],
        ['Jane Smith', '124', 'LN002', '$15,000', '2023-02-01', 'Manager B', '2024-01-31' , '$15,000', '$15,000', '$15,000'],
    ];

    return (
        <Card className="mb-4 shadow-sm rounded">
            <Card.Body>
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <Row className="mb-3">
                            <Col xs={6} md={6}>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    id="firstName"
                                    placeholder="Search"
                                    required
                                />
                            </Col>
                            <Col xs={3} md={3}>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    id="middleName"
                                    placeholder="BUTTON DAPAT TO"
                                    required
                                />
                            </Col>
                            <Col xs={3} md={3}>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    id="lastName"
                                    placeholder="BUTTON DAPAT TO"
                                    required
                                />
                            </Col>
                        </Row>

                        <CustomTable columnHeadings={columnHeadings} rows={rows} />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TableCard;