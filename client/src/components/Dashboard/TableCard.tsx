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

type PolicyRecord = {
  name: string;
  policy_number: string;
  fb_acc_email_address: string;
  tel_cel_no: string;
};

const TableCard: React.FC = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState<React.ReactNode[][]>([]);
  const [originalClients, setOriginalClients] = useState<React.ReactNode[][]>([]);

  const formatRows = (data: PolicyRecord[]): React.ReactNode[][] => {
    const seen = new Set<string>();
    const rows: React.ReactNode[][] = [];

    data.forEach(item => {
      const key = `${item.policy_number}-${item.tel_cel_no}`;
      if (!seen.has(key)) {
        seen.add(key);
        rows.push([
          item.name,
          item.policy_number,
          item.fb_acc_email_address,
          item.tel_cel_no,
        ]);
      }
    });

    return rows;
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get<PolicyRecord[]>('/api/user/clients');
        const rows = formatRows(response.data);
        setOriginalClients(rows);
        setClients(rows);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Search handling
  const handleSearch = (query: string) => {
    const trimmed = query.trim().toLowerCase();

    if (trimmed === '') {
      setClients(originalClients);
      return;
    }

    const filtered = originalClients.filter(row =>
      row.some(cell =>
        typeof cell === 'string' && cell.toLowerCase().includes(trimmed)
      )
    );

    setClients(filtered);
  };

  const handleRegisterClick = () => {
    navigate('/registerApplicationForm');
  };

  // Updated type to ReactNode[]
  const handleRowClick = (row: React.ReactNode[]) => {
    const policyNumber = row[1] as string;
<<<<<<< HEAD
    alert(`Policy Number: ${policyNumber}`);
    navigate('/clientLoan');
=======
    navigate('/clientLoan', { state: { policy_no: policyNumber } });
>>>>>>> a8f7878269ef700b72c69fa269b3927d3a5f992f
  };

  const columnHeadings = [
    'Name',
    'MHSTEMPC Policy Number',
    'Email',
    'Contact Number',
  ];

  return (
    <Card className="mb-4 mt-3 shadow-sm rounded" style={{ width: '100%' }}>
      <Card.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Row className="mb-3 align-items-end">
              <Col xs={12} md={6}>
                <SearchBar onSearch={handleSearch} />
              </Col>
              <Col xs={12} md={3}>
                <Button
                  variant="light"
                  className="mb-2 w-100"
                  style={{ border: '1px solid lightgray' }}
                  onClick={handleRegisterClick}
                >
                  Register Member
                </Button>
              </Col>
              <Col xs={12} md={3}>
                <Dropdown className="mb-2 w-100">
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
