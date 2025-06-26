import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MembershipForm.css';
import axios from '../../api/axiosInstance.ts';

interface MembershipFormProps {
    onNext: () => void;
}

type Beneficiary = { name: string; percentage: string };
type Employment = { employerName: string; employmentDate: string; telCelNo: string };

const MembershipForm: React.FC<MembershipFormProps> = ({ onNext }) => {
    const [formData, setFormData] = useState({
        userInfo: {
            date: '',
            policyNumber: '',
            firstName: '',
            middleName: '',
            lastName: '',
            presentAddress: '',
            provincialAddress: '',
            houseType: '',
            houseTypeOther: '',
            birthDate: '',
            age: '',
            telCelNo: '',
            civilStatus: '',
            sex: '',
            citizenship: '',
            religion: '',
            tinNumber: '',
            spouseName: '',
            spouseAge: '',
            spouseOccupation: '',
            businessLivelihood: '',
            businessType: '',
            inclusiveDateOperation: '',
            businessAddress: '',
            businessTelNo: '',
            fbAccEmailAddress: '',
            presentEmployerAddress: ''
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        beneficiaries: [
            { name: '', percentage: '' },
            { name: '', percentage: '' },
            { name: '', percentage: '' }
        ] as Beneficiary[],
        employmentHistory: [
            { employerName: '', employmentDate: '', telCelNo: '' },
            { employerName: '', employmentDate: '', telCelNo: '' },
            { employerName: '', employmentDate: '', telCelNo: '' }
        ] as Employment[]
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        // Required fields validation
        const requiredFields = {
            'userInfo.date': 'Date is required',
            'userInfo.policyNumber': 'Policy Number is required',
            'userInfo.firstName': 'First Name is required',
            'userInfo.lastName': 'Last Name is required',
            'userInfo.presentAddress': 'Present Address is required',
            'userInfo.houseType': 'House type is required',
            'userInfo.birthDate': 'Date of Birth is required',
            'userInfo.age': 'Age is required',
            'userInfo.telCelNo': 'Tel/Cell No. is required',
            'userInfo.civilStatus': 'Civil Status is required',
            'userInfo.sex': 'Sex is required',
            'userInfo.citizenship': 'Citizenship is required',
            'userInfo.religion': 'Religion is required',
            'userInfo.tinNumber': 'TIN Number is required',
            // 'userInfo.presentEmployerAddress': 'Address of Present Employer is required',
            // 'userInfo.businessLivelihood': 'Business/Livelihood is required',
            // 'userInfo.businessType': 'Business type is required',
            // 'userInfo.inclusiveDateOperation': 'Inclusive Dates of Operation is required',
            // 'userInfo.businessAddress': 'Address of Business is required',
            // 'userInfo.businessTelNo': 'Business Telephone No. is required',
            'userInfo.fbAccEmailAddress': 'Facebook Account/E-mail Address is required'
        };

        // Check required fields
        Object.entries(requiredFields).forEach(([fieldPath, errorMessage]) => {
            const [section, field] = fieldPath.split('.');
            if (section === 'userInfo') {
                const value = formData.userInfo[field];
                if (!value || value.trim() === '') {
                    newErrors[fieldPath] = errorMessage;
                }
            }
        });

        
        if (formData.userInfo.houseType === 'others' && (!formData.userInfo.houseTypeOther || formData.userInfo.houseTypeOther.trim() === '')) {
            newErrors['userInfo.houseTypeOther'] = 'Please specify the house type';
        }

        
        if (formData.userInfo.age && (isNaN(Number(formData.userInfo.age)) || Number(formData.userInfo.age) < 0 || Number(formData.userInfo.age) > 150)) {
            newErrors['userInfo.age'] = 'Please enter a valid age';
        }

        
        if (formData.userInfo.spouseName && formData.userInfo.spouseAge) {
            if (isNaN(Number(formData.userInfo.spouseAge)) || Number(formData.userInfo.spouseAge) < 0 || Number(formData.userInfo.spouseAge) > 150) {
                newErrors['userInfo.spouseAge'] = 'Please enter a valid spouse age';
            }
        }

        
        if (formData.userInfo.fbAccEmailAddress) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.userInfo.fbAccEmailAddress)) {
                
                if (!formData.userInfo.fbAccEmailAddress.includes('facebook.com') && !formData.userInfo.fbAccEmailAddress.includes('fb.com')) {
                    newErrors['userInfo.fbAccEmailAddress'] = 'Please enter a valid email address or Facebook account URL';
                }
            }
        }

        // Beneficiaries percentage validation (only if beneficiary name is provided)
        formData.beneficiaries.forEach((beneficiary, index) => {
            if (beneficiary.name && beneficiary.percentage) {
                const percentage = Number(beneficiary.percentage);
                if (isNaN(percentage) || percentage < 0 || percentage > 100) {
                    newErrors[`beneficiary.${index}.percentage`] = 'Percentage must be between 0 and 100';
                }
            }
        });

        // Check if total percentage of beneficiaries equals 100% (only if any beneficiaries are provided)
        const filledBeneficiaries = formData.beneficiaries.filter(b => b.name.trim() !== '' && b.percentage.trim() !== '');
        if (filledBeneficiaries.length > 0) {
            const totalPercentage = filledBeneficiaries.reduce((sum, b) => sum + Number(b.percentage || 0), 0);
            if (totalPercentage !== 100) {
                newErrors['beneficiaries.total'] = 'Total percentage of beneficiaries must equal 100%';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        section: 'userInfo' | 'beneficiaries' | 'employmentHistory',
        field: string,
        value: string,
        index?: number
    ) => {
        if (section === 'userInfo') {
            setFormData(prev => ({
                ...prev,
                userInfo: { ...prev.userInfo, [field]: value }
            }));
            // Clear error when user starts typing
            const errorKey = `userInfo.${field}`;
            if (errors[errorKey]) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[errorKey];
                    return newErrors;
                });
            }
        } else if (section === 'beneficiaries' && typeof index === 'number') {
            const newBens = [...formData.beneficiaries];
            newBens[index] = { ...newBens[index], [field]: value };
            setFormData(prev => ({ ...prev, beneficiaries: newBens }));
            // Clear beneficiary errors
            const errorKey = `beneficiary.${index}.${field}`;
            if (errors[errorKey]) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[errorKey];
                    delete newErrors['beneficiaries.total'];
                    return newErrors;
                });
            }
        } else if (section === 'employmentHistory' && typeof index === 'number') {
            const newEmps = [...formData.employmentHistory];
            newEmps[index] = { ...newEmps[index], [field]: value };
            setFormData(prev => ({ ...prev, employmentHistory: newEmps }));
        }
    };

    const cleanFormArrays = (data: typeof formData) => {
        const cleanedBeneficiaries = data.beneficiaries.map(b =>
            Object.fromEntries(
            Object.entries(b).filter(([_, value]) => value !== "")
            )
        );

        const cleanedEmploymentHistory = data.employmentHistory.map(emp =>
            Object.fromEntries(
            Object.entries(emp).filter(([_, value]) => value !== "")
            )
        );

        return {
            ...data,
            beneficiaries: cleanedBeneficiaries,
            employmentHistory: cleanedEmploymentHistory
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        const cleanedData = cleanFormArrays(formData);
        console.log("Submitting:", JSON.stringify(cleanedData, null, 2));

        const finalData = {
            userInfo: {
                ...formData.userInfo,
                houseType:
                    formData.userInfo.houseType === 'others'
                        ? formData.userInfo.houseTypeOther
                        : formData.userInfo.houseType
            },
            beneficiaries: formData.beneficiaries,
            employmentHistory: formData.employmentHistory
        };

        console.log('FINAL JSON:', finalData);
        
        try {
            const response = await axios.post('/api/user/add-member', finalData);
            console.log('Form submitted successfully:', response.data);
            alert('Membership application submitted successfully!');
            onNext();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit membership application. Please try again.');
        }
    };

    const getFieldError = (fieldPath: string) => {
        return errors[fieldPath];
    };

    const hasFieldError = (fieldPath: string) => {
        return !!errors[fieldPath];
    };

    useEffect(() => {
        document.title = 'MHSTEMPC | Membership Application Form';
      }, []);

    return (
        <div className="main-layout">
            <Container fluid className="py-5" style={{ minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
            <Row className="justify-content-center">
                <Col xs={12} md={9}>
                <div className="mf-top-bar d-flex">
                    <span className="top-bar-text gothic-a1-bold">MEMBERSHIP APPLICATION FORM</span>
                </div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} md={9}>
                <div className="card shadow-lg p-4 mb-5 bg-white rounded mf-card mx-auto" >
                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                                    {/* Date and Policy Number */}
                                    <div className="d-flex flex-column align-items-end mb-5" style={{ maxWidth: 220, marginLeft: 'auto' }}>
                                        <div className="mb-3 w-100">
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="membershipDate" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Date: <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className={`form-control ${hasFieldError('userInfo.date') ? 'is-invalid' : ''}`}
                                                    id="membershipDate"
                                                    value={formData.userInfo.date}
                                                    onChange={e => handleInputChange('userInfo', 'date', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.date') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.date')}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="membershipPolicyNumber" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Policy Number: <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${hasFieldError('userInfo.policyNumber') ? 'is-invalid' : ''}`}
                                                    id="membershipPolicyNumber"
                                                    value={formData.userInfo.policyNumber}
                                                    onChange={e => handleInputChange('userInfo', 'policyNumber', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.policyNumber') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.policyNumber')}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 1 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="firstName" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    First Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${hasFieldError('userInfo.firstName') ? 'is-invalid' : ''}`}
                                                    id="firstName"
                                                    value={formData.userInfo.firstName}
                                                    onChange={e => handleInputChange('userInfo', 'firstName', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.firstName') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.firstName')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="middleName" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Middle Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="middleName"
                                                    value={formData.userInfo.middleName}
                                                    onChange={e => handleInputChange('userInfo', 'middleName', e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="lastName" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Last Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${hasFieldError('userInfo.lastName') ? 'is-invalid' : ''}`}
                                                    id="lastName"
                                                    value={formData.userInfo.lastName}
                                                    onChange={e => handleInputChange('userInfo', 'lastName', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.lastName') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.lastName')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 2 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="presentAddress" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Present Address <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control custom-address-input ${hasFieldError('userInfo.presentAddress') ? 'is-invalid' : ''}`}
                                                    id="presentAddress"
                                                    value={formData.userInfo.presentAddress}
                                                    onChange={e => handleInputChange('userInfo', 'presentAddress', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.presentAddress') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.presentAddress')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 3 */}
                                    <Row className="mb-5">
                                        <Col xs={12}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="provincialAddress" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Provincial Address (If any)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-address-input"
                                                    id="provincialAddress"
                                                    value={formData.userInfo.provincialAddress}
                                                    onChange={e => handleInputChange('userInfo', 'provincialAddress', e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 4 */}
                                    <Row className="mb-5">
                                        <Col xs={12}>
                                            <p className="gothic-a1-bold">
                                                Type of house residing in: <span className="text-danger">*</span>
                                            </p>
                                            {hasFieldError('userInfo.houseType') && (
                                                <div className="text-danger mb-2">{getFieldError('userInfo.houseType')}</div>
                                            )}
                                        </Col>
                                        <Col xs={6} md={2} className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                id="owned"
                                                name="houseType"
                                                value="owned"
                                                checked={formData.userInfo.houseType === 'owned'}
                                                onChange={e => handleInputChange('userInfo', 'houseType', e.target.value)}
                                                className="form-check-input me-2"
                                                required
                                            />
                                            <label htmlFor="owned" className="form-check-label">Owned</label>
                                        </Col>
                                        <Col xs={6} md={2} className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                id="rented"
                                                name="houseType"
                                                value="rented"
                                                checked={formData.userInfo.houseType === 'rented'}
                                                onChange={e => handleInputChange('userInfo', 'houseType', e.target.value)}
                                                className="form-check-input me-2"
                                                required
                                            />
                                            <label htmlFor="rented" className="form-check-label">Rented</label>
                                        </Col>
                                        <Col xs={6} md={3} className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                id="livingWithParents"
                                                name="houseType"
                                                value="livingWithParents"
                                                checked={formData.userInfo.houseType === 'livingWithParents'}
                                                onChange={e => handleInputChange('userInfo', 'houseType', e.target.value)}
                                                className="form-check-input me-2"
                                                required
                                            />
                                            <label htmlFor="livingWithParents" className="form-check-label">Living with Parents</label>
                                        </Col>
                                        <Col xs={12} md={5} className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                id="others"
                                                name="houseType"
                                                value="others"
                                                checked={formData.userInfo.houseType === 'others'}
                                                onChange={e => handleInputChange('userInfo', 'houseType', e.target.value)}
                                                className="form-check-input me-2"
                                                required
                                            />
                                            <label htmlFor="others" className="form-check-label me-2 ">Others:</label>
                                            <input
                                                type="text"
                                                className={`form-control ${hasFieldError('userInfo.houseTypeOther') ? 'is-invalid' : ''}`}
                                                id="houseTypeOther"
                                                placeholder="Specify"
                                                value={formData.userInfo.houseTypeOther}
                                                onChange={e => handleInputChange('userInfo', 'houseTypeOther', e.target.value)}
                                            />
                                            {hasFieldError('userInfo.houseTypeOther') && (
                                                <div className="invalid-feedback">{getFieldError('userInfo.houseTypeOther')}</div>
                                            )}
                                        </Col>
                                    </Row>

                                    {/* Row 5 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="birthDate" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Date of Birth <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className={`form-control ${hasFieldError('userInfo.birthDate') ? 'is-invalid' : ''}`}
                                                    id="birthDate"
                                                    value={formData.userInfo.birthDate}
                                                    onChange={e => handleInputChange('userInfo', 'birthDate', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.birthDate') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.birthDate')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="age" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Age <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    className={`form-control ${hasFieldError('userInfo.age') ? 'is-invalid' : ''}`}
                                                    id="age"
                                                    min="0"
                                                    max="150"
                                                    value={formData.userInfo.age}
                                                    onChange={e => handleInputChange('userInfo', 'age', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.age') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.age')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="telCelNo" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Tel/Cell No. <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className={`form-control ${hasFieldError('userInfo.telCelNo') ? 'is-invalid' : ''}`}
                                                    id="telCelNo"
                                                    value={formData.userInfo.telCelNo}
                                                    onChange={e => handleInputChange('userInfo', 'telCelNo', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.telCelNo') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.telCelNo')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 6 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="civilStatus" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start',  }}>
                                                    Civil Status <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-select ${hasFieldError('userInfo.civilStatus') ? 'is-invalid' : ''}`}
                                                    id="civilStatus"
                                                    value={formData.userInfo.civilStatus}
                                                    onChange={e => handleInputChange('userInfo', 'civilStatus', e.target.value)}
                                                    style={{ border: '1px solid #002d62' }}
                                                    required
                                                >
                                                    <option value="" style={{ color: 'gray' }}>Select Civil Status</option>
                                                    <option value="single">Single</option>
                                                    <option value="married">Married</option>
                                                    <option value="widow">Widowed</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {hasFieldError('userInfo.civilStatus') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.civilStatus')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="sex" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Sex <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    className={`form-select ${hasFieldError('userInfo.sex') ? 'is-invalid' : ''}`}
                                                    style={{ border: '1px solid #002d62' }}
                                                    id="sex"
                                                    value={formData.userInfo.sex}
                                                    onChange={e => handleInputChange('userInfo', 'sex', e.target.value)}
                                                    required
                                                >
                                                    <option value="" style={{ color: 'gray' }}>Select Sex</option>
                                                    <option value="M">M</option>
                                                    <option value="F">F</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {hasFieldError('userInfo.sex') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.sex')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="citizenship" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Citizenship <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className= {`form-control ${hasFieldError('userInfo.citizenship') ? 'is-invalid' : ''}`}
                                                    id="citizenship"
                                                    value={formData.userInfo.citizenship}
                                                    onChange={e => handleInputChange('userInfo', 'citizenship', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.citizenship') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.citizenship')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 7 */}
                                    <Row className="mb-3 align-items-end">
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="religion" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Religion <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${hasFieldError('userInfo.religion') ? 'is-invalid' : ''}`}
                                                    id="religion"
                                                    value={formData.userInfo.religion}
                                                    onChange={e => handleInputChange('userInfo', 'religion', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.religion') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.religion')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4} xl={4} className="d-flex flex-column align-items-center">
                                            <div className="d-flex flex-column align-items-start w-100">
                                                <label htmlFor="fbAccEmailAddress" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    Facebook Account/E-mail Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-address-input"
                                                    id="fbAccEmailAddress"
                                                    value={formData.userInfo.fbAccEmailAddress}
                                                    onChange={e => handleInputChange('userInfo', 'fbAccEmailAddress', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.fbAccEmailAddress') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.fbAccEmailAddress')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="tinNumber" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>
                                                    TIN Number <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${hasFieldError('userInfo.tinNumber') ? 'is-invalid' : ''}`}
                                                    id="tinNumber"
                                                    value={formData.userInfo.tinNumber}
                                                    onChange={e => handleInputChange('userInfo', 'tinNumber', e.target.value)}
                                                    required
                                                />
                                                {hasFieldError('userInfo.tinNumber') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.tinNumber')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 8 */}
                                    <Row className="mb-5">
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="spouseName" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Spouse</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="spouseName"
                                                    value={formData.userInfo.spouseName}
                                                    onChange={e => handleInputChange('userInfo', 'spouseName', e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="spouseAge" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Age</label>
                                                <input
                                                    type="number"
                                                    className={`form-control ${hasFieldError('userInfo.spouseAge') ? 'is-invalid' : ''}`}
                                                    id="spouseAge"
                                                    min="0"
                                                    max="150"
                                                    value={formData.userInfo.spouseAge}
                                                    onChange={e => handleInputChange('userInfo', 'spouseAge', e.target.value)}
                                                />
                                                {hasFieldError('userInfo.spouseAge') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.spouseAge')}</div>
                                                )}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="spouseOccupation" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Occupation</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="spouseOccupation"
                                                    value={formData.userInfo.spouseOccupation}
                                                    onChange={e => handleInputChange('userInfo', 'spouseOccupation', e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 9 */}
                                    <Row className="mb-5">
                                        <Col xs={12} md={8}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="beneficiaryName" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Name of Beneficiaries:</label>
                                                {formData.beneficiaries.map((b, idx) => (
                                                    <input
                                                        key={idx}
                                                        type="text"
                                                        className="form-control mb-2 custom-address-input"
                                                        value={b.name}
                                                        onChange={e => handleInputChange('beneficiaries', 'name', e.target.value, idx)}
                                                    />
                                                ))}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="allowedPercentage" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Allowed Percentage:</label>
                                                {formData.beneficiaries.map((b, idx) => (
                                                    <input
                                                        key={idx}
                                                        type="text"
                                                        className="form-control mb-2"
                                                        value={b.percentage}
                                                        onChange={e => handleInputChange('beneficiaries', 'percentage', e.target.value, idx)}
                                                    />
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>

                                    <h5 className="mb-3 gothic-a1-bold">Employment Information:</h5>

                                    {/* Row 10 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="employerName" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Name of Employers:</label>
                                                {formData.employmentHistory.map((emp, idx) => (
                                                    <input
                                                        key={idx}
                                                        type="text"
                                                        className="form-control mb-2 custom-address-input"
                                                        value={emp.employerName}
                                                        onChange={e => handleInputChange('employmentHistory', 'employerName', e.target.value, idx)}
                                                    />
                                                ))}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="employmentDate" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Date of Employment:</label>
                                                {formData.employmentHistory.map((emp, idx) => (
                                                    <input
                                                        key={idx}
                                                        type="date"
                                                        className="form-control mb-2 custom-address-input"
                                                        value={emp.employmentDate}
                                                        onChange={e => handleInputChange('employmentHistory', 'employmentDate', e.target.value, idx)}
                                                    />
                                                ))}
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="employerTelCelNo" className="form-label fw-semibold" style={{ alignSelf: 'flex-start' }}>Tel/Cell No.:</label>
                                                {formData.employmentHistory.map((emp, idx) => (
                                                    <input
                                                        key={idx}
                                                        type="text"
                                                        className="form-control mb-2 custom-address-input"
                                                        value={emp.telCelNo}
                                                        onChange={e => handleInputChange('employmentHistory', 'telCelNo', e.target.value, idx)}
                                                    />
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 11 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="presentEmployerAddress" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Address of Present Employer</label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-address-input"
                                                    id="presentEmployerAddress"
                                                    value={formData.userInfo.presentEmployerAddress}
                                                    onChange={e => handleInputChange('userInfo', 'presentEmployerAddress', e.target.value)}
                                                />
                                                {hasFieldError('userInfo.presentEmployerAddress') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.presentEmployerAddress')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 12 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="businessLivelihood" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Business/Livelihood</label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-address-input"
                                                    id="businessLivelihood"
                                                    value={formData.userInfo.businessLivelihood}
                                                    onChange={e => handleInputChange('userInfo', 'businessLivelihood', e.target.value)}
                                                />
                                                {hasFieldError('userInfo.businessLivelihood') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.businessLivelihood')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 13 */}
                                    <Row className="mb-5">
                                        {hasFieldError('userInfo.businessType') && (
                                            <div className="invalid-feedback">{getFieldError('businessType')}</div>
                                        )}
                                        <Col xs={12} md={3} className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                id="soleProprietorship"
                                                name="businessType"
                                                value="soleProprietorship"
                                                checked={formData.userInfo.businessType === 'soleProprietorship'}
                                                onChange={e => handleInputChange('userInfo', 'businessType', e.target.value)}
                                                className="form-check-input me-2"
                                            />
                                            <label htmlFor="soleProprietorship" className="form-check-label">Sole Proprietorship</label>
                                        </Col>
                                        <Col xs={12} md={3} className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                id="partnership"
                                                name="businessType"
                                                value="partnership"
                                                checked={formData.userInfo.businessType === 'partnership'}
                                                onChange={e => handleInputChange('userInfo', 'businessType', e.target.value)}
                                                className="form-check-input me-2"
                                            />
                                            <label htmlFor="partnership" className="form-check-label">Partnership</label>
                                        </Col>
                                        <Col xs={12} md={3} className="d-flex align-items-center">
                                            <input
                                                type="radio"
                                                id="corporation"
                                                name="businessType"
                                                value="corporation"
                                                checked={formData.userInfo.businessType === 'corporation'}
                                                onChange={e => handleInputChange('userInfo', 'businessType', e.target.value)}
                                                className="form-check-input me-2"
                                            />
                                            <label htmlFor="corporation" className="form-check-label ">Corporation</label>
                                        </Col>
                                    </Row>

                                    {/* Row 14 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="inlcusiveDateOperation" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Inclusive Dates of Operation</label>
                                                <input
                                                    type="date"
                                                    className="form-control custom-address-input"
                                                    id="inlcusiveDateOperation"
                                                    value={formData.userInfo.inclusiveDateOperation}
                                                    onChange={e => handleInputChange('userInfo', 'inclusiveDateOperation', e.target.value)}
                                                />
                                                {hasFieldError('userInfo.inclusiveDateOperation') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.inclusiveDateOperation')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 15 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="businessAddress" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Address of Business</label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-address-input"
                                                    id="businessAddress"
                                                    value={formData.userInfo.businessAddress}
                                                    onChange={e => handleInputChange('userInfo', 'businessAddress', e.target.value)}
                                                />
                                                {hasFieldError('userInfo.businessAddress') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.businessAddress')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Row 16 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={12} xl={12}>
                                            <div className="d-flex flex-column align-items-start">
                                                <label htmlFor="businessTelNo" className="form-label gothic-a1-bold" style={{ alignSelf: 'flex-start' }}>Business Telephone No.</label>
                                                <input
                                                    type="text"
                                                    className="form-control custom-address-input"
                                                    id="businessTelNo"
                                                    value={formData.userInfo.businessTelNo}
                                                    onChange={e => handleInputChange('userInfo', 'businessTelNo', e.target.value)}
                                                />
                                                {hasFieldError('userInfo.businessTelNo') && (
                                                    <div className="invalid-feedback">{getFieldError('userInfo.businessTelNo')}</div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Submit */}
                                    <div className="mt-4 d-flex justify-content-end gap-2   ">
                                        <button
                                            type="button"
                                            className="btn btn-secondary gothic-a1-bold"
                                            style={{ color: '#002d62', backgroundColor: '#ffffff', borderColor: '#002d62', borderRadius: '20px', height: '45px', width: '100px'}}
                                            onClick={() => window.location.href = '/'}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary gothic-a1-bold"
                                            style={{ backgroundColor: '#002d62', color: '#ffffff', borderRadius: '20px', height: '45px', width: '100px'}}
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
        </div>
    );
};

export default MembershipForm;
