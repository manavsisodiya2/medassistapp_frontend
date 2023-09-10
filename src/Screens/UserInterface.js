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

import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import { RestaurantOutlined } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: "#78e08f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 800,
    height: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
  },
}));

export default function UserInterface(props){
  const [username, setusername] = useState("");
  const [Gender, setGender] = useState("");
  const [dob, setDOB] = useState("1/1/1");
  const [emailId, setEmailId] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});


  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }));

    console.log("Error", formError);
  };

  const isError = () => {
    var error = false;
    if (username.length == 0) {
      handleError("user Name Should Not Be Blank", "username");
      error = true;
    }

    if (Gender.length == 0) {
      handleError("Select Gender", "gender");
      error = true;
    }
    if (dob.length == 0) {
      handleError("Pls input DOB", "dob");
      error = true;
    }
    if (emailId.length == 0 ||!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailId)) {
      handleError("Pls Input Correct Email Id", "emailid");
      error = true;
    }
    if (mobileno.length == 0 || !/^[0-9]{10}$/.test(mobileno)) {
      handleError("Pls Input Correct Mobile Number", "mobileno");
      error = true;
    }

    return error;
  };
  
  const handleSubmit = async () => {
    if (!isError()) {
      var formData = new FormData();
      formData.append("username", username);
      formData.append("gender", Gender);
      formData.append("dob", dob);
      formData.append("emailid", emailId);
      formData.append("mobileno", mobileno);
      formData.append("password", `${username}##`);

      var result = await postData("usersubmit", formData);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
        });
      }
    }
  };

  const handleReset = () => {
    setusername("");
    setPassword("");
    setMobileno("");
    setEmailId("");
    setDOB("1/1/1");
      
    };


  var classes=useStyles();
  return(
  <div className={classes.container}>
  <div className={classes.box}>
      <Grid container spacing={3}>
          
          <Grid item xs={6}>
              <TextField
              error={formError.doctorname}
              onFocus={() => handleError("", "doctorname")}
              onChange={(event) => setusername(event.target.value)}
              label="User Name"
              value={username}
              helperText={formError.doctorname}
              fullWidth
              />
          </Grid>
          
          <Grid item xs={6}>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                error={formError.gender}
                onFocus={() => handleError("", "gender")}
                value="Female"
                control={<Radio />}
                label="Female"
                onChange={(event) => setGender(event.target.value)}
              />
              <FormControlLabel
                error={formError.gender}
                onFocus={() => handleError("", "gender")}
                value="Male"
                control={<Radio />}
                label="Male"
                onChange={(event) => setGender(event.target.value)}
              />
              <FormControlLabel
                error={formError.gender}
                onFocus={() => handleError("", "gender")}
                value="Other"
                control={<Radio />}
                label="Other"
                onChange={(event) => setGender(event.target.value)}
              />
            </RadioGroup>
            {formError.gender ? (
              <FormHelperText style={{ color: "red" }}>
                {formError.gender}
              </FormHelperText>
            ) : (
              <></>
            )}
            </FormControl>
          </Grid>
          
          {/* <Grid item xs={6}>
              <TextField
              // error={formError.doctorname}
              // onFocus={() => handleError("", "doctorname")}
              // onChange={(event) => setDoctorName(event.target.value)}
              label="city"
              
              // helperText={formError.doctorname}
              fullWidth
              />
          </Grid> */}
          
          <Grid item xs={6}>
              <TextField
              error={formError.dob}
              onFocus={() => handleError("", "dob")}
              onChange={(event) => setDOB(event.target.value)}
              value={dob}
              type="date"
              label="Date of Birth"
              helperText={formError.dob}
              fullWidth
              />
          </Grid>
          
          <Grid item xs={3}>
          <TextField
            error={formError.emailid}
            onFocus={() => handleError("", "emailid")}
            value={emailId}
            label="Email Id"
            fullWidth
            onChange={(event) => setEmailId(event.target.value)}
            helperText={formError.emailid}
              />
          </Grid>
          
          <Grid item xs={3}>
              <TextField
              error={formError.mobileno}
              onFocus={() => handleError("", "mobileno")}
              value={mobileno}
              onChange={(event) => setMobileno(event.target.value)}
              label="Mobile Number"
              helperText={formError.mobileno}
              fullWidth
              />
          </Grid>
          
          <Grid item xs={6}>
              <Button 
              onClick={handleSubmit} 
              fullWidth variant="contained">
              Submit
              </Button>
          </Grid>

          <Grid item xs={6}>
              <Button 
              onClick={() => handleReset()} 
              fullWidth variant="contained">
              Reset
              </Button>
          </Grid>
          

      </Grid>
  </div>
  </div>    
      )
}