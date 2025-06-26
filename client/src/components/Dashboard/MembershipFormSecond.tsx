import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MembershipFormSecond.css';

interface MembershipFormSecondProps {
  onCancel: () => void;
}

const MembershipFormSecond: React.FC<MembershipFormSecondProps> = ({ onCancel }) => {
  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={9}>
          <div className="mfs-top-bar">
            <span className="top-bar-text gothic-a1-bold">MEMBERSHIP APPLICATION FORM</span>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={9}>
          <div className="card shadow-lg p-4 mb-5 bg-white rounded mfs-card">
            <div className="card-body">
              <form>
                <Row className="mb-3">
                  <Col>
                    <h5 className='textone gothic-a1-bold' style={{textAlign: 'left'}}>OBLIGATIONS AND DUTIES OF THE MEMBERS:</h5>
                    <p>Please read carefully the following obligations:</p>
                  </Col>
                </Row>

                {[
                  "1. To purchase the minimum number of required 30 shares.",
                  "2. To pay the membership fee of Php____",
                  "3. To attend the membership and Education Seminars and annual General Assembly.",
                  "4. To patronize Cooperative Services and supports its projects.",
                  "5. To increase Capital Share."
                ].map((item, index) => (
                  <Row key={index} className="mb-1">
                    <Col className="indented-paragraph">
                      <p>{item}</p>
                    </Col>
                  </Row>
                ))}

                <Row className="mb-4">
                  <Col>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="statement1"
                        className="form-check-input"
                        required
                      />
                      <label htmlFor="statement1" className="form-check-label">
                        I hereby certify all the information/statements made in this application are true,
                        complete and correct to the best of my knowledge and belief. I likewise authorize
                        MHSTEMPC to conduct verifications/investigations on the truth of the information stated herein.
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="statement2"
                        className="form-check-input"
                        required
                      />
                      <label htmlFor="statement2" className="form-check-label">
                        I understand all the obligations and duties of being a member including the statements found
                        in the By-Laws of this Cooperative. In the event that I retire/resign from my service at
                        Marikina High School or change my place of work, I understand that if I do not communicate
                        with the MHSTEMPC officers, my membership may be terminated automatically.
                      </label>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={12}>
                    <h3 className="text-center underlined-spaced">MEMBERSHIP COMMITTEE</h3>
                    <p className="text-center fw-semibold">(Recommending Approval for Membership)</p>
                  </Col>
                </Row>

                <Row className="text-center mb-5">
                  {[
                    ["NANETTE DISTRAJO", "Member"],
                    ["ELNORA P. ABUAN", "Member"],
                    ["ZENAIDA S. NANOY", "Member"]
                  ].map(([name, title], index) => (
                    <Col key={index} xs={12} md={4}>
                      <h5 className="card-title mb-2">{name}</h5>
                      <span>{title}</span>
                    </Col>
                  ))}
                </Row>

                <Row className="mb-5">
                  <Col>
                    <p className="text-center fw-semibold">
                      (Chairperson, Membership and Education Committee, Vice-Chairperson, Board on Directors)
                    </p>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <Col md={6}>
                    <label htmlFor="dateRecommended" className="form-label">Date Recommended:</label>
                    <input type="date" className="form-control" id="dateRecommended" required />
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <h5 className="text-center">APPROVED FOR THE BOARD OF DIRECTORS</h5>
                  </Col>
                </Row>

                <Row className="mb-5 justify-content-center">
                  <Col xs={12} md={4} className="text-center">
                    <h5 className="card-title mb-2">HELEN M. AQUINO</h5>
                    <span>CHAIRPERSON, Board of Directors</span>
                  </Col>
                </Row>

                <div className="mt-4 d-flex flex-wrap justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary px-5"
                    onClick={onCancel}  // Cancel button goes back to step 1
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-5" style={{backgroundColor: '#002d62'}}>
                    Submit
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

export default MembershipFormSecond;
