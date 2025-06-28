import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import '../screens/ServicesScreen.css';
import loan from '../assets/Images/loan.png';
import capitalShare from '../assets/Images/capitalshare.png';

const ServicesScreen = () => {
    return (
        <div className="services-screen-wrapper">
            <NavBar />

            <div className="cont min-vh-100">
                <div className="container py-5">

                    <div className="row justify-content-center w-100">
                        <div className="column col-12">
                            <h1 className="srvs gothic-a1-bold">Services</h1>
                        </div>

                        <div className="columnOne col-12">
                            <div className="row gx-0 gy-4 justify-content-center">
                                {/* First Card - Loan */}
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                    <div className="card h-100 shadow" style={{ maxWidth: '250px', width: '100%' }}>
                                        <div className="card-body text-center p-4">
                                            <div className="mb-3">
                                                <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                                    <img
                                                        src={loan}
                                                        alt="loanPic"
                                                        className="loanImg img-fluid"
                                                        style={{ maxWidth: '100%', height: 'auto', width: '120px' }}
                                                    />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Loan</h4>
                                                {/* <div className="d-flex align-items-center justify-content-center">
                                                    <span className="text-muted">View more</span>
                                                    <i className="fas fa-chevron-right text-muted ms-1"></i>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Card - Capital Share */}
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                    <div className="card h-100 shadow" style={{ maxWidth: '250px', width: '100%' }}>
                                        <div className="card-body text-center p-4">
                                            <div className="mb-3">
                                                <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                                    <img
                                                        src={capitalShare}
                                                        alt="capitalShareImg"
                                                        className="capshareImg img-fluid"
                                                        style={{ maxWidth: '100%', height: 'auto', width: '120px' }}
                                                    />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Capital Share</h4>
                                                {/* <div className="d-flex align-items-center justify-content-center">
                                                    <span className="text-muted">View more</span>
                                                    <i className="fas fa-chevron-right text-muted ms-1"></i>
                                                </div> */}
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
    );
};

export default ServicesScreen;
