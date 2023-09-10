import DoctorInterface from "./Screens/DoctorInterface";
import DisplayAllDoctor from "./Screens/DisplayAllDoctors";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import DoctorTimingInterface from "./Screens/DoctorTimingInterface";
import DisplayAllTimings from "./Screens/DisplayAllTimings"
import AdminLogin from "./Screens/AdminLogin";
import AdminDashboard from "./Screens/AdminDashboard";

function App() {
  return (
   <div>
    <Router>
      <Routes>
          
          <Route element={<DisplayAllTimings/>} path="/displayalltimings"/>
          <Route element={<AdminLogin/>} path="/adminlogin"/>
          <Route element={<AdminDashboard/>} path="/admindashboard/*"/>
      </Routes>
    </Router>
   </div>  
  );
}

export default App;
