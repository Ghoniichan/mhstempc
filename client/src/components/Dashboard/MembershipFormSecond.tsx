import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MembershipFormSecond.css';

interface MembershipFormSecondProps {}

const MembershipFormSecond: React.FC<MembershipFormSecondProps> = ({}) => {
    return (
        <Container fluid className="py-5">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={10} xl={8}>
                    <div className="top-bar">
                        <span className="top-bar-text">MEMBERSHIP APPLICATION FORM</span>
                    </div>
                </Col>
            </Row>

            {/* Main Form Container */}
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={10} xl={8} >
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded mfs-card">
                        <div className="card-body">
                            
                            <form>
                                {/* Row 1 */}
                                <Row className="mb-3">
                                    <Col xs={12} md={12} xl={12} className="d-flex align-items-center">
                                        <h5>OBLIGATIONS AND DUTIES OF THE MEMBERS: </h5>
                                    </Col>
                                    <Col xs={12} md={6} xl={6} className="d-flex align-items-center">
                                        <p>Please read carefully the following obligations: </p>
                                    </Col>
                                </Row>

                                {/* obligations */}
                                <Row className="mb-1 indented-paragraph">
                                    <Col xs={12} md={6} xl={6} className="d-flex align-items-center">
                                        <p>1. To purchase the minimum number of required 30 shares. </p>
                                    </Col>
                                </Row>
                                <Row className="mb-1 indented-paragraph">
                                    <Col xs={12} md={6} xl={6} className="d-flex align-items-center">
                                        <p>2. To pay the membership fee of Php____ </p>
                                    </Col>
                                </Row>
                                <Row className="mb-1 indented-paragraph">
                                    <Col xs={12} md={12} xl={12} className="d-flex align-items-center">
                                        <p>3. To attend the membership and Education Seminars and annual General Assembly.</p>
                                    </Col>
                                </Row>
                                <Row className="mb-1 indented-paragraph">
                                    <Col xs={12} md={6} xl={6} className="d-flex align-items-center">
                                        <p>4. To patronize Cooperative Services and supports its projects.</p>
                                    </Col>
                                </Row>
                                <Row className="mb-5 indented-paragraph">
                                    <Col xs={12} md={6} xl={6} className="d-flex align-items-center">
                                        <p>5. To increase Capital Share.</p>
                                    </Col>
                                </Row>
                                
                                <Row className="mb-3">
                                    <h5 className='text-center'>APPLICANT'S STATEMENT</h5>
                                </Row>
                                
                                {/* checkbox */}
                                <Row className="mb-5">
                                    <Col xs={12} md={12} xl={12} className="d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            id="applicantStatementCheckbox1"
                                            name="paymentTerms"
                                            value="applicantStatementCheckbox1"
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="applicantStatementCheckbox1" className="form-check-label mb-4">I hereby certify all the information/statements made in this application are true, complete and correct to the best of my knowledge and relief. I likewise authorize MHSTEMPC to conduct verifications/investigations on the truth of the information stated herein.</label>
                                    </Col>
                                    <Col xs={12} md={12} xl={12} className="d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            id="applicantStatementCheckbox2"
                                            name="paymentTerms"
                                            value="applicantStatementCheckbox2"
                                            className="form-check-input me-2"
                                            required
                                        />
                                        <label htmlFor="applicantStatementCheckbox2" className="form-check-label mb-5"> I understand all the obligations and duties of being a member including the statements found in the By-Laws of this Cooperative. In the event that I retire/resign from my service at Marikina High School or change my place of work, I understand that if I do not communicate with the MHSTEMPC officers, my membership may be terminated automatically.</label>
                                    </Col>
                                </Row>
                                
                                <Row className="mb-2">
                                    <h3 className='text-center underlined-spaced'>MEMBERSHIP COMMITTEE</h3>
                                </Row>
                                <Row className="mb-5">
                                    <p className=" text-center fw-semibold">(Recommending Approval for Membership)</p>
                                </Row>
                                
                                {/* membership committee */}
                                <Row className="mb-5 text-center">
                                    <Col xs={12} md={4}>
                                        <h5 className="card-title mb-2">NANETTE DISTRAJO</h5> 
                                        <label htmlFor="member1" className="label">Member</label>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <h5 className="card-title mb-2">ELNORA P. ABUAN</h5>
                                        <label htmlFor="member2" className="label">Member</label>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <h5 className="card-title mb-2">ZENAIDA S. NANOY</h5>
                                        <label htmlFor="member3" className="label">Member</label>
                                    </Col>
                                </Row>

                                <Row className="mb-5">
                                    <p className=" text-center fw-semibold">(Chairperson, Membership and Education Committee, Vice-Chairperson, Board on Directors)</p>
                                </Row>
                                
                                <Row className="mb-5">
                                    <Col xs={12} md={12} xl={12} className="d-flex align-items-center">
                                        <label htmlFor="dateRecommended" className="label me-2">Date Recommended:</label>
                                        <input type="date" className="form-control w-auto" id="dateRecommended" required />
                                    </Col>
                                </Row>    

                                <Row className="mb-5"></Row> 
                                <Row className="mb-5"></Row> 

                                <Row className="mb-4">
                                    <h5 className='text-center'>APPROVED FOR THE BOARD OF DIRECTORS</h5>
                                </Row>      

                                <Row className="mb-5"></Row> 

                                <Row className="mb-5 justify-content-center">
                                    <Col xs={12} md={4} className="text-center">
                                        <h5 className="card-title mb-2">HELEN M. AQUINO</h5>
                                        <label htmlFor="chairpersonBOD" className="label">CHAIRPERSON, Board of Directors</label>
                                    </Col>
                                </Row>                                                                            

                                {/* Submit Button */}
                                <div className="mt-4 d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary px-5 me-3">Cancel</button>
                                    <button type="submit" className="btn btn-primary px-5">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MembershipFormSecond;