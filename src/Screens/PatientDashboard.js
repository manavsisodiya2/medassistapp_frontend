
import {InputAdornment, IconButton, AppBar,Box,Toolbar,Paper,Grid, TextField } from "@mui/material";
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DoctorInterface from "./DoctorInterface";
import DisplayAllDoctor from "./DisplayAllDoctors";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {Routes,Route,useNavigate} from "react-router-dom"
import adminimage from "../assets/admin.jpeg"
import QueryQuestionInterface from "./QueryQuestionsInterface";
import QuestionInterface from "./QuestionInterface";
import ListofDoctors from "./ListofDoctors";
import SelectedDoctor from "./SelectedDoctor"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useSelector } from "react-redux";
import PatientQuestioner from "./PatientQuestioner"

export default function PatientDashboard()
{
  var user=useSelector((state)=>state.user)
  var [status,setStatus]=useState(true)
  var userData=Object.values(user)[0]
var [pattern,setPattern]=useState('')  
var navigate=useNavigate()
 function menuList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/doctordashboard/questioninterface')}>
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Add Questions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/doctordashboard/queryquestioninterface')}>
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Add Options" />
            </ListItemButton>
          </ListItem>
      
          {/* <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonSearchIcon/>
              </ListItemIcon>
              <ListItemText primary="Patient" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
        <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/doctorlogin')}>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/main')}>
              <ListItemText primary="Go to Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}



 const appBar=()=>{
  return(  
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{background:"#22a6b3"}} position="static">
       <Toolbar>
        
         <div style={{fontWeight:'bold',fontSize:26}}>Medassist</div>
         <div style={{background:'#fff', marginLeft:'25%', width:550,padding:2,borderRadius:5}}>
          <TextField onChange={(event)=>setPattern(event.target.value)} size="small" fullWidth  sx={{border: 'none',"& fieldset": { border: 'none' },}} 
         placeholder="Search doctor here...."
         InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          
        }} /></div>
       
         <IconButton onClick={()=>navigate('/main')}  style={{color:'#fff',marginLeft:'auto'}}>
  <LogoutRounded />
</IconButton>
         </Toolbar>   
      </AppBar>
    </Box>
  )
 }   
 const sideBar=()=>{
  return(
  <Grid container spacing={1}>
    <Grid item xs={2}>
     <Paper elevation={3} style={{width:200,margin:10,padding:10,display:'flex',flexDirection:'column',borderRadius:20,alignItems:'center'}}>
       <div>
        <img src={adminimage} style={{width:80,height:80,borderRadius:40}}/>
       </div>
       <div style={{fontWeight:14,fontWeight:'bold'}}>{userData.username}</div>
       <div style={{fontWeight:10,fontWeight:300}}>+91{userData.mobileno}</div> 
       <div style={{fontWeight:10,fontWeight:300}}>{userData.emailid}</div>
       <div>
        {menuList()}
        </div> 




  </Paper>
  </Grid>

  <Grid item xs={10}>
  {status?<ListofDoctors pattern={pattern} setStatus={setStatus}/>:<></>}
  <Routes>
  <Route element={<ListofDoctors/>} path="/listofdoctors"/>
  <Route element={<SelectedDoctor/>} path="/selecteddoctor" />
  <Route element={<PatientQuestioner/>}  path="/patientquestioner"  />
  </Routes>
  </Grid>
  </Grid>

  )

 }
  return(<div>
  {appBar()}
  {sideBar()}

  </div>)

}