import React, { useState } from 'react';
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
        } else if (section === 'beneficiaries' && typeof index === 'number') {
            const newBens = [...formData.beneficiaries];
            newBens[index] = { ...newBens[index], [field]: value };
            setFormData(prev => ({ ...prev, beneficiaries: newBens }));
        } else if (section === 'employmentHistory' && typeof index === 'number') {
            const newEmps = [...formData.employmentHistory];
            newEmps[index] = { ...newEmps[index], [field]: value };
            setFormData(prev => ({ ...prev, employmentHistory: newEmps }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit membership application. Please try again.');
        }

        onNext();
    };

    return (
        <div className="main-layout">
            <Container fluid className="py-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={10} xl={8}>
                        <div className="mf-top-bar ">
                            <span className="top-bar-text">MEMBERSHIP APPLICATION FORM</span>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={10} xl={8}>
                        <div className="card shadow-lg p-4 mb-5 bg-white rounded mf-card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Date and Policy Number */}
                                    <div className="d-flex flex-column align-items-end mb-5" style={{ maxWidth: 220, marginLeft: 'auto' }}>
                                        <div className="mb-3 w-100">
                                            <label htmlFor="membershipDate" className="form-label fw-semibold">Date:</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="membershipDate"
                                                value={formData.userInfo.date}
                                                onChange={e => handleInputChange('userInfo', 'date', e.target.value)}
                                            />
                                        </div>
                                        <div className="w-100">
                                            <label htmlFor="membershipPolicyNumber" className="form-label fw-semibold">Policy Number:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="membershipPolicyNumber"
                                                value={formData.userInfo.policyNumber}
                                                onChange={e => handleInputChange('userInfo', 'policyNumber', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Row 1 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                value={formData.userInfo.firstName}
                                                onChange={e => handleInputChange('userInfo', 'firstName', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="middleName" className="form-label fw-semibold">Middle Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="middleName"
                                                value={formData.userInfo.middleName}
                                                onChange={e => handleInputChange('userInfo', 'middleName', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                value={formData.userInfo.lastName}
                                                onChange={e => handleInputChange('userInfo', 'lastName', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 2 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="presentAddress" className="form-label fw-semibold">Present Address</label>
                                            <input
                                                type="text"
                                                className="form-control custom-address-input"
                                                id="presentAddress"
                                                value={formData.userInfo.presentAddress}
                                                onChange={e => handleInputChange('userInfo', 'presentAddress', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 3 */}
                                    <Row className="mb-5">
                                        <Col xs={12}>
                                            <label htmlFor="provincialAddress" className="form-label fw-semibold">Provincial Address (If any)</label>
                                            <input
                                                type="text"
                                                className="form-control custom-address-input"
                                                id="provincialAddress"
                                                value={formData.userInfo.provincialAddress}
                                                onChange={e => handleInputChange('userInfo', 'provincialAddress', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 4 */}
                                    <Row className="mb-5">
                                        <Col xs={12}>
                                            <p className="fw-semibold">Type of house residing in:</p>
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
                                            />
                                            <label htmlFor="others" className="form-check-label me-2">Others:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="houseTypeOther"
                                                placeholder="Specify"
                                                value={formData.userInfo.houseTypeOther}
                                                onChange={e => handleInputChange('userInfo', 'houseTypeOther', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 5 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <label htmlFor="birthDate" className="form-label fw-semibold">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="birthDate"
                                                value={formData.userInfo.birthDate}
                                                onChange={e => handleInputChange('userInfo', 'birthDate', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="age" className="form-label fw-semibold">Age</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="age"
                                                value={formData.userInfo.age}
                                                onChange={e => handleInputChange('userInfo', 'age', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="telCelNo" className="form-label fw-semibold">Tel/Cell No.</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="telCelNo"
                                                value={formData.userInfo.telCelNo}
                                                onChange={e => handleInputChange('userInfo', 'telCelNo', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 6 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <label htmlFor="civilStatus" className="form-label fw-semibold">Civil Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="civilStatus"
                                                value={formData.userInfo.civilStatus}
                                                onChange={e => handleInputChange('userInfo', 'civilStatus', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="sex" className="form-label fw-semibold">Sex</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="sex"
                                                value={formData.userInfo.sex}
                                                onChange={e => handleInputChange('userInfo', 'sex', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="citizenship" className="form-label fw-semibold">Citizenship</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="citizenship"
                                                value={formData.userInfo.citizenship}
                                                onChange={e => handleInputChange('userInfo', 'citizenship', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 7 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={8}>
                                            <label htmlFor="religion" className="form-label fw-semibold">Religion</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="religion"
                                                value={formData.userInfo.religion}
                                                onChange={e => handleInputChange('userInfo', 'religion', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="tinNumber" className="form-label fw-semibold">TIN Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tinNumber"
                                                value={formData.userInfo.tinNumber}
                                                onChange={e => handleInputChange('userInfo', 'tinNumber', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 8 */}
                                    <Row className="mb-5">
                                        <Col xs={12} md={4}>
                                            <label htmlFor="spouseName" className="form-label fw-semibold">Spouse</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="spouseName"
                                                value={formData.userInfo.spouseName}
                                                onChange={e => handleInputChange('userInfo', 'spouseName', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="spouseAge" className="form-label fw-semibold">Age</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="spouseAge"
                                                value={formData.userInfo.spouseAge}
                                                onChange={e => handleInputChange('userInfo', 'spouseAge', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="spouseOccupation" className="form-label fw-semibold">Occupation</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="spouseOccupation"
                                                value={formData.userInfo.spouseOccupation}
                                                onChange={e => handleInputChange('userInfo', 'spouseOccupation', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 9 */}
                                    <Row className="mb-5">
                                        <Col xs={12} md={8}>
                                            <label htmlFor="beneficiaryName" className="form-label fw-semibold">Name of Beneficiaries:</label>
                                            {formData.beneficiaries.map((b, idx) => (
                                                <input
                                                    key={idx}
                                                    type="text"
                                                    className="form-control mb-2 custom-address-input"
                                                    value={b.name}
                                                    onChange={e => handleInputChange('beneficiaries', 'name', e.target.value, idx)}
                                                />
                                            ))}
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="allowedPercentage" className="form-label fw-semibold">Allowed Percentage:</label>
                                            {formData.beneficiaries.map((b, idx) => (
                                                <input
                                                    key={idx}
                                                    type="text"
                                                    className="form-control mb-2"
                                                    value={b.percentage}
                                                    onChange={e => handleInputChange('beneficiaries', 'percentage', e.target.value, idx)}
                                                />
                                            ))}
                                        </Col>
                                    </Row>

                                    <h5 className="mb-3">Employment Information:</h5>

                                    {/* Row 10 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={4}>
                                            <label htmlFor="employerName" className="form-label fw-semibold">Name of Employers:</label>
                                            {formData.employmentHistory.map((emp, idx) => (
                                                <input
                                                    key={idx}
                                                    type="text"
                                                    className="form-control mb-2 custom-address-input"
                                                    value={emp.employerName}
                                                    onChange={e => handleInputChange('employmentHistory', 'employerName', e.target.value, idx)}
                                                />
                                            ))}
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="employmentDate" className="form-label fw-semibold">Date of Employment:</label>
                                            {formData.employmentHistory.map((emp, idx) => (
                                                <input
                                                    key={idx}
                                                    type="date"
                                                    className="form-control mb-2 custom-address-input"
                                                    value={emp.employmentDate}
                                                    onChange={e => handleInputChange('employmentHistory', 'employmentDate', e.target.value, idx)}
                                                />
                                            ))}
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <label htmlFor="employerTelCelNo" className="form-label fw-semibold">Tel/Cell No.:</label>
                                            {formData.employmentHistory.map((emp, idx) => (
                                                <input
                                                    key={idx}
                                                    type="text"
                                                    className="form-control mb-2 custom-address-input"
                                                    value={emp.telCelNo}
                                                    onChange={e => handleInputChange('employmentHistory', 'telCelNo', e.target.value, idx)}
                                                />
                                            ))}
                                        </Col>
                                    </Row>

                                    {/* Row 11 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="presentEmployerAddress" className="form-label fw-semibold">Address of Present Employer</label>
                                            <input
                                                type="text"
                                                className="form-control custom-address-input"
                                                id="presentEmployerAddress"
                                                value={formData.userInfo.presentEmployerAddress}
                                                onChange={e => handleInputChange('userInfo', 'presentEmployerAddress', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 12 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="businessLivelihood" className="form-label fw-semibold">Business/Livelihood</label>
                                            <input
                                                type="text"
                                                className="form-control custom-address-input"
                                                id="businessLivelihood"
                                                value={formData.userInfo.businessLivelihood}
                                                onChange={e => handleInputChange('userInfo', 'businessLivelihood', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 13 */}
                                    <Row className="mb-5">
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
                                            <label htmlFor="corporation" className="form-check-label">Corporation</label>
                                        </Col>
                                    </Row>

                                    {/* Row 14 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="inlcusiveDateOperation" className="form-label fw-semibold">Inclusive Dates of Operation</label>
                                            <input
                                                type="date"
                                                className="form-control custom-address-input"
                                                id="inlcusiveDateOperation"
                                                value={formData.userInfo.inclusiveDateOperation}
                                                onChange={e => handleInputChange('userInfo', 'inclusiveDateOperation', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 15 */}
                                    <Row className="mb-3">
                                        <Col xs={12}>
                                            <label htmlFor="businessAddress" className="form-label fw-semibold">Address of Business</label>
                                            <input
                                                type="text"
                                                className="form-control custom-address-input"
                                                id="businessAddress"
                                                value={formData.userInfo.businessAddress}
                                                onChange={e => handleInputChange('userInfo', 'businessAddress', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Row 16 */}
                                    <Row className="mb-3">
                                        <Col xs={12} md={12} xl={4}>
                                            <label htmlFor="businessTelNo" className="form-label fw-semibold">Business Telephone No.</label>
                                            <input
                                                type="text"
                                                className="form-control custom-address-input"
                                                id="businessTelNo"
                                                value={formData.userInfo.businessTelNo}
                                                onChange={e => handleInputChange('userInfo', 'businessTelNo', e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={12} md={12} xl={8}>
                                            <label htmlFor="fbAccEmailAddress" className="form-label fw-semibold">Facebook Account/E-mail Address</label>
                                            <input
                                                type="text"
                                                className="form-control custom-address-input"
                                                id="fbAccEmailAddress"
                                                value={formData.userInfo.fbAccEmailAddress}
                                                onChange={e => handleInputChange('userInfo', 'fbAccEmailAddress', e.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Submit */}
                                    <div className="mt-4 d-flex">
                                        <button type="submit" className="btn btn-primary px-5 ms-auto">Next</button>
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
