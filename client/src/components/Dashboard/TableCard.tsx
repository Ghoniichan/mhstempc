import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Dropdown } from 'react-bootstrap';
import CustomTable from './CustomTable';
import './TableCard.css';
import SearchBar from './SearchBar';

type TableCardProps = object;

const TableCard: React.FC<TableCardProps> = () => {
  const navigate = useNavigate();

  const columnHeadings = [
    'Name', 'MHSTEMPC Policy Number', 'Email', 'Contact Number'
  ];

  const rows = [
    ['Nanoy, John Carlos', 'MHSTEMPC-123456', 'jc@gmail.com', '09123456789'],
    ['Nanoy, John Carlos', 'MHSTEMPC-123456', 'jc@gmail.com', '09123456789'],
    ['Nanoy, John Carlos', 'MHSTEMPC-123456', 'jc@gmail.com', '09123456789'],
    ['Nanoy, John Carlos', 'MHSTEMPC-123456', 'jc@gmail.com', '09123456789'],
  ];

  const handleRowClick = (_row: Array<string>) => {
    navigate('/clientLoan');
  };

  const handleRegisterClick = () => {
    navigate('/registerApplicationForm'); 
  };

  return (
    <Card className="mb-4 mt-3 shadow-sm rounded" style={{ width: '100%' }}>
      <Card.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <SearchBar />
              </Col>
              <Col xs={12} md={2}>
                <Button
                  variant="light"
                  style={{ border: '1px solid lightgray', width: '100%' }}
                  className="mb-2"
                  onClick={handleRegisterClick}
                >
                  Register Member
                </Button>
              </Col>
              <Col xs={12} md={2}>
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
              <Col xs={12} md={2}>
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
