import { makeStyles } from "@material-ui/styles";
import { Grid,TextField,FormControlLabel,RadioGroup,Radio,FormLabel,FormGroup,FormControl,Checkbox, Button ,FormHelperText} from "@mui/material";
import { useState ,useEffect} from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Swal from "sweetalert2";
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import moment from "moment/moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"




const UseStyles = makeStyles((theme) => ({
    container: {
      width: "100vw",
      height: "100vh",
      background: "#78e08f",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
      width: 1000,
      height: "auto",
      background: "#fff",
      borderRadius: 10,
      padding: 15,
    },
}));


export default function Timings(props) {

  const [doctorId, setdoctorId] = useState("");
  const [startTime, setstartTime] = useState("00/00");
  const [endTime, setendTime] = useState("00/00");
  const [days, setdays] = useState("");
  const [status, setstatus] = useState("");
  const [formError,setFormError] =useState({})
  
  const handleError=(error,label)=>{
    setFormError((prev)=>({...prev,[label]:error}));
  }

  const isError = () => {
    var error = false;    
    if (doctorId.length == 0) {
      handleError("Doctor Id is not written", "doctorid");
      error = true;
    }
    if (startTime.length == 0) {
    handleError("Enter Start Time of Session", "starttime"); 
    error = true;
    }
    if (endTime.length ==0) {
      handleError("Enter End Time of Session", "endttime");
     error = true;
    }
    if (status.length== 0) {
      handleError("Select Avalilability status", "status");
      error = true;
    } 
    if (days.length == 0) {
      handleError("Select day/s", "days"); error = true;
    }
    return error;
  }


  const handleSubmit =async () => {

    if (!isError()) {
    // var body=('doctorid:doctorid, 'starttimings:startTime, 'endtimings
      var body = {doctor: doctorId,
        starttimings: startTime.toString(), 
        endtimings: endTime.toString(),
        days: days.toString(),
          status: status,}

      var result = await postData("timingsubmit", body); 
    if (result.status) {
      Swal.fire({position: "center",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 5000,
      });
      handleReset();
    
    } 
    else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result.message, 
        showConfirmButton: false,
        timer: 5000,
      
        });
     }
    }
  }



  const handleReset=()=>{
    setdoctorId("")
    setstartTime(new Date())
    setendTime(new Date())
    setstatus("")
    setdays([])
  }
  
  const handlestartTime=(event)=>{
     var t=moment(new Date(event)).format("hh:mm: A");
     setstartTime(t);
  }
  const handleendTime=(event)=>{
     var t=moment(new Date(event)).format("hh:mm: A");
     setendTime(t);
  }


  const handleDays=(event)=>{
    const {value,checked} = event.target;

    if(checked){
      setdays([...days,value])
    }else{
      setdays(days.filter((event)=>event!==value));
    }
  }
  
  
  var classes = UseStyles();
  
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <TextField
            error={formError.doctorid} 
            value={doctorId}
            helperText={formError.doctorid}
            onFocus={() => handleError("", "doctorid")} 
            onChange={(event) => setdoctorId (event.target.value)}
            label="Doctor Id"
            fullWidth/>
            
          </Grid>
          
          <Grid item xs={4}>
            <LocalizationProvider value={dayjs(startTime)} dateAdapter={AdapterDayjs}>
              <MobileTimePicker
              error={formError.starttime}
              helperText={formError.starttime}
              label="Start Time"  
              onChange={handlestartTime}
              value={dayjs (startTime)}
              fullWidth />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
          <LocalizationProvider value={dayjs(endTime)} dateAdapter={AdapterDayjs}>
              <MobileTimePicker
              error={formError.starttime}
              helperText={formError.starttime}
              label="end Time"  
              onChange={handleendTime}
              value={dayjs (endTime)}/>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <FormControl>
              <FormLabel error={formError.status}>Status</FormLabel> 
               <RadioGroup value={status} row fullWidth>
                <FormControlLabel
                  error={formError.status}
                  onFocus={() => handleError("", "status")}
                   onChange={(event) => setstatus (event.target.value)} 
                   control={<Radio />}
                   value="not available"
                   label="not available"/>
                   
                <FormControlLabel
                error={formError.status}
                onFocus ={()=>handleError("", "status")}
                onChange={(event)=>setstatus (event.target.value)}
                control={<Radio />} 
                label="Available"
                value="Available"
                />
              </RadioGroup>
            <FormHelperText error> {formError.status}</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              helperText={formError.days} 
              error={formError.days}
              fullWidth
              label="Available Days"
              value={days}
              onChange={(event) => setdays(event.target.value)}
              disabled
            />
            
          </Grid>

          <Grid item xs={12}>
            <FormGroup value={days} row >
              <FormControlLabel
                onFocus={() => handleError("", "days")}
                error={formError.days}
                onChange={handleDays}
                value="Monday"
                control={<Checkbox checked={days.includes ("Monday")} />}
                label="Monday"
              />
              <FormControlLabel
                onFocus={() => handleError("", "days")}
                error={formError.days}
                onChange ={handleDays}
                value="Tuesday"
                control={<Checkbox checked={days.includes ("Tuesday")}/>}
                label="tuesday"
              />
              <FormControlLabel
                onFocus={() => handleError("", "days")}
                error={formError.days}
                onChange ={handleDays}
                value="wednesday"
                control={<Checkbox checked={days.includes ("wednesday")} />}
                label="wednesday"
              />
              <FormControlLabel
                onFocus={() => handleError("", "days")}
                error={formError.days}
                onChange ={handleDays}
                value="thursday"
                control={<Checkbox checked={days.includes ("thuraday")} />}
                label="thursday"
              />
              <FormControlLabel
                onFocus={() => handleError("", "days")}
                error={formError.days}
                onChange ={handleDays}
                value="friday"
                control={<Checkbox checked={days.includes ("friday")} />}
                label="friday"
              />
              <FormControlLabel
                onFocus={() => handleError("", "days")}
                error={formError.days}
                onChange ={handleDays}
                value="saturday"
                control={<Checkbox checked={days.includes ("saturday")} />}
                label="saturday"
              />
              <FormControlLabel
                onFocus={() => handleError("", "days")}
                error={formError.days}
                onChange ={handleDays}
                value="sunday"
                control={<Checkbox checked={days.includes ("sunday")} />}
                label="sunday"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleSubmit}
            variant="contained" 
            color="success"
            fullWidth>
              submit
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={()=>handleReset()} 
            variant="outlined" 
            color="error"
            fullWidth>
              Reset
            </Button>
          </Grid>
          
        </Grid>

      </div>
    </div>
  );
}  