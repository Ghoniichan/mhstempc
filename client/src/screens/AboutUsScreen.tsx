import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import '../screens/AboutUs.css';

const AboutUsScreen = () => {
  return (
    <div className="about-us-screen-wrapper  " style={{ height: "100vh" }}>
      <NavBar />
      <div className="about-us-container">
        <div className="about-us-content py-3">

          {/* Title Section */}
          <div className="title-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 className="about-us-title gothic-a1-bold">About Us</h1>
          </div>

          {/* Mission and Vision Cards */}
          <div className="cards-section">
            <div className="card-wrapper">
              <div className="mission-vision-card shadow">
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

            <div className="card-wrapper">
              <div className="mission-vision-card shadow">
                <div className="card-body p-2">
                  <h3 className="card-title gothic-a1-bold">Vision</h3>
                  <p className="card-text mb-1 gothic-a1-regular">
                    To continuously improve all aspects of operation: environmental, social, and economic.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Location Map Section */}
          <div className="location-wrapper mt-0 d-flex justify-content-center">
            <div
              className="location-card shadow rounded p-3"
              style={{ maxWidth: "730px", width: "100%", backgroundColor: "#fff" }}
            >
              <div className="d-flex align-items-center mb-3">
                <div className="location-icon me-2" style={{ fontSize: "24px", color: "#e74c3c" }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="location-text gothic-a1-bold" style={{ fontSize: "18px" }}>
                  F. Torres St. Concepcion Uno, Marikina City
                </div>
              </div>

              <div className="map-container rounded overflow-hidden" style={{ width: "100%", height: "300px" }}>
                <iframe
                  title="Google Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  src="https://www.google.com/maps?q=F.+Torres+St.+Concepcion+Uno,+Marikina+City&output=embed"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Optional scroll padding */}
          <div style={{ height: "150px" }}></div>

        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default AboutUsScreen;
