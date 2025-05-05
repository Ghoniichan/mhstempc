import './App.css'
import React from 'react'
import Sidebar from './components/Dashboard/Sidebar'
import LoginCard from './components/Dashboard/LoginCard'
import InputField from './components/Dashboard/InputField'
import PasswordField from './components/Dashboard/PasswordField'
import CustomButton from './components/Dashboard/CustomButton'
import ProfileSection from './components/Dashboard/ProfileSection'
import DateInput from './components/Dashboard/DateInput'



import 'bootstrap/dist/css/bootstrap.min.css';
// import Sidebar from './components/Dashboard/Sidebar'
// import ColumnLayoutCard from './components/Dashboard/ColumnLayoutCard'
// import SettingSection from './components/Dashboard/SettingSection'
// import EmailSentCard from './components/Dashboard/EmailSentCard'
// import ApplicationForm from './components/Dashboard/ApplicationForm'
// import ApplicationFormSecond from './components/Dashboard/ApplicationFormSecond';
// import MembershipForm from './components/Dashboard/MembershipForm';
// import MembershipFormSecond from './components/Dashboard/MembershipFormSecond';
// import TableCard from './components/Dashboard/TableCard';
// import SimpleCard from './components/Dashboard/SimpleCard';
// import AddPaymentCard from './components/Dashboard/AddPaymentCard';
// import InformationCard from './components/Dashboard/InformationCard'; 



function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        {/* <Sidebar /> 
        
        {/* Main Content */}
        <div className="col p-4">

          <h2>Main Content</h2>
          <p>This is the main content area.</p>

          
          {/* LoginCard */}
          <LoginCard/>

            <InputField/>

            <PasswordField/>

            <CustomButton/>

            <ProfileSection/>

            <DateInput/>

          <div>
            {/* Custom components commented out */}
            {/* <ColumnLayoutCard title="Forgot Password" description="Enter the email address associated with your account ">
              <label htmlFor="inputEmail" className="form-label" style={{ fontSize: "12px" }}>Email</label>
              <input 
                  type="email" 
                  id="inputEmail" 
                  className="form-control" 
                  placeholder="Email"
              />
            </ColumnLayoutCard>
              
            <ColumnLayoutCard title="Create New Password" description="Your new password must be different from your previously used password">
              <div className="input-group mt-3">
                  <input 
                    type="password" 
                    className="form-control input-with-icon" 
                    placeholder="Enter new Password" 
                  />
              </div> 

              <div className="input-group mt-3">
                  <input 
                    type="password" 
                    className="form-control input-with-icon" 
                    placeholder="Re-enter Password" 
                  />
              </div> 
            </ColumnLayoutCard>
            
            <SettingSection></SettingSection>
            */}
            {/* <EmailSentCard 
              title="Email Sent"
              description="We have sent a password recovery email. Check your inbox and follow the instructions to reset your password."
              sub_description="Did not receive the email?">
              <a href="#" className="link-primary ms-1">Resend Email</a>
            </EmailSentCard>  */}
            {/* <ApplicationForm></ApplicationForm> */}
            {/* <ApplicationFormSecond></ApplicationFormSecond> */}
            {/* <MembershipForm></MembershipForm> */}
            {/* <MembershipFormSecond></MembershipFormSecond> */}
            {/* <TableCard>
            </TableCard> */}
            {/* <SimpleCard 
            title="Applications">
            </SimpleCard>

            <SimpleCard 
            title="Missed Payments">
            </SimpleCard>

            <SimpleCard 
            title="Loans">
            </SimpleCard>

            <SimpleCard 
            title="Payments">
            </SimpleCard> */}

            {/* <div>
              <AddPaymentCard ></AddPaymentCard>
            </div> */}

            {/* <InformationCard 
              title="NAME PLACEHOLDER"
              department="Faculty Department"
              policyNumber="123456"
              address="Marikina City"
              contactNumber="09123456789"
              loanStatus="Pending"
              membershipType="Regular"
              membershipDate="2023-10-01"
              >
            </InformationCard> */}

            

          </div>


        </div>
      </div>
    </div>
  )
}

export default App