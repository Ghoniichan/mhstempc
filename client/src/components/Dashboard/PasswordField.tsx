import '../../../src/styles/custom-bootsrap.scss';
import './PasswordField.css'

const PasswordField = () => {
      
      return (
        <div className="MainContainer mb-1">
          <div className='subCont'>
            <label htmlFor="password" className="TextLabel form-label text-start gothic-a1-semibold mb-0">Password</label>
              <div className="input">
                <input type="password" id="password" className="inputBox form-control ps-5" placeholder="Password"
                style={{border: '1px solid #002d62'}}/>
                <i className="icon bi bi-lock-fill position-absolute"></i>
              </div>
              <div className="text-end">
                <a href="/forgot-password" className="password gothic-a1-bold">Forgot Password?</a>
              </div>
          </div>
        </div>
    )
}

export default PasswordField