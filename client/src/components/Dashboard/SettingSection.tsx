
import './SettingSection.css';


const SettingSection = () => {
    return (
        <div>
            <h3>Settings</h3>
            <hr></hr>
                <h5  className="custom-header"> Account </h5>
                    <div className="card h-100 shadow-lg p-3 mb-5 bg-white rounded rounded">
                        <button type="button" className="btn text-nowrap text-start">
                            <h5>Update Profile</h5>
                            <p className="mb-0">Update your personal information</p>
                        </button>

                        <button type="button" className="btn text-nowrap text-start">
                            <h5>Update Mobile Number</h5>
                            <p className="mb-0">Update the mobile number used to receive your OTP </p>
                        </button>

                        <button type="button" className="btn text-nowrap text-start">
                            <h5>Change Password</h5>
                            <p className="mb-0">Change your password regularly for your security</p>
                        </button>
                    </div>

                <h5  className="custom-header"> Security </h5>
                    <div className="card h-100 shadow-lg p-3 mb-5 bg-white rounded rounded ">
                        <button type="button" className="btn text-nowrap text-start">
                            <h5>Audit Logs</h5>
                            <p className="mb-0">Check your security</p>
                        </button>
                    </div>

                <h5  className="custom-header"> About </h5>
                    <div className="card h-100 shadow-lg p-3 mb-5 bg-white rounded rounded ">
                        <button type="button" className="btn text-nowrap text-start">
                            <h5 className="mb-0">About MHSTEMPC</h5>
                        </button>
                    </div>
        </div>
    );
};

export default SettingSection;
