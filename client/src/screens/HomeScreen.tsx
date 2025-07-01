import NavBar from "../components/Dashboard/NavBar";
import BottomBar from "../components/Dashboard/BottomBar";
import logo from '../../src/assets/Images/mhstempc_logo.png';
import '../screens/HomeScreen.css';

const HomeScreen = () => {
  return (
    <div className="home-wrapper">
      <NavBar />
      <div className="home-content container d-flex justify-content-center align-items-center text-center">
        <div className="row flex-nowrap align-items-center justify-content-center home-banner">
          <div className="col-auto">
            <img 
              src={logo} 
              alt="MHSTEMPC Logo" 
              className=" logo-image mb-3" 
            />
          </div>

          <div className="text-block col text-start">
            <small className="nameOne mt-0 alegreya-sans-regular">
              MARIKINA HIGH SCHOOL TEACHERS EMPLOYEES
            </small>
            <p className="nameTwo mb-0 alegreya-sans-bold">MHSTEMPC</p>
            <small className="nameOne d-block mb-5 alegreya-sans-regular">
              MULTIPURPOSE COOPERATIVE
            </small>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default HomeScreen;
