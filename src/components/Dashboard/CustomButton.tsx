import '../../../src/styles/custom-bootsrap.scss';
import './CustomButton.css'

const CustomButton = () => {
    return(
        <div className="container"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw', 
            height: '100vh' 
          }}>
            <div className="subCont mb-3">
                <button type="button" className='CusButton btn-btn gothic-a1-extrabold'>Log in</button>
            </div>
        </div>
    )

}

export default CustomButton