import '../../../src/styles/custom-bootsrap.scss';
import './InputField.css'

const DateInput = () => {
    return (
        <div className='boxOne' style={{display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100vw'}}>
            <div className="boxTwo">
                <div className="col">
                    <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Date of Membership</label>
                        <input type='date' className='form-control ProfileinputBox'/>
                </div>
            </div>
        </div>
    )
}

export default DateInput