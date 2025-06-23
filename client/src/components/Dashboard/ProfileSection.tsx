import { useState, useRef, ChangeEvent, useEffect } from 'react';
import './ProfileSection.css';
import ProfileIcon from '../../../src/assets/Images/ProfileIcon.png';
import axios from '../../api/axiosInstance';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(ProfileIcon);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // form data and a snapshot of original data for cancel
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    zip: '',
    email: '',
    department: '',
    policyNumber: '',
    contact: '',
    membershipType: 'Regular',
    dateOfMembership: '',
  });
  const [originalData, setOriginalData] = useState(formData);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleProfilePicClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = 'This field is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    // here you would also POST to your API
    setOriginalData(formData);
    alert('Your personal information has been successfully updated.');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setErrors({});
    setIsEditing(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setIsLoading(false);
      return;
    }
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    const id = decoded?.user?.id;

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/api/user/profile/${id}`);
        const data = response.data;
        const mappedData = {
          firstName: data.first_name || '',
          middleName: data.middle_name || '',
          lastName: data.last_name || '',
          address: data.present_address || '',
          zip: '',
          email: data.fb_acc_email_address || '',
          department: '',
          policyNumber: data.policy_number || '',
          contact: data.tel_cel_no || '',
          membershipType: 'Regular',
          dateOfMembership: data.membership_date
            ? new Date(data.membership_date).toISOString().slice(0, 10)
            : '',
        };
        setFormData(mappedData);
        setOriginalData(mappedData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return (
      <div className="ps-loading-wrapper d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-wrapper">
      <div className="ps-section">
        <div className="ps-container container">
          <div className="ps-row row g-4 align-items-stretch">

            {/* Profile Image Section */}
            <div className="ps-col-left col-md-3 col-12 d-flex">
              <div className="ps-profile-card card text-center shadow-sm flex-fill" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="ps-card-body card-body mb-3">
                  <div className="ps-edit-wrapper position-relative w-100 text-end">
                    <button className="ps-edit-btn btn position-absolute" onClick={handleEditToggle} style={{ top: 10, right: 10 }}>
                      <i className="bi bi-pencil-square" style={{ fontSize: '25px' }}></i>
                    </button>
                  </div>
                  <div className="ps-profile-img-wrapper">
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="ps-profile-img mb-3"
                      onClick={handleProfilePicClick}
                      style={{ borderRadius: '50%', cursor: isEditing ? 'pointer' : 'default' }}
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleProfilePicChange}
                  />
                  <h5 className="ps-name mb-1">
                    {formData.lastName && formData.firstName
                      ? `${formData.lastName}, ${formData.firstName} ${formData.middleName}`
                      : 'Your Name'}
                  </h5>
                  <small className="ps-id text-muted">
                    ID No.: {formData.policyNumber || '—'}
                  </small>
                </div>
              </div>
            </div>

            {/* Name & Address Section */}
            <div className="ps-col-right col-md-9 col-12 d-flex">
              <div className="ps-name-card card shadow-sm flex-fill" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="card-body">
                  <div className="row g-3"  style={{ textAlign: 'left' }}>
                    {[
                      { label: 'First Name', name: 'firstName' },
                      { label: 'Middle Name', name: 'middleName' },
                      { label: 'Last Name', name: 'lastName' },
                    ].map(({ label, name }) => (
                      <div key={name} className="col-md-4 col-12">
                        <label className="form-label ps-label">{label}</label>
                        <input
                          name={name}
                          value={formData[name as keyof typeof formData]}
                          onChange={handleInputChange}
                          className={`form-control ps-input ${errors[name] ? 'is-invalid' : ''}`}
                          type="text"
                          placeholder={label}
                          disabled={!isEditing}
                        />
                        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                      </div>
                    ))}

                    <div className="col-md-9 col-12">
                      <label className="form-label ps-label">Address</label>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`form-control ps-input ${errors.address ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder="Address"
                        disabled={!isEditing}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <div className="col-md-3 col-12">
                      <label className="form-label ps-label">ZIP Code</label>
                      <input
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={`form-control ps-input ${errors.zip ? 'is-invalid' : ''}`}
                        type="text"
                        placeholder="ZIP Code"
                        disabled={!isEditing}
                      />
                      {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* General Info Section */}
            <div className="ps-col-bottom col-12">
              <div className="ps-info-card card shadow-sm" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="card-body">
                  <div className="row g-3" style={{ textAlign: 'left' }}>
                    {[
                      { label: 'Email Address', name: 'email' },
                      { label: 'Department', name: 'department' },
                      { label: 'MHSTEMPC Policy Number', name: 'policyNumber' },
                      { label: 'Contact No.', name: 'contact' },
                    ].map(({ label, name }) => (
                      <div key={name} className="col-md-4 col-12">
                        <label className="form-label ps-label">{label}</label>
                        <input
                          name={name}
                          type="text"
                          className={`form-control ps-input ${errors[name] ? 'is-invalid' : ''}`}
                          placeholder={label}
                          value={formData[name as keyof typeof formData]}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                      </div>
                    ))}

                    <div className="col-md-4 col-12">
                      <label className="form-label ps-label">Type of Membership</label>
                      <select
                        name="membershipType"
                        value={formData.membershipType}
                        onChange={handleInputChange}
                        className="form-select ps-input"
                        style={{width: '345px'}}
                        disabled={!isEditing}
                      >
                        <option value="Regular">Regular</option>
                        <option value="Non-member">Non-member</option>
                      </select>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="form-label ps-label">Date of Membership</label>
                      <input
                        type="date"
                        name="dateOfMembership"
                        value={formData.dateOfMembership}
                        onChange={handleInputChange}
                        className={`form-control ps-input ${errors.dateOfMembership ? 'is-invalid' : ''}`}
                        disabled={!isEditing}
                      />
                      {errors.dateOfMembership && (
                        <div className="invalid-feedback">{errors.dateOfMembership}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save & Cancel Buttons */}
            {isEditing && (
              <div className="ps-save-btn col-12 text-end mt-3 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary shadow gothic-a1-bold"
                  onClick={handleCancel}
                  style={{ width: '100px', borderRadius: '20px', color: '#002d62', height: '40px', backgroundColor: '#f0f0f0' }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary shadow gothic-a1-bold"
                  onClick={handleSave}
                  style={{ backgroundColor: '#002d62', width: '100px', borderRadius: '20px', height: '40px' }}
                >
                  Save
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
