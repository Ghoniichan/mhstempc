import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import membership from "../assets/Images/membership.png";
import loanApp from "../assets/Images/LoanApplication.png";

import '../screens/Forms.css';

const FormsScreen = () => {
    return (
        <div className="forms-screen-wrapper">
            <NavBar />

            <div className="cont min-vh-100">
                <div className="container py-5">
                    <div className="row justify-content-center w-100">
                        <div className="column col-12">
                            <h1 className="frm gothic-a1-bold">Forms</h1>
                        </div>

                        <div className="columnOne col-12">
                            <div className="row gx-0 gy-4 justify-content-center">
                                {/* Membership Form Card */}
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                    <div className="card h-100 shadow" style={{ maxWidth: '280px', width: '100%' }}>
                                        <div className="card-body text-center p-4">
                                            <div className="mb-3">
                                                <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                                    <img src={membership} alt='loanPic' className='membershipImg img-fluid'
                                                        style={{ maxWidth: '100%', height: 'auto', width: '120px' }} />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Membership Form</h4>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="text-muted">click here to download</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Loan Application Form Card */}
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                    <div className="card h-100 shadow" style={{ maxWidth: '280px', width: '100%' }}>
                                        <div className="card-body text-center p-4">
                                            <div className="mb-3">
                                                <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                                    <img src={loanApp} alt='capitalShareImg' className='loanAppImg img-fluid'
                                                        style={{ maxWidth: '100%', height: 'auto', width: '120px' }} />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Loan Application Form</h4>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="text-muted">click here to download</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BottomBar />
        </div>
    )
}

export default FormsScreen;
