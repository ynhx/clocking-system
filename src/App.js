import './App.css';
import Login from './components/login/Login';
import ResetPassword from './components/reset-password/ResetPassword';
import HRLogin from './components/login/HRLogin';
import UserDashboard from './components/dashboards/UserDashboard';
import HRDashboard from './components/dashboards/HRDashboard';
import AccountFound from './components/reset-password/AccountFound';
import Overview from './components/dashboards/hr-dashboard-comps/Overview';
import UsersList from './components/dashboards/hr-dashboard-comps/UsersList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/hr-login" element={<HRLogin />}/>
        <Route path="/user-dashboard" element={<UserDashboard />}/>
        <Route path="/account-found" element={<AccountFound />}/>
        <Route path="/hr-dashboard" element={<HRDashboard />}>
          <Route index element={<Overview />} />
          <Route path="users" element={<UsersList />} />
        </Route>
      </Routes>
    </Router>
    //
  );
}

export default App;