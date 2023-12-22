import DoctorInterface from "./Screens/DoctorInterface";
import DisplayAllDoctor from "./Screens/DisplayAllDoctors";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import DoctorTimingInterface from "./Screens/DoctorTimingInterface";
import DisplayAllTimings from "./Screens/DisplayAllTimings"
import AdminLogin from "./Screens/AdminLogin";
import AdminDashboard from "./Screens/AdminDashboard";
import QuestionInterface from "./Screens/QuestionInterface";
import UserRegistration from "./Screens/UserRegistration";
import QueryQuestions from "./Screens/QueryQuestionsInterface";
import DoctorLogin from "./Screens/DoctorLogin";
import DoctorDashboard from "./Screens/DoctorDashboard";
import PatientLogin from "./Screens/PatientLogin";
import PatientDashboard from "./Screens/PatientDashboard";
import ListofDoctors from "./Screens/ListofDoctors";
import Main from "./Screens/main";
function App() {
  return (
   <div>
    <Router>
      <Routes>
          
          <Route element={<DisplayAllTimings/>} path="/displayalltimings"/>
          <Route element={<AdminLogin/>} path="/adminlogin"/>
          <Route element={<UserRegistration/>} path="/userregistration"/>
          <Route element={<PatientLogin/>} path="/patientlogin"/>
          <Route element={<AdminDashboard/>} path="/admindashboard/*"/>
          <Route element={<DoctorLogin/>} path="/doctorlogin"/>
          <Route element={<DoctorDashboard/>} path="/doctordashboard/*"/>
          <Route element={<PatientDashboard/>} path="/patientdashboard/*"/>
          <Route element={<ListofDoctors/>} path="/listdoctors"/>
          <Route element={<DoctorInterface/>} path="/doctorinterface"/>
          <Route element={<Main/>} path="/main/*"/>
        
           
      </Routes>
    </Router>
   </div>  
  );
}

export default App;
