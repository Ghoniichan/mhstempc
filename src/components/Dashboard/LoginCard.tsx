import '../../../src/styles/custom-bootsrap.scss';
import logo from '../../../src/assets/Images/mhstempc_logo.png';


const LoginCard = () => {
    return(
        // Main container
        <div className='MainContainer'
        style={{display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw'}}>

            {/* Login Container */}
            <div className='row border rounded-3 p-3 bg-white shadow box-area' 
            style={{width: '960px', 
                    height: '600px', 
                    margin:'0 auto',}}>

                {/* Left box */}
                <div className='col-md-6 rounded-3 d-flex justify-content-center align-items-center flex-column left-box' 
                style={{background: '#f7f7f7'}}>
                    <div>
                        <img src={logo} alt='mhstempcLogo' className='img-fluid' width="260px" 
                        style={{marginBottom:'30px',
                                paddingTop: '25px'
                        }} />
                    </div>
                    <small className='fs-5 fw-normal alegreya-sans-regular'>MARIKINA HIGH SCHOOL TEACHERS EMPLOYEE</small>
                    <p className='mb-0 fs-1 fw-bold alegreya-sans-bold'>MHSTEMPC</p>
                    <small className='d-block mb-5 fs-5 fw-normal alegreya-sans-regular'>MULTI-PURPOSE COOPERATIVE</small>
                </div>

                    {/* Right box */}
                    <div className="col-md-6 right-box">
                        <div className='align-items-center'>
                            <div className="header">
                                <p className="mb-0 fw-bold gothic-a1-bold" 
                                style={{fontSize:'25px', 
                                        paddingTop: '65px', 
                                        paddingLeft: '10px'}}>Log In to your Account</p>
                                <small className="d-block mb-5 fs-normal gothic-a1-regular" 
                                style={{paddingLeft: '10px'}}>Welcome back!</small>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default LoginCard