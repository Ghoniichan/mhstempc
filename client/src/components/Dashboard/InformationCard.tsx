import React, { CSSProperties } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomTable from './CustomTable';
import './InformationCard.css';

interface InformationCardProps {
  title: string;
  department: string;
  policyNumber: string;
  address: string;
  contactNumber: string;
  loanStatus: string;
  membershipType: string;
  membershipDate: string;
  columnHeadings: string[];
  rows: string[][];
  onSendSMS?: () => void;
}

const InformationCard: React.FC<InformationCardProps> = ({
  title,
  department,
  policyNumber,
  address,
  contactNumber,
  loanStatus,
  membershipType,
  membershipDate,
  columnHeadings,
  rows,
}) => {
  // const [active, setActive] = useState<string>('Loan');
  const buttons = ['Loan', 'Capital Share', 'Savings'];

  const baseButtonStyle: CSSProperties = {
    width: '100%',
    backgroundColor: 'white',
    color: '#002D62',
    border: '2px solid #002D62',
    padding: '10px 0',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
    userSelect: 'none',
  };

  const activeStyle: CSSProperties = {
    backgroundColor: '#002D62',
    color: 'white',
  };

  const navigate = useNavigate();

  const location = useLocation();
  const activeTab = (() => {
    if (location.pathname.includes('clientLoan')) return 'Loan';
    if (location.pathname.includes('clientCapitalShare')) return 'Capital Share';
    if (location.pathname.includes('clientSavings')) return 'Savings';
    return '';
  })();


  return (
    <div className="information-card-fullwidth">
      <Row className="main-card-row">
        <Col xs={12} s={12} md={12} lg={12} className="mx-auto">
          <div className="card shadow-lg p-0 mb-4 mt-3 bg-white rounded w-100 overflow-auto">
            <div className="ic-top-bar">
              <span className="top-bar-text">{title}</span>
            </div>
            <div className="card-body p-4 rounded">
              <Row className="mb-3 align-items-center">
                <Col xs={3} md={2} className="align-self-start">
                  <img
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile Placeholder"
                    className="profile-image"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                </Col>
                <Col xs={9} md={10}>
                  <Row>
                    <Col xs={12} md={6}>
                      <h5 className="form-label fw-semibold mb-3">
                        Department: <span className="fw-normal">{department}</span>
                      </h5>
                      <h5 className="form-label fw-semibold mb-3">
                        MHSTEMPC Policy Number: <span className="fw-normal">{policyNumber}</span>
                      </h5>
                      <h5 className="form-label fw-semibold mb-3">
                        Address: <span className="fw-normal">{address}</span>
                      </h5>
                      <h5 className="form-label fw-semibold mb-3">
                        Contact Number: <span className="fw-normal">{contactNumber}</span>
                      </h5>
                    </Col>

                    <Col xs={12} md={6}>
                      <h5 className="form-label fw-semibold mb-3">
                        Loan Status: <span className="fw-normal">{loanStatus}</span>
                      </h5>
                      <h5 className="form-label fw-semibold mb-3">
                        Type of Membership: <span className="fw-normal">{membershipType}</span>
                      </h5>
                      <h5 className="form-label fw-semibold mb-3">
                        Date of Membership: <span className="fw-normal">{membershipDate}</span>
                      </h5>
                      <button
                        className="btn btn-danger w-100 mt-2"
                        onClick={() => navigate('/clientSendSms')}
                      >
                        Send SMS
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Buttons row */}
      <Row className="mb-4 mt-5 text-center">
        {buttons.map((btn) => {
          const isActive = activeTab === btn;
          return (
            <Col xs={12} md={4} className="mb-2" key={btn}>
              <button
                style={{
                  ...baseButtonStyle,
                  ...(isActive ? activeStyle : {}),
                }}
                onClick={() => {
                  switch (btn) {
                    case 'Loan':
                      navigate('/clientLoan');
                      break;
                    case 'Capital Share':
                      navigate('/clientCapitalShare');
                      break;
                    case 'Savings':
                      navigate('/clientSavings');
                      break;
                    default:
                      break;
                  }
                }}
              >
                {btn}
              </button>
            </Col>
          );
        })}
      </Row>



      <Row className="table-row">
        <Col xs={12} className="h-100">
          <div className="card shadow-lg p-4 mb-4 bg-white rounded w-100">
            <div className="card-body d-flex flex-column h-100">
              <div className="table-responsive">
                <CustomTable columnHeadings={columnHeadings} rows={rows} className="w-100" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InformationCard;
