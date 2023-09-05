import DoctorInterface from "./Screens/DoctorInterface";
import DisplayAllDoctor from "./Screens/DisplayAllDoctors";
import Timings from "./Screens/timings";
import DisplayAllTimings from "./Screens/DisplayAllTimings"
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
function App() {
  return (
   <div>
    <Router>
      <Routes>
          <Route element={<DoctorInterface/>} path="/doctorinterface"/>
          <Route element={<DisplayAllDoctor/>} path="/displayalldoctor"/>
          <Route element={<Timings/>} path="/timings"/>
          <Route element={<DisplayAllTimings/>} path="/DisplayAllTimings"/>
      </Routes>
    </Router>
   </div>  
  );
}

export default App;
