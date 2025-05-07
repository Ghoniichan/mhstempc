import './App.css'
import Sidebar from './components/Dashboard/Sidebar'
import LoginCard from './components/Dashboard/LoginCard'
import InputField from './components/Dashboard/InputField'
import PasswordField from './components/Dashboard/PasswordField'
import CustomButton from './components/Dashboard/CustomButton'
import ProfileSection from './components/Dashboard/ProfileSection'
import DateInput from './components/Dashboard/DateInput'




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

          
    //       {/* LoginCard */}
    //       <LoginCard/>

    //         <InputField/>

    //         <PasswordField/>

    //         <CustomButton/>

    //         <ProfileSection/>

            <DateInput/>

    //        <Sidebar/>
              // <NavBar/>

              // <SearchBar/>

              //<EditStatus/>




    //     </div>
    //   </div>
    // </div>
  )
}

export default App