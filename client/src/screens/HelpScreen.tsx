import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import phone from "../assets/Images/phone.png"
import email from "../assets/Images/email.png"
import faq from "../assets/Images/faq.png"
import '../screens/Help.css';

const HelpScreen = () => {
    return (
        <div style={{display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto'}}>
            <NavBar/>

            <div className="cont min-vh-100">
                <div className="container py-5"
                    style={{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '65vw'}}>
                    
                    <div className="row justify-content-center w-100">
                        <div className="column col-12">
                            <h1 className="help">Contact Us</h1>
                        </div>

                        <div className="columnOne col-12 ">
                            <div className="row  gx-1 gy-0 justify-content-center">
                                {/* First Cardd - Phone */}
                                <div className="col-lg-4 col-md-6 d-flex justify-content-center">
                                    <div className="card h-100 shadow"
                                        style={{borderRadius: '10px', 
                                                cursor: 'pointer', 
                                                transition: 'transform 0.2s, box-shadow 0.2s', 
                                                borderColor: '#d9d9d9', 
                                                borderWidth: 2,
                                                width: 270,
                                                overflow: 'hidden',
                                                 }}>
                                        <div className="card-body text-center p-5">
                                            <div className="mb-0">
                                                <div className="d-inline-flex align-items-center justify-content-center">
                                                    <img src={phone} className="phoneImg img-fluid"/>
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Phone</h4>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span>09123456789</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Card - Email */}
                                <div className="col-lg-4 col-md-6 d-flex justify-content-center">
                                    <div className="card h-100 shadow"
                                        style={{borderRadius: '10px', 
                                                cursor: 'pointer', 
                                                transition: 'transform 0.2s, box-shadow 0.2s', 
                                                borderColor: '#d9d9d9', 
                                                borderWidth: 2,
                                                width: 270,
                                                overflow: "hidden" }}>
                                        
                                        <div className="card-body text-center p-5">
                                            <div className="mb-0">
                                                <div className="d-inline-flex align-items-center justify-content-center">
                                                    <img src={email} className="emailImg img-fluid"
                                                        />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">Email Address</h4>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <span>mhstempc@gmail.com</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Third Card - FAQ */}
                                <div className="col-lg-4 col-md-6 d-flex justify-content-center">
                                    <div className="card h-100 shadow"
                                        style={{borderRadius: '10px', 
                                                cursor: 'pointer', 
                                                transition: 'transform 0.2s, box-shadow 0.2s', 
                                                borderColor: '#d9d9d9', 
                                                borderWidth: 2,
                                                width: 270,
                                                overflow: "hidden" }}>
                                        
                                        <div className="card-body text-center p-5">
                                            <div className="mb-0">
                                                <div className="d-inline-flex align-items-center justify-content-center">
                                                    <img src={faq} className="faqImg img-fluid"
                                                        />
                                                </div>
                                                <h4 className="card-title mb-2 gothic-a1-bold">FAQ</h4>
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

            

            <BottomBar/>
        </div>
    )
}

export default HelpScreen