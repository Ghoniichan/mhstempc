import './App.css'
import DateInput from './components/Dashboard/DateInput'
import ProfileSection from './components/Dashboard/ProfileSection';
import CustomButton from './components/Dashboard/CustomButton';
import LoginCard from './components/Dashboard/LoginCard';
import Sidebar from './components/Dashboard/Sidebar'
import InputField from './components/Dashboard/InputField';
import PasswordField from './components/Dashboard/PasswordField';





function App() {

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="col p-4">
          <h2>Main Content</h2>
          <p>This is the main content area.</p>

          
          {/* LoginCard */}
          <LoginCard/>

            InputField
            <InputField/>

            PasswordField
            <PasswordField/>

            CustomButton
            <CustomButton/>

            <ProfileSection/>

            <DateInput/>

            <ProfileSection/>
        </div>
      </div>
    </div>
  )
}

export default App