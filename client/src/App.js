import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import PublicRoute from './components/PublicRoute.js';
import ApplyDoctor from './pages/ApplyDoctor.js';
import Notification from './pages/Notification.js';
import Doctors from './pages/admin/Doctors.js';
import Users from './pages/admin/Users.js';
import Profile from './pages/doctor/Profile.js';
import BookingPage from './pages/BookingPage.js';
import Appointments from './pages/Appointments.js';
import DoctorAppointments from './pages/doctor/DoctorAppointments.js';
import Profiles from './pages/Profiles.js';
import UploadPic from './pages/UploadPic.js';
import GoogleLoginButton from './pages/GoogleLoginButton.js';
function App() {
  const {loading}=useSelector(state=>state.alerts);
  return (
    <>
    <BrowserRouter>
    {loading ? (<Spinner/>):( <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
      <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>}/>
      <Route path='/all-notification' element={<ProtectedRoute><Notification/></ProtectedRoute>}/>
      <Route path='/admin/doctors' element={<ProtectedRoute><Doctors/></ProtectedRoute>}/>
      <Route path='/admin/users' element={<ProtectedRoute><Users/></ProtectedRoute>}/>
      <Route path='/doctor/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/doctor/book-appointment/:doctorId' element={<ProtectedRoute><BookingPage/></ProtectedRoute>}/>
      <Route path='/appointments' element={<ProtectedRoute><Appointments/></ProtectedRoute>}/>
      <Route path='/doctor-appointment' element={<ProtectedRoute><DoctorAppointments/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profiles/></ProtectedRoute>}/>
      <Route path='/upload-image' element={<ProtectedRoute><UploadPic/></ProtectedRoute>}/>
      {/* <Route path='/login/:token' element={<PublicRoute><GoogleLoginButton/></PublicRoute>}/> */}
      <Route path='/login-success' element={<PublicRoute><GoogleLoginButton/></PublicRoute>}/>
    </Routes>)}
   
    </BrowserRouter>
    </>
  );
}

export default App;
