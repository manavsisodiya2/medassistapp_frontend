import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Heading from "../Component/Heading";
import Swal from "sweetalert2";
import doctorimage from "../assets/doctor.webp" 
import listdoctor from "../assets/listdoctor.png"
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import { RestaurantOutlined } from "@mui/icons-material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccessibleIcon from '@mui/icons-material/Accessible';
import {Routes,Route,useNavigate} from "react-router-dom"




const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    // background: "#a5b1c2",
    backgroundImage:"URL(data:image/png;base64,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)",
    display: "flex",
    alignItems:"center",
    justifyContent:"center"
    
    
  },
  box: {
    width: 1000,
    height:'auto' ,
    background: "#fff",
    borderRadius: 10,
    padding: 15,
                       
    },
}));


export default function Main(){
    var classes=useStyles()
    var navigate=useNavigate()

    return(
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="outlined" size ="large" color= "error" fullWidth onClick={()=>navigate('/adminlogin')} startIcon={<AdminPanelSettingsIcon />}>
                        Admin Login
                    </Button>
                    
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="outlined" size ="large" color= "secondary" fullWidth onClick={()=>navigate('/doctorlogin')} startIcon={<SupervisorAccountIcon />}>
                        Doctor Login
                    </Button>
                    
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="outlined" size ="large" color= "success" fullWidth onClick={()=>navigate('/patientlogin')} startIcon={<AccessibleIcon />}>
                        Patient Login
                    </Button>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </div>
        </div>
    )

}