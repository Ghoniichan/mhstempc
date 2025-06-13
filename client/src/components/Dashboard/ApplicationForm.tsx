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

  coMaker?: {
    name: string;
    dateSigned: string;
  };

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
  }
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({user}) => {
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
      membershipDate: user.membership_date ? new Date(user.membership_date).toISOString().split('T')[0] : '',
      numberOfShares: ''
    },

    loanInfo: {
      purpose: '',
      amount: '',
      paymentTerms: '',
      otherPaymentTerms: '',
      dateSigned: ''
    },

    coMaker: {
      name: '',
      dateSigned: ''
    },
    submissionDate: new Date().toISOString()
  });

  const handleInputChange = (
    field: string,
    value: string,
    section?: keyof FormData
  ) => {
    setFormData(prev => {
      if (section && section !== 'submissionDate') {
        // Type assertion to ensure we're working with object sections
        const currentSection = prev[section] as Record<string, string>;
        
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [field]: value
          }
        };
      }

      // Handle direct field updates (like submissionDate)
      return {
        ...prev,
        [field]: value
      } as FormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = { ...formData };
    if (!cleanedData.coMaker?.name && !cleanedData.coMaker?.dateSigned) {
      delete cleanedData.coMaker;
    }

    // Output JSON to console (you can modify this to send to your API)
    console.log('Form Data JSON:', JSON.stringify(cleanedData, null, 2));

    // Here you can send the cleanedData to your API endpoint
    try {
      const response = await axios.post('/api/loans/new', cleanedData);
      console.log('Loan application submitted successfully:', response.data);
      navigate('/applicationFormTwo');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      // You can add error handling UI here, like showing an alert or error message
      alert('Failed to submit loan application. Please try again.');
    }

    // Store it in memory instead of localStorage for Claude artifacts
    // localStorage.setItem('loanApplicationData', JSON.stringify(cleanedData));
    
    // Call the onNext function and navigate
    // onNext();
    navigate('/applicationFormTwo');
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
        membershipDate: user.membership_date ? new Date(user.membership_date).toISOString().split('T')[0] : ''
      }
    }));
  }
}, [user]);

  return (
    <Container fluid className="py-3 main-content">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={9} xl={8}>
          <div className="top-bar">
            <span className="top-bar-text gothic-a1-bold">
              MULTI-PURPOSE LOAN PROGRAM APPLICATION FORM
            </span>
          </div>

          <div className="card shadow-lg p-4 mb-5 bg-white rounded" style={{width: '1200px', maxWidth: '970px'}}>
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
                      onChange={(e) => handleInputChange('firstName', e.target.value, 'personalInfo')}
                      required />
                  </Col>

                  <Col xs={12} md={4}>
                    <label htmlFor="middleName" className="form-label gothic-a1-bold">Middle Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="middleName" 
                      value={formData.personalInfo.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value, 'personalInfo')}
                      required />
                  </Col>

                  <Col xs={12} md={4}>
                    <label htmlFor="lastName" className="form-label gothic-a1-bold">Last Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lastName" 
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value, 'personalInfo')}
                      required />
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
                      onChange={(e) => handleInputChange('address', e.target.value, 'personalInfo')}
                      style={{width: '900px', maxWidth: '585px'}} 
                      required />
                  </Col>

                    <Col xs={12} md={4}>
                    <label htmlFor="policyNumber" className="form-label gothic-a1-bold">MHSTEMPC Policy Number</label>
                    <div 
                      className="form-control"
                      style={{ 
                      border: '1px solid #ced4da',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '0.25rem',
                      minHeight: '38px'
                      }}
                    >
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
                      onChange={(e) => handleInputChange('contactNumber', e.target.value, 'personalInfo')}
                      required />
                  </Col>

                  <Col xs={12} md={4}>
                    <label htmlFor="membershipType" className="form-label gothic-a1-bold">Type of Membership</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="membershipType" 
                      value={formData.membershipInfo.membershipType}
                      onChange={(e) => handleInputChange('membershipType', e.target.value, 'membershipInfo')}
                      required />
                  </Col>

                  <Col xs={12} md={4}>
                    <label htmlFor="membershipDate" className="form-label gothic-a1-bold">Date of Membership</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="membershipDate" 
                      value={formData.membershipInfo.membershipDate}
                      onChange={(e) => handleInputChange('membershipDate', e.target.value, 'membershipInfo')}
                      required />
                  </Col>
                </Row>

                {/* Row 4 */}
                <Row className="mb-3">
                  <Col xs={12} md={4}>
                    <label htmlFor="shareNumber" className="form-label gothic-a1-bold">Number of Shares</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="shareNumber" 
                      value={formData.membershipInfo.numberOfShares}
                      onChange={(e) => handleInputChange('numberOfShares', e.target.value, 'membershipInfo')}
                      required />
                  </Col>

                  <Col xs={12} md={4}>
                    <label htmlFor="loanPurpose" className="form-label gothic-a1-bold">Purpose of Loan</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="loanPurpose" 
                      value={formData.loanInfo.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value, 'loanInfo')}
                      required />
                  </Col>

                  <Col xs={12} md={4}>
                    <label htmlFor="loanAmount" className="form-label gothic-a1-bold">Amount of Loan</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="loanAmount" 
                      value={formData.loanInfo.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value, 'loanInfo')}
                      required />
                  </Col>
                </Row>

                {/* Row 5 */}
                <Row className="mb-3">
                  <Col xs={12}>
                    <label className="form-label gothic-a1-bold mb-2">Terms of Payment</label>
                    <Row className="gx-2 gy-2 align-items-end payment-terms-row">
                      
                      <Col xs={12} sm={2}>
                        <div className="d-flex align-items-center">
                          <input 
                            type="radio" 
                            id="sixMonths" 
                            name="paymentTerms" 
                            value="sixMonths" 
                            className="form-check-input me-2" 
                            checked={formData.loanInfo.paymentTerms === 'sixMonths'}
                            onChange={(e) => handleInputChange('paymentTerms', e.target.value, 'loanInfo')}
                            required />
                          <label htmlFor="sixMonths" className="form-check-label gothic-a1-bold mb-0">6 months</label>
                        </div>
                      </Col>

                      <Col xs={12} sm={2}>
                        <div className="d-flex align-items-center">
                          <input 
                            type="radio" 
                            id="threeMonths" 
                            name="paymentTerms" 
                            value="threeMonths" 
                            className="form-check-input me-2" 
                            checked={formData.loanInfo.paymentTerms === 'threeMonths'}
                            onChange={(e) => handleInputChange('paymentTerms', e.target.value, 'loanInfo')}
                            required />
                          <label htmlFor="threeMonths" className="form-check-label gothic-a1-bold mb-0">3 months</label>
                        </div>
                      </Col>

                      <Col xs={12} sm={8}>
                        <div className="d-flex align-items-center gap-2">
                          <input 
                            type="radio" 
                            id="others" 
                            name="paymentTerms" 
                            value="others" 
                            className="form-check-input" 
                            checked={formData.loanInfo.paymentTerms === 'others'}
                            onChange={(e) => handleInputChange('paymentTerms', e.target.value, 'loanInfo')}
                            required />

                          <label htmlFor="others" className="form-check-label gothic-a1-bold mb-0">Others:</label>
                          <input 
                            type="text" 
                            className="form-control flex-grow-1" 
                            id="otherPaymentTerms" 
                            placeholder="Specify" 
                            style={{maxWidth: '200px'}}
                            value={formData.loanInfo.otherPaymentTerms || ''}
                            onChange={(e) => handleInputChange('otherPaymentTerms', e.target.value, 'loanInfo')}
                            disabled={formData.loanInfo.paymentTerms !== 'others'}
                             />
                        </div>
                      </Col>

                    </Row>
                  </Col>
                </Row>

                {/* Row 6 */}
                <Row className="mb-5">
                  <Col xs={12} md={4} className="ms-auto">
                    <label htmlFor="signDate" className="form-label gothic-a1-bold">Date Signed</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="signDate" 
                      value={formData.loanInfo.dateSigned}
                      onChange={(e) => handleInputChange('dateSigned', e.target.value, 'loanInfo')}
                      required />
                  </Col>
                </Row>

                {/* Co-Maker Section */}
                <h5 className="card-title mb-4">Co-Makers: <span className="text-muted" style={{ fontSize: "0.9rem" }}>(optional)</span></h5>
                <p className="card-text mb-4 gothic-a1-regular">
                  We agreed and understand that if the borrower whose name appears above was unable to pay for three consecutive months, we will surrender our client ATM card (where we obtain our salary) to MHSTEMPC to deduct payments for the loan involved.
                </p>

                <Row className="mb-5">
                  <Col xs={12} md={6}>
                    <label htmlFor="comakerName" className="form-label gothic-a1-bold">Co-Makers Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="comakerName" 
                      style={{width: '450px', maxWidth: '500px'}}
                      value={formData.coMaker?.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value, 'coMaker')}
                      />
                  </Col>

                  <Col xs={12} md={6}>
                    <label htmlFor="comakerSignDate" className="form-label gothic-a1-bold">Date Signed</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="comakerSignDate" 
                      style={{width: '430px', maxWidth: '500px'}} 
                      value={formData.coMaker?.dateSigned || ''}
                      onChange={(e) => handleInputChange('dateSigned', e.target.value, 'coMaker')}
                      />
                  </Col>
                </Row>

                {/* Officer Use Section */}
                <h4 className="card-title mb-5 text-center gothic-a1-bold" style={{ fontSize: '20px' }}>
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

                {/* Submit Button */}
                <div className="mt-4 d-flex">
                  <button 
                    type="submit" 
                    className="btn btn-primary px-5 ms-auto gothic-a1-bold" 
                    style={{ backgroundColor: '#002d62' }}
                  >
                    Next
                  </button>

                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationForm;