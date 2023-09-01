import DoctorInterface from "./Screens/DoctorInterface";
import DisplayAllDoctor from "./Screens/DisplayAllDoctors";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
function App() {
  return (
   <div>
    <Router>
      <Routes>
          <Route element={<DoctorInterface/>} path="/doctorinterface"/>
          <Route element={<DisplayAllDoctor/>} path="/displayalldoctor"/>
      </Routes>
    </Router>
   </div>  
  );
}

export default App;
