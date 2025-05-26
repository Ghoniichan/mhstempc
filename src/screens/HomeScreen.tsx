import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import logo from '../../src/assets/Images/mhstempc_logo.png';
import '../screens/HomeScreen.css';

const HomeScreen = () => {
  return (
    <div style={{display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '70px',
                paddingTop: '40px'
                    }}>
      <NavBar />

        <div className="container d-flex justify-content-center align-items-center text-center">
            <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                <img 
                    src={logo} 
                    alt="MHSTEMPC Logo" 
                    className="img-fluid" 
                    width="350px"
                    style={{ marginBottom: '0.25rem', 
                            justifyContent: 'center',
                            maxWidth: '80%',
                            height: 'auto' }}
                />
                </div>

                <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                  <small className="nameOne mt-0 alegreya-sans-regular">MARIKINA HIGH SCHOOL TEACHERS EMPLOYEES</small>
                  <p className="nameTwo mb-0 alegreya-sans-bold">MHSTEMPC</p>
                  <small className="nameOne d-block mb-5 alegreya-sans-regular">
                      MULTI-PURPOSE COOPERATIVE
                  </small>
                </div>
            </div>
        </div>


      <BottomBar />
    </div>
  );
};

export default HomeScreen;
