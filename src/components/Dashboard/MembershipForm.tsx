import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MembershipForm.css';

interface MembershipFormProps {}

const MembershipForm: React.FC<MembershipFormProps> = ({}) => {
    return (
        <Container fluid className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={12}>
                    <div className="top-bar">
                        <span className="top-bar-text">MEMBERSHIP APPLICATION FORM</span>
                    </div>
                </Col>
            </Row>

            {/* Main Form Container */}
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={12} >
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded mf-card">
                        <div className="card-body">
                            
                            <form>
                                <div className="d-flex justify-content-end mb-3">
                                    <label htmlFor="membershipDate" className="form-label fw-semibold me-2">Date:</label>
                                    <input type="date" className="form-control" id="membershipDate" style={{ width: '200px' }} required />
                                </div>
                                <div className="d-flex justify-content-end mb-5">
                                    <label htmlFor="membershipPolicyNumber" className="form-label fw-semibold me-2">Policy Number:</label>
                                    <input type="text" className="form-control" id="membershipPolicyNumber" style={{ width: '200px' }} required />
                                </div>

                                {/* Row 1 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={4}>
                                        <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="middleName" className="form-label fw-semibold">Middle Name</label>
                                        <input type="text" className="form-control" id="middleName" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                    </Col>
                                </Row>
                                
                                {/* Row 2 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={12} xl={12}>
                                        <label htmlFor="presentAddress" className="form-label fw-semibold">Present Address</label>
                                        <input type="text" className="form-control custom-address-input" id="presentAddress" required />
                                    </Col>
                                </Row>

                                {/* Row 3 */}
                                <Row className="mb-5">
                                    <Col xs={12} md={12} xl={12}>
                                        <label htmlFor="provincialAddress" className="form-label fw-semibold">Provincial Address (If any) </label>
                                        <input type="text" className="form-control custom-address-input" id="provincialAddress" required />
                                    </Col>
                                </Row>

                                {/* Row 4 */}
                                <Row className="mb-5">
                                    <Col xs={12} md={12} xl={12}>
                                        <p className="fw-semibold">Type of house residing in: </p>
                                    </Col>
                                    <Col xs={12} md={2} className="d-flex align-items-center">
                                        <input
                                            type="radio"
                                            id="owned"
                                            name="houseType"
                                            value="owned"
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="owned" className="form-check-label">Owned</label>
                                    </Col>
                                    <Col xs={12} md={2} className="d-flex align-items-center">
                                        <input
                                            type="radio"
                                            id="rented"
                                            name="houseType"
                                            value="rented"
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="rented" className="form-check-label">Rented</label>
                                    </Col>
                                    <Col xs={12} md={3} className="d-flex align-items-center">
                                        <input
                                            type="radio"
                                            id="livingWithParents"
                                            name="houseType"
                                            value="livingWithParents"
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
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="others" className="form-check-label me-2">Others:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="houseType"
                                            placeholder="Specify"
                                            required
                                        />
                                    </Col> 
                                </Row>
                                
                                {/* Row 5 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={4}>
                                        <label htmlFor="birthDate" className="form-label fw-semibold">Date of Birth</label>
                                        <input type="date" className="form-control" id="birthDate" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="age" className="form-label fw-semibold">Age</label>
                                        <input type="text" className="form-control" id="age" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="telCelNo" className="form-label fw-semibold">Tel/Cell No.</label>
                                        <input type="text" className="form-control" id="telCelNo" required />
                                    </Col>
                                </Row>
                                
                                {/* Row 6 */}
                                <Row className="mb-3">
                                <Col xs={12} md={4}>
                                        <label htmlFor="civilStatus" className="form-label fw-semibold">Civil Status</label>
                                        <input type="text" className="form-control" id="civilStatus" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="sex" className="form-label fw-semibold">Sex</label>
                                        <input type="text" className="form-control" id="sex" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="citizenship" className="form-label fw-semibold">Citizenship</label>
                                        <input type="text" className="form-control" id="citizenship" required />
                                    </Col>
                                </Row>
                                
                                {/* Row 7 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={8}>
                                        <label htmlFor="religion" className="form-label fw-semibold">Religion</label>
                                        <input type="text" className="form-control" id="religion" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="tinNumber" className="form-label fw-semibold">TIN Number</label>
                                        <input type="text" className="form-control" id="tinNumber" required />
                                    </Col>
                                </Row>
                                
                                {/* Row 8 */}
                                <Row className="mb-5">
                                    <Col xs={12} md={4}>
                                        <label htmlFor="spouseName" className="form-label fw-semibold">Spouse</label>
                                        <input type="text" className="form-control" id="religion" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="spouseAge" className="form-label fw-semibold">Age</label>
                                        <input type="text" className="form-control" id="spouseAge" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="spouseOccupation" className="form-label fw-semibold">Occupation</label>
                                        <input type="text" className="form-control" id="spouseOccupation" required />
                                    </Col>
                                </Row>

                                {/* Row 9 */}
                                <Row className="mb-5">
                                    <Col xs={12} md={8}>
                                        <label htmlFor="beneficiaryName" className="form-label fw-semibold">Name of Beneficiaries:</label>
                                        <input type="text" className="form-control mb-2 custom-address-input" id="beneficiaryName1" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="beneficiaryName2" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="beneficiaryName3" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="allowedPercentage" className="form-label fw-semibold">Allowed Percentage: </label>
                                        <input type="text" className="form-control mb-2" id="allowedPercentage1" required />
                                        <input type="text" className="form-control mb-2" id="allowedPercentage2" required />
                                        <input type="text" className="form-control mb-2" id="allowedPercentage3" required />
                                    </Col>
                                </Row>

                                <h5 className="mb-3">Employment Information:</h5>

                                {/* Row 10 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={5}>
                                        <label htmlFor="employerName" className="form-label fw-semibold">Name of Employers:</label>
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employerName1" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employerName2" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employerName3" required />
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <label htmlFor="employmentDate" className="form-label fw-semibold">Date of Employment:</label>
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employmentDate1" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employmentDate2" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employmentDate3" required />
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label htmlFor="employerTelCelNo" className="form-label fw-semibold">Tel/Cell No.:</label>
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employerTelCelNo1" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employerTelCelNo2" required />
                                        <input type="text" className="form-control mb-2 custom-address-input" id="employerTelCelNo3" required />
                                    </Col>
                                </Row>

                                {/* Row 11 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={12} xl={12}>
                                        <label htmlFor="presentEmployerAddress" className="form-label fw-semibold">Address of Present Employer</label>
                                        <input type="text" className="form-control custom-address-input" id="presentEmployerAddress" required />
                                    </Col>
                                </Row>

                                {/* Row 12 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={12} xl={12}>
                                        <label htmlFor="businessLivelihood" className="form-label fw-semibold">Business/Livelihood</label>
                                        <input type="text" className="form-control custom-address-input" id="businessLivelihood" required />
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
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="soleProprietorship" className="form-check-label">Sole Proprietorship</label>
                                    </Col>
                                    <Col xs={12} md={3} className="d-flex align-items-center">
                                        <input
                                            type="radio"
                                            id="partnership"
                                            name="businessType"
                                            value="partnership"
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="partnership" className="form-check-label">Partnership</label>
                                    </Col>
                                    <Col xs={12} md={3} className="d-flex align-items-center">
                                        <input
                                            type="radio"
                                            id="corporation"
                                            name="businessType"
                                            value="corporation"
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="corporation" className="form-check-label">Corporation</label>
                                    </Col>
                                </Row>

                                {/* Row 14 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={12} xl={12}>
                                        <label htmlFor="inclusiveDateOperation" className="form-label fw-semibold">Inclusive Dates of Operation</label>
                                        <input type="date" className="form-control custom-address-input" id="inlcusiveDateOperation" required />
                                    </Col>
                                </Row>

                                {/* Row 15 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={12} xl={12}>
                                        <label htmlFor="businessAddress" className="form-label fw-semibold">Address of Business</label>
                                        <input type="text" className="form-control custom-address-input" id="businessAddress" required />
                                    </Col>
                                </Row>

                                {/* Row 16 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={12} xl={4}>
                                        <label htmlFor="businessTelNo" className="form-label fw-semibold">Business Telephone No.</label>
                                        <input type="text" className="form-control custom-address-input" id="businessTelNo" required />
                                    </Col>
                                    <Col xs={12} md={12} xl={8}>
                                        <label htmlFor="fbAccEmailAddress" className="form-label fw-semibold">Facebook Account/E-mail Address</label>
                                        <input type="text" className="form-control custom-address-input" id="fbAccEmailAddress" required />
                                    </Col>
                                </Row>
                                
                                {/* Submit Button */}
                                <div className="mt-4 d-flex">
                                    <button type="submit" className="btn btn-primary px-5 ms-auto">Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MembershipForm;