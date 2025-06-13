import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Dropdown } from 'react-bootstrap';
import CustomTable from './CustomTable';
import './TableCard.css';
import SearchBar from './SearchBar';
import axios from '../../api/axiosInstance';

type TableCardProps = object;

type PolicyRecord = {
  name: string;
  policy_number: string;
  fb_acc_email_address: string;
  tel_cel_no: string;
};

function formatRows(data: PolicyRecord[]): string[][] {
  const seen = new Set();
  const rows = [];

  for (const item of data) {
    const key = `${item.policy_number}-${item.tel_cel_no}`;
    if (!seen.has(key)) {
      seen.add(key);
      rows.push([
        `${item.name}`,
        item.policy_number,
        item.fb_acc_email_address,
        item.tel_cel_no
      ]);
    }
  }

  return rows;
}

const TableCard: React.FC<TableCardProps> = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Array<Array<string>>>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/user/clients');
        const clientsArray = formatRows(response.data);
        setClients(clientsArray);
        console.log('Fetched clients:', clientsArray);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const columnHeadings = [
    'Name', 'MHSTEMPC Policy Number', 'Email', 'Contact Number'
  ];

  const handleRowClick = (_row: Array<string>) => {
    navigate('/clientLoan');
  };

  const handleRegisterClick = () => {
    navigate('/registerApplicationForm');
  };

  const handleSearchClick = () => {
    alert('Search clicked');
    // You can implement actual search logic here if desired
  };

  return (
    <Card className="mb-4 mt-3 shadow-sm rounded" style={{ width: '100%' }}>
      <Card.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Row className="mb-3 align-items-end">
              <Col xs={12} md={6}>
                <SearchBar />
              </Col>
              <Col xs={12} md={2}>
                <Button
                  variant="primary"
                  style={{ width: '100%' }}
                  className="mb-2"
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
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
            </Row>
            <div className="w-100">
              <CustomTable
                columnHeadings={columnHeadings}
                rows={clients}
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
