import DoctorInterface from "./Screens/DoctorInterface";
import DisplayAllDoctor from "./Screens/DisplayAllDoctors";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import DoctorTimingInterface from "./Screens/DoctorTimingInterface";
import DisplayAllTimings from "./Screens/DisplayAllTimings"
import AdminLogin from "./Screens/AdminLogin";
import AdminDashboard from "./Screens/AdminDashboard";
import QuestionInterface from "./Screens/QuestionInterface";
import QueryQuestions from "./Screens/QueryQuestionsInterface";
import UserInterface from "./Screens/UserInterface";
function App() {
  return (
   <div>
    <Router>
      <Routes>
          
          <Route element={<DisplayAllTimings/>} path="/displayalltimings"/>
          <Route element={<AdminLogin/>} path="/adminlogin"/>
          <Route element={<QuestionInterface/>} path="/questioninterface"/>
          <Route element={<AdminDashboard/>} path="/admindashboard/*"/>
          <Route element={<UserInterface/>} path="/UserInterface"/>
          <Route element={<QueryQuestions/>} path="/queryquestion"/>
      </Routes>
    </Router>
   </div>  
  );
}

export default App;
