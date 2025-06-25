import React, { useEffect, useState } from 'react';
import './ApplicationForm.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

interface FormData {
  personalInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    contactNumber: string;
  };

  membershipInfo: {
    policyNumber: string;
    membershipType: string;
    membershipDate: string;
    numberOfShares: string;
  };

  loanInfo: {
    purpose: string;
    amount: string;
    paymentTerms: string;
    otherPaymentTerms?: string;
    dateSigned: string;
  };

  coMakers: {
    name: string;
    dateSigned: string;
  }[];

  submissionDate: string;
}

interface ApplicationFormProps {
  user: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    present_address?: string;
    tel_cel_no?: string;
    policy_number?: string;
    membership_date?: string;
    capital?: string;
  };
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ user }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: user?.first_name || '',
      middleName: user?.middle_name || '',
      lastName: user?.last_name || '',
      address: user?.present_address || '',
      contactNumber: user?.tel_cel_no || ''
    },
    membershipInfo: {
      policyNumber: user.policy_number || '',
      membershipType: '',
      membershipDate: user.membership_date
        ? new Date(user.membership_date).toISOString().split('T')[0]
        : '',
      numberOfShares: user.capital || ''
    },
    loanInfo: {
      purpose: '',
      amount: '',
      paymentTerms: '',
      otherPaymentTerms: '',
      dateSigned: ''
    },
    coMakers: [
      { name: '', dateSigned: '' },
      { name: '', dateSigned: '' },
      { name: '', dateSigned: '' }
    ],
    submissionDate: new Date().toISOString()
  });

  const [warning, setWarning] = useState<string>("");

  useEffect(() => {
    document.title = 'MHSTEMPC | Loan Application';
  }, []);

  const handleInputChange = (
    section: keyof Omit<FormData, 'coMakers' | 'submissionDate'>,
    field: string,
    value: string
  ) => {
    // Special check for loan amount
    if (section === 'loanInfo' && field === 'amount') {
      const numShares = Number(formData.membershipInfo.numberOfShares);
      const amount = Number(value);
      if (!isNaN(numShares) && !isNaN(amount) && amount > numShares) {
        setWarning('Warning: Loan amount exceeds number of shares.');
      } else {
        setWarning("");
      }
    }
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCoMakerChange = (
    index: number,
    field: 'name' | 'dateSigned',
    value: string
  ) => {
    setFormData(prev => {
      const newCoMakers = prev.coMakers.map((cm, i) =>
        i === index ? { ...cm, [field]: value } : cm
      );
      return { ...prev, coMakers: newCoMakers };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent submit if warning is set
    if (warning) {
      alert('Please correct the loan amount before proceeding.');
      // Optionally, focus the amount input
      const amountInput = document.getElementById('amount');
      if (amountInput) amountInput.focus();
      return;
    }
    const cleanedData = { ...formData };
    cleanedData.coMakers = cleanedData.coMakers.filter(
      cm => cm.name || cm.dateSigned
    );
    try {
      navigate('/applicationFormTwo', { state: { formData: cleanedData } });
    } catch {
      alert('Failed to submit loan application. Please try again.');
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          firstName: user.first_name || '',
          middleName: user.middle_name || '',
          lastName: user.last_name || '',
          address: user.present_address || '',
          contactNumber: user.tel_cel_no || ''
        },
        membershipInfo: {
          ...prev.membershipInfo,
          policyNumber: user.policy_number || '',
          membershipDate: user.membership_date
            ? new Date(user.membership_date).toISOString().split('T')[0]
            : '',
          numberOfShares: user.capital || ''
        }
      }));
    }
  }, [user]);

  return (
    <Container fluid className="af-container main-content">
      <div className="af-top-bar" >
        <span className="af-top-bar-text gothic-a1-bold">
          MULTI-PURPOSE LOAN PROGRAM APPLICATION FORM
        </span>
      </div>

      <div className="af-form-card formcard shadow-lg p-4 mb-5 bg-white rounded" style={{ width: '1200px', maxWidth: '970px' }}>
        <div className="af-card-body card-body scrollable-form">
          <form onSubmit={handleSubmit} className="af-form">

            {/* Row 1 */}
            <Row className="af-row mb-3">
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="firstName" className="form-label gothic-a1-bold" style={{ textAlign: 'left' }}>First Name</label>
                <input
                  type="text"
                  className="form-control af-input"
                  id="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={e => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="middleName" className="form-label gothic-a1-bold">Middle Name</label>
                <input
                  type="text"
                  className="form-control af-input"
                  id="middleName"
                  value={formData.personalInfo.middleName}
                  onChange={e => handleInputChange('personalInfo', 'middleName', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="lastName" className="form-label gothic-a1-bold">Last Name</label>
                <input
                  type="text"
                  className="form-control af-input"
                  id="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={e => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  required
                />
              </Col>
            </Row>

            {/* Row 2 */}
            <Row className="af-row mb-3">
              <Col xs={12} md={8} className="af-col">
                <label htmlFor="address" className="form-label gothic-a1-bold">Address</label>
                <input
                  type="text"
                  className="form-control af-input"
                  id="address"
                  value={formData.personalInfo.address}
                  onChange={e => handleInputChange('personalInfo', 'address', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4} className="af-col">
                <label className="form-label gothic-a1-bold">Policy Number</label>
                <div className="form-control af-static-field" style={{ backgroundColor: '#e9ecef', height: '38px' }}>
                  {formData.membershipInfo.policyNumber}
                </div>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row className="af-row mb-3">
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="contactNumber" className="form-label gothic-a1-bold">Contact Number</label>
                <input
                  type="tel"
                  className="form-control af-input"
                  id="contactNumber"
                  value={formData.personalInfo.contactNumber}
                  onChange={e => handleInputChange('personalInfo', 'contactNumber', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="membershipType" className="form-label gothic-a1-bold">Membership Type</label>
                <input
                  type="text"
                  className="form-control af-input"
                  id="membershipType"
                  value={formData.membershipInfo.membershipType}
                  onChange={e => handleInputChange('membershipInfo', 'membershipType', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="membershipDate" className="form-label gothic-a1-bold">Membership Date</label>
                <input
                  type="date"
                  className="form-control af-input"
                  id="membershipDate"
                  value={formData.membershipInfo.membershipDate}
                  onChange={e => handleInputChange('membershipInfo', 'membershipDate', e.target.value)}
                  required
                />
              </Col>
            </Row>

            {/* Row 4 */}
            <Row className="af-row mb-3">
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="numberOfShares" className="form-label gothic-a1-bold">Number of Shares</label>
                <input
                  type="number"
                  className="form-control af-input"
                  id="numberOfShares"
                  value={formData.membershipInfo.numberOfShares}
                  onChange={e => handleInputChange('membershipInfo', 'numberOfShares', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="purpose" className="form-label gothic-a1-bold">Loan Purpose</label>
                <input
                  type="text"
                  className="form-control af-input"
                  id="purpose"
                  value={formData.loanInfo.purpose}
                  onChange={e => handleInputChange('loanInfo', 'purpose', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4} className="af-col">
                <label htmlFor="amount" className="form-label gothic-a1-bold">Loan Amount</label>
                <input
                  type="number"
                  className="form-control af-input"
                  id="amount"
                  value={formData.loanInfo.amount}
                  onChange={e => handleInputChange('loanInfo', 'amount', e.target.value)}
                  required
                />
                {warning && (
                  <div style={{ color: 'red', fontWeight: 'bold', marginTop: '5px' }}>{warning}</div>
                )}
              </Col>
            </Row>

            {/* Row 5: Payment Terms */}
            <Row className="af-row mb-3">
              <Col className="af-col">
                <label className="form-label gothic-a1-bold">Payment Terms</label>
                <select
                  className="form-select af-input"
                  value={formData.loanInfo.paymentTerms}
                  onChange={(e) => handleInputChange('loanInfo', 'paymentTerms', e.target.value)}
                >
                  <option value="">Select Payment Term</option>
                  {[...Array(12)].map((_, i) => {
                    const month = (i + 1).toString();
                    return (
                      <option key={month} value={month}>
                        {month} {month === "1" ? 'month' : 'months'}
                      </option>
                    );
                  })}
                </select>
              </Col>
            </Row>



            {/* Row 6: Date Signed */}
            <Row className="af-row mb-4 af-date-signed-row">
              <Col xs={12} md={4} className="af-col ms-auto">
                <label htmlFor="dateSigned" className="form-label gothic-a1-bold">Date Signed</label>
                <input
                  type="date"
                  id="dateSigned"
                  className="form-control af-input"
                  value={formData.loanInfo.dateSigned}
                  onChange={e => handleInputChange('loanInfo', 'dateSigned', e.target.value)}
                  required
                />
              </Col>
            </Row>

            {/* Co-Makers Section */}
            <h5 className="af-heading co-maker-heading mb-3 gothic-a1-bold">Co-Makers (optional)</h5>
            {formData.coMakers.map((cm, idx) => (
              <Row key={idx} className="af-row mb-3 co-maker-row">
                <Col xs={12} md={6} className="af-col">
                  <label htmlFor={`coMakerName${idx}`} className="form-label af-label">Name</label>
                  <input
                    type="text"
                    id={`coMakerName${idx}`}
                    className="form-control af-input"
                    value={cm.name}
                    onChange={e => handleCoMakerChange(idx, 'name', e.target.value)}
                  />
                </Col>
                <Col xs={12} md={6} className="af-col">
                  <label htmlFor={`coMakerDate${idx}`} className="form-label af-label">Date Signed</label>
                  <input
                    type="date"
                    id={`coMakerDate${idx}`}
                    className="form-control af-input"
                    value={cm.dateSigned}
                    onChange={e => handleCoMakerChange(idx, 'dateSigned', e.target.value)}
                  />
                </Col>
              </Row>
            ))}

            {/* Officers Use Only */}
            <h4 className="af-heading officers-use-heading text-center gothic-a1-bold" style={{ fontSize: '20px', paddingTop: '40px' }}>
              FOR MHSTEMPC OFFICERS' USE ONLY
            </h4>
            <h4 className="af-heading approved-by-heading mb-5 gothic-a1-bold" style={{ fontSize: '20px', textAlign: 'left' }}>Approved By:</h4>
            <Row className="af-row officers-row mb-4">
              {/* Credit Committee Chairperson */}
              <Col xs={12} md={6} className="af-col officer-col mb-4">
                <div className="text-center">
                  <label className="ccform-label gothic-a1-bold mb-3" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Credit Committee Chairperson
                  </label>
                  <div className="gothic-a1-bold"
                    style={{
                      border: '2px solid #002d62',
                      minHeight: '50px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}>
                    RIZALYN S. SANTOS
                  </div>
                </div>
              </Col>

              {/* Treasurer */}
              <Col xs={12} md={6} className="af-col officer-col mb-4">
                <div className="text-center">
                  <label className="ccform-label gothic-a1-bold mb-3" style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
                    Treasurer
                  </label>
                  <div className="gothic-a1-bold"
                    style={{
                      border: '2px solid #002d62',
                      minHeight: '50px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                    TERESITA M. VILLARUEL
                  </div>
                </div>
              </Col>
            </Row>

            {/* Chairman */}
            <Row className="af-row officers-row mb-4">
              <Col xs={12} md={6} className="af-col officer-col mx-auto">
                <div className="text-center">
                  <label className="ccform-label gothic-a1-bold mb-3" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Chairman
                  </label>
                  <div className="gothic-a1-bold"
                    style={{
                      border: '2px solid #002d62',
                      minHeight: '50px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                    HELEN M. AQUINO
                  </div>
                </div>
              </Col>
            </Row>

            {/* Cancel & Next Buttons */}
            <div className="af-actions mt-4 d-flex justify-content-end gap-2">
              <button
                type="button"
                className="savebtn btn-secondary af-btn-cancel gothic-a1-bold"
                onClick={() => navigate(-1)}
                style={{ color: '#002d62', backgroundColor: '#ffffff', borderColor: '#002d62', borderRadius: '20px', height: '45px', width: '100px' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cancelbtn btn-primary af-btn-next gothic-a1-bold"
                style={{ backgroundColor: '#002d62', color: '#ffffff', borderRadius: '20px', height: '45px', width: '100px' }}
              >
                Next
              </button>
            </div>

          </form>
        </div>
      </div>
    </Container>
  );
};

export default ApplicationForm;