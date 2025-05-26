import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import '../screens/ServicesScreen.css';
import loan from '../assets/Images/loan.png';
import capitalShare from '../assets/Images/capitalshare.png';

const ServicesScreen = () => {
    return (
        <div style={{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw'}}>
            <NavBar />

            <div className="cont min-vh-100">
                <div className="container py-5"
                    style={{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '65vw'}}>

                    <div className="row justify-content-center w-100">
                        <div className="column col-12">
                            <h1 className="srvs gothic-a1-bold">Services</h1>
                        </div>

                        <div className="columnOne col-12">
                            <div className="row gx-1 gy-0 justify-content-center">
                                {/* First Card - Loan */}
                                <div className="col-md-6 col-lg-4 mb-2 d-flex justify-content-center" >
                                    <div className="card h-100 shadow"
                                        style={{borderRadius: '10px', 
                                                cursor: 'pointer', 
                                                transition: 'transform 0.2s, box-shadow 0.2s', 
                                                borderColor: '#d9d9d9', 
                                                borderWidth: 2,
                                                width: 270,
                                                overflow: 'hidden',
                                                 }}>

                                        <div className="card-body text-center p-4">
                                            <div className="mb-4">
                                                <div className="d-inline-flex align-items-center justify-content-center">
                                                    <img src={loan} alt='loanPic' className='loanImg img-fluid' 
                                                                style={{height: '150px', 
                                                                width: '150px',
                                                                justifyContent: 'center'}}  />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Loan</h4>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="text-muted">View more</span>
                                                    <i className="fas fa-chevron-right text-muted ms-1"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Card - Capital Share */}
                                <div className="col-md-6 col-lg-4 mb-2" >
                                    <div className="card h-100 shadow"
                                        style={{borderRadius: '10px', 
                                                cursor: 'pointer', 
                                                transition: 'transform 0.2s, box-shadow 0.2s', 
                                                borderColor: '#d9d9d9', 
                                                borderWidth: 2,
                                                width: 270,
                                                overflow: "hidden" }}>

                                        <div className="card-body text-center p-4">
                                            <div className="mb-4">
                                                <div className="d-inline-flex align-items-center justify-content-center">
                                                    <img src={capitalShare} alt='capitalShareImg' className='capshareImg img-fluid' 
                                                        style={{height: '150px', 
                                                                width: '150px',
                                                                justifyContent: 'center'}} />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Capital Share</h4>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span className="text-muted">View more</span>
                                                    <i className="fas fa-chevron-right text-muted ms-1"></i>
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
    );
};

export default ServicesScreen;