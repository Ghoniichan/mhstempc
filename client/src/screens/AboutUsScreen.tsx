import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import '../screens/AboutUs.css';

const AboutUsScreen = () => {
    return (
        <div className="about-us-screen-wrapper">
            <NavBar/>
            <div className="about-us-container min-vh-100">
                <div className="about-us-content py-3">
                    <div className="title-section col-12" style={{textAlign: 'center', marginBottom: '40px'}}>
                        <h1 className="about-us-title gothic-a1-bold">About Us</h1>
                    </div>
                    
                    <div className="cards-section col-12">
                        <div className="card-wrapper justify-content-center">
                            <div className="mission-vision-card shadow" >
                                <div className="card-body p-2">
                                    <h3 className="card-title gothic-a1-bold">Mission</h3>
                                    <p className="card-text mb-1 gothic-a1-regular">
                                        To put our vision into actions through program and to focus in activities 
                                        that will benefit the community and a commitment to build shareholder's value 
                                        by making MHSTEMPC a sustainable cooperative.

                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="card-wrapper justify-content-center">
                            <div className="mission-vision-card shadow">
                                <div className="card-body p-2">
                                    <h3 className="card-title gothic-a1-bold">Vision</h3>
                                    <p className="card-text mb-1 gothic-a1-regular">
                                        to continuously improve all aspects of operation environmental social and economic.

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="location-wrapper">
                        <div className="location-section">
                            <div className="location-content">
                                <div className="location-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="location-text">
                                    <div className="location-street gothic-a1-bold">F. Torres St. Concepcion Uno, Marikina City </div>
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

export default AboutUsScreen;