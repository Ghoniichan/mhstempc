import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AddPaymentCard.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';

interface PaymentFormData {
    fullName: string;
    dateIssued: {
        month: string;
        day: string;
        year: string;
    };
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

// Policy Number Form Component
type PolicyNumberFormProps = {
    policyNumber: string;
    setPolicyNumber: (value: string) => void;
    onSubmit: (policyNumber: string) => void;
};

const PolicyNumberForm = ({ policyNumber, setPolicyNumber, onSubmit }: PolicyNumberFormProps) => {
    const [localPolicyNumber, setLocalPolicyNumber] = useState(policyNumber);
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setValidationError('');
        
        if (localPolicyNumber.trim()) {
            console.log('Policy Number submitted:', localPolicyNumber);
            setPolicyNumber(localPolicyNumber);
            onSubmit(localPolicyNumber);
        } else {
            setValidationError('Please enter a policy number');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalPolicyNumber(e.target.value);
        if (validationError) {
            setValidationError('');
        }
    };

    return (
        <div className="container-fluid mb-4">
            
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card shadow rounded-3" style={{width: '800px', maxWidth: '970px'}}>
                        <div className="card-body p-1" >
                            <div className="mb-1">
                                <p className="text-muted mb-2 gothic-a1-normal" style={{fontSize: '16px', paddingTop: '20px', paddingLeft: '20px'}}>
                                    Enter MHSTEMPC Policy Number to auto-fill personal information.
                                </p>
                            </div>
                            
                            <div style={{padding:'15px'}}>
                                <div className="mb-3">
                                    <label htmlFor="policyNumber" className="form-label gothic-a1-bold" style={{fontSize: '17px'}}>
                                        MHSTEMPC Policy Number
                                    </label>
                                    <div className="row g-2">
                                        <div className="col-12 col-sm-10">
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg ${validationError ? 'is-invalid' : ''}`}
                                                id="policyNumber"
                                                value={localPolicyNumber}
                                                onChange={handleInputChange}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSubmit(e);
                                                    }
                                                }}
                                                style={{
                                                    borderRadius: '8px',
                                                    border: '2px solid #e9ecef',
                                                    fontSize: '1rem'
                                                }}
                                            />
                                            {validationError && (
                                                <div className="invalid-feedback">{validationError}</div>
                                            )}
                                        </div>
                                        <div className="col-12 col-sm-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg w-100 fw-semibold"
                                                onClick={handleSubmit}
                                                style={{
                                                    backgroundColor: '#002d62',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                Enter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    );
};

const AddPaymentCard: React.FC = () => {
    const navigate = useNavigate();
    
    // Add policy number state
    const [policyNumber, setPolicyNumber] = useState('');
    const [, setUserData] = useState<{
        first_name?: string;
        middle_name?: string;
        last_name?: string;
        present_address?: string;
        tel_cel_no?: string;
        policy_number?: string;
        membership_date?: string;
    }>({});
    
    const [formData, setFormData] = useState<PaymentFormData>({
        fullName: '',
        dateIssued: {
            month: '',
            day: '',
            year: ''
        },
        policyNum: '',
        collectedBy: '',
        loanId: '',
        loanAmount: '',
        submissionTimestamp: ''
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePolicyNumberSubmit = async (policy_no: string) => {
        try {
            const response = await axios.get(`/api/user/${policy_no}`);
            if (response.data) {
                setUserData(response.data);
                console.log('Fetched data:', response.data);
                
                const fullName = `${response.data.last_name || ''}, ${response.data.first_name || ''} ${response.data.middle_name || ''}`.trim();
                setFormData(prev => ({
                    ...prev,
                    fullName: fullName.replace(/,\s*$/, ''),
                    policyNum: policy_no
                }));
            } else {
                console.error('No data found for the given policy number');
                setErrors(prev => ({
                    ...prev,
                    policyNum: 'No data found for the given policy number'
                }));
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setErrors(prev => ({
                ...prev,
                policyNum: 'Invalid Policy Number'
            }));
        }
    };

    const handleInputChange = (field: keyof Omit<PaymentFormData, 'dateIssued' | 'submissionTimestamp'>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({
                ...prev,
                [field]: e.target.value
            }));
            if (errors[field]) {
                setErrors(prev => ({
                    ...prev,
                    [field]: undefined
                }));
            }
        };

    const handleDateChange = (field: keyof PaymentFormData['dateIssued']) => 
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData(prev => ({
                ...prev,
                dateIssued: {
                    ...prev.dateIssued,
                    [field]: e.target.value
                }
            }));
            if (errors.dateIssued) {
                setErrors(prev => ({
                    ...prev,
                    dateIssued: undefined
                }));
            }
        };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleSubmit(e as any);
        }
    };

    // Add handleSelectKeyDown for select elements
    const handleSelectKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleSubmit(e as any);
        }
    };

    const validateFullName = (name: string): string | undefined => {
        if (!name.trim()) return 'Full name is required';
        if (name.trim().length < 2) return 'Full name must be at least 2 characters';
        if (!/^[a-zA-Z\s,.'-]+$/.test(name)) return 'Full name contains invalid characters';
        return undefined;
    };

    const validateDate = (date: PaymentFormData['dateIssued']): string | undefined => {
        if (!date.month || !date.day || !date.year) return 'Complete date is required';
        
        const selectedDate = new Date(parseInt(date.year), 
            ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December'].indexOf(date.month),
            parseInt(date.day));
        
        const today = new Date();
        if (selectedDate > today) return 'Date cannot be in the future';
        
        return undefined;
    };

    const validateAccountID = (id: string): string | undefined => {
        if (!id.trim()) return 'Account ID is required';
        if (!/^[A-Za-z0-9-_]+$/.test(id)) return 'Account ID can only contain letters, numbers, hyphens, and underscores';
        return undefined;
    };

    const validateCollectedBy = (name: string): string | undefined => {
        if (!name.trim()) return 'Collected By is required';
        if (name.trim().length < 2) return 'Collector name must be at least 2 characters';
        return undefined;
    };

    const validateLoanId = (id: string): string | undefined => {
        if (!id.trim()) return 'Loan No. is required';
        if (!/^[A-Za-z0-9-_]+$/.test(id)) return 'Loan No. can only contain letters, numbers, hyphens, and underscores';
        return undefined;
    };

    const validateLoanAmount = (amount: string): string | undefined => {
        if (!amount.trim()) return 'Loan amount is required';
        const numAmount = parseFloat(amount.replace(/[,₱\s]/g, ''));
        if (isNaN(numAmount)) return 'Please enter a valid amount';
        if (numAmount <= 0) return 'Loan amount must be greater than 0';
        if (numAmount < 3000) return 'Minimum loan amount is ₱3,000';
        return undefined;
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        newErrors.fullName = validateFullName(formData.fullName);
        newErrors.dateIssued = validateDate(formData.dateIssued);
        newErrors.policyNum = validateAccountID(formData.policyNum);
        newErrors.collectedBy = validateCollectedBy(formData.collectedBy);
        newErrors.loanId = validateLoanId(formData.loanId);
        newErrors.loanAmount = validateLoanAmount(formData.loanAmount);

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const finalFormData: PaymentFormData = {
                ...formData,
                submissionTimestamp: new Date().toISOString()
            };

            const jsonOutput = JSON.stringify(finalFormData, null, 2);
            console.log('Payment Form Data JSON:', jsonOutput);
            alert(`Payment saved successfully!\n\nJSON Output:\n${jsonOutput}`);
            navigate('/payment');
            
        } catch (error) {
            console.error('Error saving payment:', error);
            alert('Error saving payment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/payment');
    };

    useEffect(() => {
        document.title = "MHSTEMPC | Add Payment";
    }, []);

    return (
        <Container fluid className="add-payment-container py-5">
            <Row className="justify-content-center">
                <Col xs={12}>
                    <div className="form-wrapper">
                        {/* Policy Number Form */}
                        <PolicyNumberForm
                            policyNumber={policyNumber}
                            setPolicyNumber={setPolicyNumber}
                            onSubmit={handlePolicyNumberSubmit}
                        />

                        {/* Card with Top Bar Integrated */}
                        <div className="card shadow-lg mb-5 apc-card">
                            {/* Top Bar */}
                            <div className="top-bar">
                                <span className="paymenttop-bar-text gothic-a1-bold">Add New Payment</span>
                            </div>

                            {/* Card Body */}
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Row 1: Full Name & Date Issued */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={6}>
                                            <label htmlFor="fullName" className="form-label gothic-a1-bold">Full Name</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                                id="fullName" 
                                                placeholder="Surname, First Name, M.I., Suffix" 
                                                value={formData.fullName}
                                                onChange={handleInputChange('fullName')}
                                                onKeyDown={handleKeyDown}
                                                required 
                                            />
                                            {errors.fullName && (
                                                <div className="invalid-feedback">{errors.fullName}</div>
                                            )}
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <label htmlFor="dateIssued" className="form-label gothic-a1-bold">Date Issued</label>
                                            <div className="date-select d-flex gap-2">
                                                <select 
                                                    className={`form-select ${errors.dateIssued ? 'is-invalid' : ''}`}
                                                    id="month" 
                                                    value={formData.dateIssued.month}
                                                    onChange={handleDateChange('month')}
                                                    onKeyDown={handleSelectKeyDown}
                                                    required
                                                >
                                                    <option value="">Month</option>
                                                    {[
                                                        'January', 'February', 'March', 'April',
                                                        'May', 'June', 'July', 'August',
                                                        'September', 'October', 'November', 'December'
                                                    ].map((month, index) => (
                                                        <option key={index} value={month}>{month}</option>
                                                    ))}
                                                </select>
                                                <select 
                                                    className={`form-select ${errors.dateIssued ? 'is-invalid' : ''}`}
                                                    id="day" 
                                                    value={formData.dateIssued.day}
                                                    onChange={handleDateChange('day')}
                                                    onKeyDown={handleSelectKeyDown}
                                                    required
                                                >
                                                    <option value="">Day</option>
                                                    {Array.from({ length: 31 }, (_, i) => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                                <select 
                                                    className={`form-select ${errors.dateIssued ? 'is-invalid' : ''}`}
                                                    id="year" 
                                                    value={formData.dateIssued.year}
                                                    onChange={handleDateChange('year')}
                                                    onKeyDown={handleSelectKeyDown}
                                                    required
                                                >
                                                    <option value="">Year</option>
                                                    {Array.from({ length: 96 }, (_, i) => (
                                                        <option key={1930 + i} value={1930 + i}>{1930 + i}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.dateIssued && (
                                                <div className="invalid-feedback d-block">{errors.dateIssued}</div>
                                            )}
                                        </Col>
                                    </Row>

                                    {/* Row 2: Account ID & Collected By */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={6}>
                                            <label htmlFor="policyNum" className="form-label gothic-a1-bold">MHSTEMPC Policy Number</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.policyNum ? 'is-invalid' : ''}`}
                                                id="accountID" 
                                                placeholder='MHSTEMPC Policy Number' 
                                                value={formData.policyNum}
                                                onChange={handleInputChange('policyNum')}
                                                onKeyDown={handleKeyDown}
                                                required  
                                            />
                                            {errors.policyNum && (
                                                <div className="invalid-feedback">{errors.policyNum}</div>
                                            )}
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <label htmlFor="collectedBy" className="form-label gothic-a1-bold">Collected By</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.collectedBy ? 'is-invalid' : ''}`}
                                                id="collectedBy" 
                                                placeholder='Collected By' 
                                                value={formData.collectedBy}
                                                onChange={handleInputChange('collectedBy')}
                                                onKeyDown={handleKeyDown}
                                                required 
                                            />
                                            {errors.collectedBy && (
                                                <div className="invalid-feedback">{errors.collectedBy}</div>
                                            )}
                                        </Col>
                                    </Row>

                                    {/* Row 3: Loan ID */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="loanId" className="form-label gothic-a1-bold">Loan No.</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.loanId ? 'is-invalid' : ''}`}
                                                id="loanId" 
                                                placeholder='Loan No.' 
                                                value={formData.loanId}
                                                onChange={handleInputChange('loanId')}
                                                onKeyDown={handleKeyDown}
                                                style={{width: '365px'}}
                                                required 
                                            />
                                            {errors.loanId && (
                                                <div className="invalid-feedback">{errors.loanId}</div>
                                            )}
                                        </Col>
                                    </Row>

                                    {/* Row 4: Loan Amount */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="loanAmount" className="form-label gothic-a1-bold">Loan Amount</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.loanAmount ? 'is-invalid' : ''}`}
                                                id="loanAmount" 
                                                placeholder='Loan Amount'
                                                value={formData.loanAmount}
                                                onChange={handleInputChange('loanAmount')}
                                                onKeyDown={handleKeyDown}
                                                style={{width: '365px'}}
                                                required 
                                            />
                                            {errors.loanAmount && (
                                                <div className="invalid-feedback">{errors.loanAmount}</div>
                                            )}
                                        </Col>
                                    </Row>

                                    {/* Buttons */}
                                    <div className="mt-4 d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary px-4 me-2 gothic-a1-bold"
                                            style={{ color: '#002d62', backgroundColor: 'white' }}
                                            onClick={handleCancel}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4 gothic-a1-bold"
                                            style={{ backgroundColor: '#002d62' }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Saving...' : 'Save Payment'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPaymentCard;