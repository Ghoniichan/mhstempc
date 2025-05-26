import CustomButton from "../components/Dashboard/CustomButton"
import ColumnLayoutCard from "../components/Dashboard/ColumnLayoutCard"
import '../screens/CreateNewPass.css'

import { useNavigate } from 'react-router-dom';


const CreateNewPass = () => {
    const navigate = useNavigate();

    const handleReset = () => {
        navigate('/password-reset');
    }
    return(
        <div style={{display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '49vh',
                padding: '20px 0'}}>
            <ColumnLayoutCard 
                title={"Create new password"} 
                description={"Your new password must be different from your previously used password."}
                titleStyle={{fontSize: '21px', paddingLeft: '15px'}}
                descriptionStyle={{fontSize: '15px',
                                    color: '#1e1e1e',
                                    textAlign: 'left',
                                    paddingLeft: '15px'
                }}>
                
                <div className='subCont'>
                    <div className="input">
                        <input type="password" id="password" className="inputBox form-control ps-5" placeholder="Enter New Password"
                        style={{border: '1px solid #002d62'}}/>
                        <i className="icon bi bi-lock-fill position-absolute"></i>
                    </div>
                    
                    <div className="input">
                        <input type="password" id="password" className="inputBox form-control ps-5" placeholder="Re-enter Password"
                        style={{border: '1px solid #002d62'}}/>
                        <i className="icon bi bi-lock-fill position-absolute"></i>
                    </div>
                    
                </div>
                <CustomButton label="Reset Password" type="button" onClick={handleReset}/>
            </ColumnLayoutCard>
                            
                            
                            

                

        </div>
    )
}

export default CreateNewPass