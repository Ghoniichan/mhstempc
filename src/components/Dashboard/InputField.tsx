import '../../../src/styles/custom-bootsrap.scss';
import emailIcon from '../../../src/assets/Images/email_Icon.png';

import './style.css';

const InputField = () => {
    return(
        <div className="MainContainer mb-3" 
          style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          width: '100wh',
          height: '100vh'
          }}>
          <div className='subCont'>
            <label htmlFor="email" className="TextLabel form-label text-start gothic-a1-semibold mb-0">Email</label>
            <div className="input">
              <input type="email" id="email" className="inputBox form-control ps-5" placeholder="Email"/>
              <img src={emailIcon} alt="Email Icon" className="icon"/>
            </div>
          </div>
        </div>
    )
}

export default InputField