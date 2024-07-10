import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./Screens/Home";
import DisplayUser from "./Screens/DisplayUser";
import UserInterface from "./Screens/UserInterface";
function App() {
  return (
   <div>
    <Router>
      <Routes>
          
          <Route element={<Home/>} path="/home/*"/>
          <Route element={<UserInterface/>} path="/user"/>
          <Route element={<DisplayUser/>} path="/displayuser"/>
        
           
      </Routes>
    </Router>
   </div>  
  );
}

export default App;
