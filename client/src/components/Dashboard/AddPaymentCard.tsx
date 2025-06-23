/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AddPaymentCard.tsx
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AddPaymentCard.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';

interface PaymentFormData {
  fullName: string;
  dateIssued: { month: string; day: string; year: string };
  policyNum: string;
  collectedBy: string;
  loanId: string;
  loanAmount: string;
  submissionTimestamp: string;
}

interface ValidationErrors {
  fullName?: string;
  dateIssued?: string;
  policyNum?: string;
  collectedBy?: string;
  loanId?: string;
  loanAmount?: string;
}

type PolicyNumberFormProps = {
  policyNumber: string;
  setPolicyNumber: (value: string) => void;
  onSubmit: (policyNumber: string) => void;
};

const PolicyNumberForm: React.FC<PolicyNumberFormProps> = ({
  policyNumber,
  setPolicyNumber,
  onSubmit,
}) => {
  const [localPolicyNumber, setLocalPolicyNumber] = useState(policyNumber);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setValidationError('');
    if (localPolicyNumber.trim()) {
      setPolicyNumber(localPolicyNumber);
      onSubmit(localPolicyNumber);
    } else {
      setValidationError('Please enter a policy number');
    }
  };

  return (
  <div className="container-fluid mb-4">
    <div className="col-12 col-md-10 col-lg-8 mx-auto">
      <div className="apc-pnf-card">
        <div className="mpn-card-body p-4">
          <p className="text-muted gothic-a1-regular mb-3" style={{textAlign: 'left'}}>
            Enter MHSTEMPC Policy Number to auto-fill personal information.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="policyNumber" className="nameform-label gothic-a1-bold" style={{textAlign: 'left'}}>
                MHSTEMPC Policy Number
              </label>
              <div className="d-flex gap-2">
                <input
                  id="policyNumber"
                  type="text"
                  className={`form-control form-control-lg ${validationError ? 'is-invalid' : ''}`}
                  value={localPolicyNumber}
                  onChange={e => setLocalPolicyNumber(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-lg gothic-a1-bold"
                >
                  Enter
                </button>
              </div>
              {validationError && (
                <div className="invalid-feedback d-block">{validationError}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

};

const AddPaymentCard: React.FC = () => {
  const navigate = useNavigate();
  const [policyNumber, setPolicyNumber] = useState('');
  const [, setUserData] = useState<any>({});
  const [formData, setFormData] = useState<PaymentFormData>({
    fullName: '',
    dateIssued: { month: '', day: '', year: '' },
    policyNum: '',
    collectedBy: '',
    loanId: '',
    loanAmount: '',
    submissionTimestamp: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'MHSTEMPC | Add Payment';
  }, []);

  const handlePolicyNumberSubmit = async (pn: string) => {
    try {
      const resp = await axios.get(`/api/user/${pn}`);
      if (resp.data) {
        setUserData(resp.data);
        const fullName = `${resp.data.last_name || ''}, ${resp.data.first_name || ''}`.trim();
        setFormData(prev => ({ ...prev, fullName, policyNum: pn }));
      } else {
        setErrors(prev => ({ ...prev, policyNum: 'No data for that policy' }));
      }
    } catch {
      setErrors(prev => ({ ...prev, policyNum: 'Invalid policy number' }));
    }
  };

  const handleInputChange =
    (field: keyof Omit<PaymentFormData, 'dateIssued' | 'submissionTimestamp'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleDateChange =
    (fld: keyof PaymentFormData['dateIssued']) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFormData(prev => ({
        ...prev,
        dateIssued: { ...prev.dateIssued, [fld]: e.target.value },
      }));
      setErrors(prev => ({ ...prev, dateIssued: undefined }));
    };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const validate = (): boolean => {
    const newErrs: ValidationErrors = {};
    if (!formData.fullName.trim()) newErrs.fullName = 'Required';
    if (!formData.dateIssued.month || !formData.dateIssued.day || !formData.dateIssued.year)
      newErrs.dateIssued = 'Complete date';
    if (!formData.policyNum.trim()) newErrs.policyNum = 'Required';
    if (!formData.collectedBy.trim()) newErrs.collectedBy = 'Required';
    if (!formData.loanId.trim()) newErrs.loanId = 'Required';
    if (!formData.loanAmount.trim()) newErrs.loanAmount = 'Required';
    setErrors(newErrs);
    return Object.keys(newErrs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const final = { ...formData, submissionTimestamp: new Date().toISOString() };
      console.log(JSON.stringify(final, null, 2));
      alert('Saved');
      navigate('/payment');
    } catch {
      alert('Error saving');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-payment-card-wrapper">
      <Container fluid className="add-payment-container py-5">
        <Row className="justify-content-center">
          <Col xs={12}>
            <PolicyNumberForm
              policyNumber={policyNumber}
              setPolicyNumber={setPolicyNumber}
              onSubmit={handlePolicyNumberSubmit}
            />
            <div className="apc-card card shadow-lg mb-5">
              <div className="paymenttop-bar">
                <span className="top-bar-text gothic-a1-bold">Add New Payment</span>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6}>
                      <div className="inline-form-group">
                        <label htmlFor="fullName" className="form-label gothic-a1-bold">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                          placeholder="Surname, First Name"
                          value={formData.fullName}
                          onChange={handleInputChange('fullName')}
                          onKeyDown={handleKeyDown}
                          required
                        />
                      </div>
                      {errors.fullName && (
                        <div className="invalid-feedback">{errors.fullName}</div>
                      )}
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="inline-form-group">
                        <label htmlFor="dateIssued" className="form-label gothic-a1-bold">
                          Date Issued
                        </label>
                        <div className="date-select">
                          {(['month', 'day', 'year'] as const).map(field => (
                            <select
                              key={field}
                              className={`form-select ${
                                errors.dateIssued ? 'is-invalid' : ''
                              }`}
                              value={formData.dateIssued[field]}
                              onChange={handleDateChange(field)}
                              style={{ width: '112px' }}
                              onKeyDown={handleKeyDown}
                              required
                            >
                              <option value="">{field.toUpperCase()}</option>
                              {field === 'month'
                                ? [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                  ].map(m => (
                                    <option key={m} value={m}>
                                      {m}
                                    </option>
                                  ))
                                : Array.from(
                                    { length: field === 'year' ? 96 : 31 },
                                    (_, i) => (field === 'year' ? 1930 + i : i + 1)
                                  ).map(val => (
                                    <option key={val} value={val}>
                                      {val}
                                    </option>
                                  ))}
                            </select>
                          ))}
                        </div>
                      </div>
                      {errors.dateIssued && (
                        <div className="invalid-feedback d-block">
                          {errors.dateIssued}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col xs={12} md={6}>
                      <div className="inline-form-group">
                        <label htmlFor="policyNum" className="form-label gothic-a1-bold">
                          Policy No.
                        </label>
                        <input
                          id="policyNum"
                          type="text"
                          className={`form-control ${errors.policyNum ? 'is-invalid' : ''}`}
                          value={formData.policyNum}
                          onChange={handleInputChange('policyNum')}
                          required
                        />
                      </div>
                      {errors.policyNum && (
                        <div className="invalid-feedback">{errors.policyNum}</div>
                      )}
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="inline-form-group">
                        <label htmlFor="collectedBy" className="form-label gothic-a1-bold">
                          Collected By
                        </label>
                        <input
                          id="collectedBy"
                          type="text"
                          className={`form-control ${
                            errors.collectedBy ? 'is-invalid' : ''
                          }`}
                          value={formData.collectedBy}
                          onChange={handleInputChange('collectedBy')}
                          required
                        />
                      </div>
                      {errors.collectedBy && (
                        <div className="invalid-feedback">{errors.collectedBy}</div>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col xs={12}>
                      <div className="inline-form-group">
                        <label htmlFor="loanId" className="form-label gothic-a1-bold">
                          Loan ID
                        </label>
                        <input
                          id="loanId"
                          type="text"
                          className={`form-control ${errors.loanId ? 'is-invalid' : ''}`}
                          value={formData.loanId}
                          style={{width: '100%', maxWidth: '350px'}}
                          onChange={handleInputChange('loanId')}
                          required
                        />
                      </div>
                      {errors.loanId && (
                        <div className="invalid-feedback">{errors.loanId}</div>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col xs={12}>
                      <div className="inline-form-group">
                        <label htmlFor="loanAmount" className="form-label gothic-a1-bold">
                          Loan Amount
                        </label>
                        <input
                          id="loanAmount"
                          type="text"
                          className={`form-control ${errors.loanAmount ? 'is-invalid' : ''}`}
                          value={formData.loanAmount}
                          style={{width: '100%', maxWidth: '350px'}}
                          onChange={handleInputChange('loanAmount')}
                          required
                        />
                      </div>
                      {errors.loanAmount && (
                        <div className="invalid-feedback">{errors.loanAmount}</div>
                      )}
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2 gotham-a1-bold"
                      onClick={() => navigate('/payment')}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary gothic-a1-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving…' : 'Save Payment'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPaymentCard;
