import '../../../src/styles/custom-bootsrap.scss';
import './ProfileSection.css'
import ProfileIcon from '../../../src/assets/Images/ProfileIcon.png';
// import { useState } from 'react';


// const EditButton = () => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);

//     const handleClick = () => {
//         setIsEditing(!isEditing);
//         //functionality

//     };
// }

const ProfileSection = () => {
    return (
        <div className="sectionnn" style={{
            justifyContent: 'center',
            alignItems:'center',
            width: '100vw'
        }}>
           
            <div className="py-4 profileSection">
                <div className="containerr">
                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="card text-center h-100 shadow-sm profilePicture" style={{backgroundColor: '#F8FAFC'}}>
                                <div className="card-body d-flex flex-column align-items-center mb-3">
                                   <div className="position-relative w-100">
                                        <button className='btn position-absolute top-0 end-0' 
                                        style={{backgroundColor: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            top: '10px',
                                            right: '10px',
                                            zIndex: 10,
                                            padding: '1px',

                                        }}
                                        // onClick={handleClick}
                                        // onMouseEnter={() => setIsHovered(true)}
                                        // onMouseLeave={() => setIsHovered(false)}
                                            // title={isEditing ? 'Save changes' : 'Edit'}
                                            // <EditIcon
                                            //     color={isEditing ? 'white' : '#002D62'}

                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                width="20" 
                                                height="20" 
                                                fill="currentColor" 
                                                className="bi bi-pencil-square" 
                                                viewBox="0 0 15 15">

                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>

                                    </div> 
                                    <img src ={ProfileIcon} alt='profileLogo' className='mb-4' width='110px'/>
                                    <h5 className='mb-1 fs-extrabold gothic-a1-extrabold'>Bandasan, Michaela Joy</h5>
                                    <small className='text-muted fs-normal gothic-a1-normal'>ID No.:</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 ">
                            <div className="card h-100 shadow-sm profileNameLoc" style={{backgroundColor: '#F8FAFC'}}>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>First Name</label>
                                            <input type='text' className='form-control ProfileinputBox' placeholder='First Name'/>
                                        </div>
                                        <div className="col-md-4">
                                            <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Middle Name</label>
                                            <input type='text' className='form-control ProfileinputBox' placeholder='Middle Name'/>
                                        </div>
                                        <div className="col-md-4">
                                            <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Last Name</label>
                                            <input type='text' className='form-control ProfileinputBox' placeholder='Last Name'/>
                                        </div>
                                        <div className="col-md-8">
                                            <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Address</label>
                                            <input type='text' className='form-control ProfileinputBox' placeholder='Address'/>
                                        </div>
                                        <div className="col-md-4">
                                            <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>ZIP Code</label>
                                            <input type='text' className='form-control ProfileinputBox' placeholder='ZIP Code'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm mt-4 profileGenInfo" style={{backgroundColor: '#F8FAFC'}}>
                        <div className="card-body mb-1">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Email Address</label>
                                    <input type='text' className='form-control ProfileinputBox' placeholder='Email Address'/>
                                </div>
                                <div className="col-md-4">
                                    <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Department</label>
                                    <input type='text' className='form-control ProfileinputBox' placeholder='Department'/>
                                </div>
                                <div className="col-md-4">
                                    <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>MHSTEMPC Policy Number</label>
                                    <input type='text' className='form-control ProfileinputBox' placeholder='MHSTEMPC Policy Number'/>
                                </div>
                                <div className="col-md-4">
                                    <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Contact No.</label>
                                    <input type='text' className='form-control ProfileinputBox' placeholder='Contact No.'/>
                                </div>
                                <div className="col-md-4">
                                    <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Type of Membership</label>
                                    <select className='form-select ProfileinputBox'>
                                        <option value='Regular' selected>Regular</option>
                                        <option value='Non-member'>Non-member</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className='form-label fs-semibold gothic-a1-semibold mb-0 textTitle'>Date of Membership</label>
                                    <input type='date' className='form-control ProfileinputBox'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection
