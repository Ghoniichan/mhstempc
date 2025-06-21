import React, { useEffect, useState } from 'react';
import './ApplicationForm.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';

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
      numberOfShares: ''
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

  useEffect(() => {
    document.title = 'MHSTEMPC | Loan Application';
  }, []);

  const handleInputChange = (
    section: keyof Omit<FormData, 'coMakers' | 'submissionDate'>,
    field: string,
    value: string
  ) => {
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
    const cleanedData = { ...formData };
    cleanedData.coMakers = cleanedData.coMakers.filter(
      cm => cm.name || cm.dateSigned
    );

    try {
      await axios.post('/api/loans/new', cleanedData);
      navigate('/applicationFormTwo');
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
            : ''
        }
      }));
    }
  }, [user]);

  return (
    <Container fluid className="py-1 main-content">
      <div className="top-bar">
        <span className="top-bar-text gothic-a1-bold">
          MULTI-PURPOSE LOAN PROGRAM APPLICATION FORM
        </span>
      </div>

      <div className="formcard shadow-lg p-4 mb-5 bg-white rounded" style={{ width: '1200px', maxWidth: '970px' }}>
        <div className="card-body scrollable-form">
          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <label htmlFor="firstName" className="form-label gothic-a1-bold">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={e => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label htmlFor="middleName" className="form-label gothic-a1-bold">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  value={formData.personalInfo.middleName}
                  onChange={e => handleInputChange('personalInfo', 'middleName', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label htmlFor="lastName" className="form-label gothic-a1-bold">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={e => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  required
                />
              </Col>
            </Row>

            {/* Row 2 */}
            <Row className="mb-3">
              <Col xs={12} md={8}>
                <label htmlFor="address" className="form-label gothic-a1-bold">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={formData.personalInfo.address}
                  onChange={e => handleInputChange('personalInfo', 'address', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label className="form-label gothic-a1-bold">Policy Number</label>
                <div className="form-control" style={{ backgroundColor: '#e9ecef', height: '38px' }}>
                  {formData.membershipInfo.policyNumber}
                </div>
              </Col>
            </Row>

            {/* Row 3 */}
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <label htmlFor="contactNumber" className="form-label gothic-a1-bold">Contact Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="contactNumber"
                  value={formData.personalInfo.contactNumber}
                  onChange={e => handleInputChange('personalInfo', 'contactNumber', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label htmlFor="membershipType" className="form-label gothic-a1-bold">Membership Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="membershipType"
                  value={formData.membershipInfo.membershipType}
                  onChange={e => handleInputChange('membershipInfo', 'membershipType', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label htmlFor="membershipDate" className="form-label gothic-a1-bold">Membership Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="membershipDate"
                  value={formData.membershipInfo.membershipDate}
                  onChange={e => handleInputChange('membershipInfo', 'membershipDate', e.target.value)}
                  required
                />
              </Col>
            </Row>

            {/* Row 4 */}
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <label htmlFor="numberOfShares" className="form-label gothic-a1-bold">Number of Shares</label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfShares"
                  value={formData.membershipInfo.numberOfShares}
                  onChange={e => handleInputChange('membershipInfo', 'numberOfShares', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label htmlFor="purpose" className="form-label gothic-a1-bold">Loan Purpose</label>
                <input
                  type="text"
                  className="form-control"
                  id="purpose"
                  value={formData.loanInfo.purpose}
                    onChange={e => handleInputChange('loanInfo', 'purpose', e.target.value)}
                  required
                />
              </Col>
              <Col xs={12} md={4}>
                <label htmlFor="amount" className="form-label gothic-a1-bold">Loan Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={formData.loanInfo.amount}
                  onChange={e => handleInputChange('loanInfo', 'amount', e.target.value)}
                  required
                />
              </Col>
            </Row>

            {/* Row 5 */}
            <Row className="mb-3">
              <Col>
                <label className="form-label gothic-a1-bold">Payment Terms</label>
                <Row className="align-items-center">
                  <Col xs={4}>
                    <input
                      type="radio"
                      name="paymentTerms"
                      value="sixMonths"
                      checked={formData.loanInfo.paymentTerms === 'sixMonths'}
                      onChange={e => handleInputChange('loanInfo', 'paymentTerms', e.target.value)}
                    /> 6 months
                  </Col>
                  <Col xs={4}>
                    <input
                      type="radio"
                      name="paymentTerms"
                      value="threeMonths"
                      checked={formData.loanInfo.paymentTerms === 'threeMonths'}
                      onChange={e => handleInputChange('loanInfo', 'paymentTerms', e.target.value)}
                    /> 3 months
                  </Col>
                  <Col xs={4} className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="paymentTerms"
                      value="others"
                      checked={formData.loanInfo.paymentTerms === 'others'}
                      onChange={e => handleInputChange('loanInfo', 'paymentTerms', e.target.value)}
                    /> Other
                    {formData.loanInfo.paymentTerms === 'others' && (
                      <input
                        type="text"
                        className="form-control ms-2"
                        placeholder="Specify"
                        value={formData.loanInfo.otherPaymentTerms || ''}
                        onChange={e => handleInputChange('loanInfo', 'otherPaymentTerms', e.target.value)}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* Row 6 */}
            <Row className="mb-4">
              <Col xs={12} md={4} className="ms-auto">
                <label htmlFor="dateSigned" className="form-label gothic-a1-bold">Date Signed</label>
                <input
                  type="date"
                  id="dateSigned"
                  className="form-control"
                  value={formData.loanInfo.dateSigned}
                  onChange={e => handleInputChange('loanInfo', 'dateSigned', e.target.value)}
                  required
                />
              </Col>
            </Row>

            {/* Co-Maker Section */}
            <h5 className="card-title mb-3 gothic-a1-bold">Co-Makers (optional)</h5>
            {formData.coMakers.map((cm, idx) => (
              <Row key={idx} className="mb-3">
                <Col xs={12} md={6}>
                  <label htmlFor={`coMakerName${idx}`} className="form-label">Name</label>
                  <input
                    type="text"
                    id={`coMakerName${idx}`}
                    className="form-control"
                    value={cm.name}
                    onChange={e => handleCoMakerChange(idx, 'name', e.target.value)}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <label htmlFor={`coMakerDate${idx}`} className="form-label">Date Signed</label>
                  <input
                    type="date"
                    id={`coMakerDate${idx}`}
                    className="form-control"
                    value={cm.dateSigned}
                    onChange={e => handleCoMakerChange(idx, 'dateSigned', e.target.value)}
                  />
                </Col>
              </Row>
            ))}
                

                

                {/* Officer Use Section */}
                <h4 className="card-title mb-5 text-center gothic-a1-bold" style={{ fontSize: '20px', paddingTop: '40px' }}>
                  FOR MHSTEMPC OFFICERS' USE ONLY
                </h4>
                <h4 className="card-title mb-5 gothic-a1-bold" style={{ fontSize: '20px' }}>Approved By:</h4>

                <Row className="mb-5 text-center">
                  <Col xs={12} md={4}>
                    <h5 className="gothic-a1-bold">RIZALYN S. SANTOS</h5>
                    <p className="officer-title">Credit Committee Chairperson</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <h5 className="gothic-a1-bold">TERESITA M. VILLARUEL</h5>
                    <p className="officer-title">Treasurer</p>
                  </Col>
                  <Col xs={12} md={4}>
                    <h5 className="gothic-a1-bold">HELEN M. AQUINO</h5>
                    <p className="officer-title">Chairman</p>
                  </Col>
                </Row>

                {/* Cancel & Submit Button */}
                <div className="mt-4 d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary px-5 gothic-a1-bold"
                    onClick={() => navigate(-1)} 
                    style={{color: '#002d62', backgroundColor: '#ffffff', borderColor: '#002d62'}}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary px-5 gothic-a1-bold"
                    style={{ backgroundColor: '#002d62' }}
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