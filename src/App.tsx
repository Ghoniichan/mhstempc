import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import HelpScreen from './screens/HelpScreen';
import FormsScreen from './screens/FormsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import LogInScreen from './screens/LogInScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NavBar from './components/Dashboard/NavBar';
import BottomBar from './components/Dashboard/BottomBar';
import CreateNewPass from './screens/CreateNewPass';
import PasswordReset from './screens/PasswordReset';
import EmailVerif from './screens/EmailVerif';
import AccountScreen from './screens/AccountScreen';
import ClientScreen from './screens/ClientScreen';
import ClientProfileLoanScreen from './screens/ClientProfileLoanScreen';

function Layout() {
  const location = useLocation();

  const hideBarsOnRoutes = ['/account', '/client', '/clientLoan'];

  const shouldHideBars = hideBarsOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideBars && <NavBar />}
      <Routes>
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
        <Route path="/account" element={<AccountScreen />} />
        <Route path='/client' element={<ClientScreen />} />
        <Route path='/clientLoan' element={<ClientProfileLoanScreen />} />
      </Routes>
      {!shouldHideBars && <BottomBar />}
      <Routes>
        
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
