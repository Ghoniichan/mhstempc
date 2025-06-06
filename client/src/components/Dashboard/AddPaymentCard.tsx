import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AddPaymentCard.css';
import { useNavigate } from 'react-router-dom';

interface PaymentFormData {
    fullName: string;
    dateIssued: {
        month: string;
        day: string;
        year: string;
    };
    accountID: string;
    collectedBy: string;
    loanId: string;
    loanAmount: string;
    submissionTimestamp: string;
}

interface ValidationErrors {
    fullName?: string;
    dateIssued?: string;
    accountID?: string;
    collectedBy?: string;
    loanId?: string;
    loanAmount?: string;
}

const AddPaymentCard: React.FC = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<PaymentFormData>({
        fullName: '',
        dateIssued: {
            month: '',
            day: '',
            year: ''
        },
        accountID: '',
        collectedBy: '',
        loanId: '',
        loanAmount: '',
        submissionTimestamp: ''
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleInputChange = (field: keyof Omit<PaymentFormData, 'dateIssued' | 'submissionTimestamp'>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({
                ...prev,
                [field]: e.target.value
            }));
            // Clear error when user starts typing
            if (errors[field]) {
                setErrors(prev => ({
                    ...prev,
                    [field]: undefined
                }));
            }
        };

    // Handle date changes
    const handleDateChange = (field: keyof PaymentFormData['dateIssued']) => 
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData(prev => ({
                ...prev,
                dateIssued: {
                    ...prev.dateIssued,
                    [field]: e.target.value
                }
            }));
            // Clear date error when user selects
            if (errors.dateIssued) {
                setErrors(prev => ({
                    ...prev,
                    dateIssued: undefined
                }));
            }
        };

    // Validation functions
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

    // Validate all fields
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        newErrors.fullName = validateFullName(formData.fullName);
        newErrors.dateIssued = validateDate(formData.dateIssued);
        newErrors.accountID = validateAccountID(formData.accountID);
        newErrors.collectedBy = validateCollectedBy(formData.collectedBy);
        newErrors.loanId = validateLoanId(formData.loanId);
        newErrors.loanAmount = validateLoanAmount(formData.loanAmount);

        setErrors(newErrors);

        // Return true if no errors
        return !Object.values(newErrors).some(error => error !== undefined);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            // Add submission timestamp
            const finalFormData: PaymentFormData = {
                ...formData,
                submissionTimestamp: new Date().toISOString()
            };

            // Generate JSON output
            const jsonOutput = JSON.stringify(finalFormData, null, 2);
            
            // Log JSON to console (for development)
            console.log('Payment Form Data JSON:', jsonOutput);
            
            // Show success message with JSON (remove in production)
            alert(`Payment saved successfully!\n\nJSON Output:\n${jsonOutput}`);
            
            // Here you would typically send to your API
            // await savePaymentToAPI(finalFormData);
            
            // Navigate to payment page
            navigate('/payment');
            
        } catch (error) {
            console.error('Error saving payment:', error);
            alert('Error saving payment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/payment');
    };

    return (
        <Container fluid className="add-payment-container py-5">
            <Row className="justify-content-center">
                <Col xs={12}>
                    <div className="form-wrapper">
                        {/* Card with Top Bar Integrated */}
                        <div className="card shadow-lg mb-5 apc-card">
                            {/* Top Bar */}
                            <div className="top-bar">
                                <span className="top-bar-text gothic-a1-bold">Add New Payment</span>
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
                                            <label htmlFor="accountID" className="form-label gothic-a1-bold">Account ID</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.accountID ? 'is-invalid' : ''}`}
                                                id="accountID" 
                                                placeholder='Account ID' 
                                                value={formData.accountID}
                                                onChange={handleInputChange('accountID')}
                                                required  
                                            />
                                            {errors.accountID && (
                                                <div className="invalid-feedback">{errors.accountID}</div>
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