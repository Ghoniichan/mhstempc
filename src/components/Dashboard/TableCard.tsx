import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Dropdown } from 'react-bootstrap';
import CustomTable from './CustomTable';
import './TableCard.css';

interface TableCardProps {}

const TableCard: React.FC<TableCardProps> = () => {
  const navigate = useNavigate();

  const columnHeadings = [
    'Date',
    'OR',
    'Interest',
    'Service Fee',
    'Fines',
    'Due Date',
    'Received Amount',
    'Received Amount2',
    'Received Amount3',
    'Received Amount4',
  ];

  const rows = [
    ['2023-01-01', '123', '$100', '$10', '$5', '2023-12-31', '$1000', '$200', '$300', '$400'],
    ['2023-02-01', '124', '$150', '$15', '$7', '2024-01-31', '$1500', '$250', '$350', '$450'],
    ['2023-03-01', '125', '$200', '$20', '$10', '2024-02-28', '$2000', '$300', '$400', '$500'],
  ];

  const handleRowClick = (row: Array<string>) => {
    navigate('/clientLoan');
  };

  return (
    <Card className="mb-4 mt-3 shadow-sm rounded" style={{ width: '100%' }}>
      <Card.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Row className="mb-3">
              <Col xs={12} md={5}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Search"
                  required
                />
              </Col>
              <Col xs={6} md={2}>
                <Button
                  variant="light"
                  style={{ border: '1px solid lightgray', width: '100%' }}
                  className="mb-2"
                  onClick={() => alert('Button 1 clicked')}
                >
                  Register Member
                </Button>
              </Col>
              <Col xs={6} md={2}>
                <Dropdown style={{ width: '100%' }} className="mb-2">
                  <Dropdown.Toggle
                    variant="light"
                    style={{ border: '1px solid lightgray', width: '100%' }}
                  >
                    Membership Type
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: '100%' }}>
                    <Dropdown.Item onClick={() => alert('All clicked')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => alert('Regular clicked')}>Regular</Dropdown.Item>
                    <Dropdown.Item onClick={() => alert('Non-Member clicked')}>Non-Member</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs={12} md={3}>
                <Button
                  variant="danger"
                  style={{ border: '1px solid red', width: '100%' }}
                  className="mb-2"
                  onClick={() => alert('Button 3 clicked')}
                >
                  Send SMS
                </Button>
              </Col>
            </Row>
            <div className="w-100">
              <CustomTable
                columnHeadings={columnHeadings}
                rows={rows}
                onRowClick={handleRowClick}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TableCard;
