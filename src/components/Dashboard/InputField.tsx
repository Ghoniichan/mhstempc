import '../../../src/styles/custom-bootsrap.scss';
import './InputField.css';

const InputField = () => {
    return(
        <div className="MainContainer mb-3" 
          style={{display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100vw'}}>

          <div className='subCont'>
            <label htmlFor="email" className="TextLabel form-label text-start gothic-a1-semibold mb-0">Email</label>
            <div className="input">
              <input type="email" id="email" className="inputBox form-control ps-5" placeholder="Email"
              style={{border: '1px solid #002d62'}}/>
              <i className="icon bi bi-envelope position-absolute"></i>

            </div>
          </div>
        </div>
    )
}

export default InputField