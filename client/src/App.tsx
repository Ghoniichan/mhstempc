import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Screens
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import HelpScreen from './screens/HelpScreen';
import FormsScreen from './screens/FormsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import LogInScreen from './screens/LogInScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import CreateNewPass from './screens/CreateNewPass';
import PasswordReset from './screens/PasswordReset';
import EmailVerif from './screens/EmailVerif';
import ClientScreen from './screens/ClientScreen';
import ClientProfileLoanScreen from './screens/ClientProfileLoanScreen';
import ClientProfileCapitalShareScreen from './screens/ClientProfileCapitalShareScreen';
import ClientProfileSavingsScreen from './screens/ClientProfileSavingsScreen';
import Dashboard from './screens/Dashboard'; 
import Application from './screens/Application';
import RegisterApplicationFormScreen from './screens/RegisterApplicationFormScreen';
import ClientSendSmsScreen from './screens/ClientSendSmsScreen';
import AuditLogScreen from './screens/AuditLogScreen';
import AboutSettingScreen from './screens/AboutSettingScreen';
import AppointmentRequestScreen from './screens/AppointmentRequestScreen'; 


// User
import UserLoanScreen from './screens/UserLoanScreen';
import UserCapitalShare from './screens/UserCapitalShare';
import UserSavings from './screens/UserSavings';
import UserProfile from './screens/UserProfile';
import UserAppointmentScreen from './screens/UserAppointmentScreen';
import UserBugReportScreen from './screens/UserBugReportScreen';

// Components
import NavBar from './components/Dashboard/NavBar';
import BottomBar from './components/Dashboard/BottomBar';
import Sidebar from './components/Dashboard/Sidebar'; 
import Loans from './screens/Loans';
import PaymentScreen from './screens/PaymentScreen';
import MissedPayment from './screens/MissedPayment';
import AddPayment from './screens/AddPayment';
import LoanApplicationFormScreen from './screens/LoanApplicationFormScreen';
import LoanAppFormTwo from './screens/LoanAppFormTwo';
import SchedofLoanRelease from './screens/ScheduleofLoanRelease';



// Layout with Top & Bottom Bars
function MainLayout() {
  return (
    <>
      <NavBar />
      <div style={{ paddingBottom: '60px' }}>
        <Outlet />
      </div>
      <BottomBar />
    </>
  );
}

// Layout with Sidebar only
function SidebarLayout() {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div
        className="flex-grow-1 p-3"
        style={{
          overflowY: 'auto',
          height: '100vh',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
      
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Sidebar layout for dashboard and account-related pages */}
        <Route element={<SidebarLayout />}>

          //client
          <Route path="/dashboard" element={<Dashboard />} />


          <Route path="/application" element={<Application />} />
          <Route path='/applicationForm' element={<LoanApplicationFormScreen />} />
          <Route path='/applicationFormTwo' element={<LoanAppFormTwo/>}/>

          <Route path="/loans" element={<Loans />}/>
          <Route path="/loanRelease" element={<SchedofLoanRelease />} />
          <Route path="/payment" element={<PaymentScreen />}/>
          <Route path="/missedPayment" element={<MissedPayment />}/>
          <Route path='/addPayment' element={<AddPayment />} />
          
          <Route path="/client" element={<ClientScreen />} />
          <Route path="/clientLoan" element={<ClientProfileLoanScreen />} />
          <Route path="/clientCapitalShare" element={<ClientProfileCapitalShareScreen />} />
          <Route path="/clientSavings" element={<ClientProfileSavingsScreen />} />
          <Route path="/registerApplicationForm" element={<RegisterApplicationFormScreen />} />
          <Route path="/clientSendSms" element={<ClientSendSmsScreen />} />
          <Route path="/auditLog" element={<AuditLogScreen/>} />
          <Route path="/aboutSetting" element={<AboutSettingScreen />} />
          <Route path="/appointmentRequest" element={<AppointmentRequestScreen />} />

          //user
          <Route path="/userLoan" element={<UserLoanScreen />} />
          <Route path="/userCapitalShare" element={<UserCapitalShare />} />
          <Route path="/userSavings" element={<UserSavings/>} />
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/userAppointment" element={<UserAppointmentScreen />} />
          <Route path="/userBugReport" element={<UserBugReportScreen />} />
        </Route>

        {/* Main layout for general public pages */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/services" element={<ServicesScreen />} />
          <Route path="/help" element={<HelpScreen />} />
          <Route path="/forms" element={<FormsScreen />} />
          <Route path="/aboutUs" element={<AboutUsScreen />} />
          <Route path="/login" element={<LogInScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/emailVerif" element={<EmailVerif />} />
          <Route path="/newpass" element={<CreateNewPass />} />
          <Route path="/password-reset" element={<PasswordReset />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
