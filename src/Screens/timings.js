import { makeStyles } from "@material-ui/styles";
import { Grid,TextField,FormControlLabel,RadioGroup,Radio,FormLabel,FormGroup,FormControl,Checkbox } from "@mui/material";


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
  
  
  
  var classes = UseStyles();
  
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label="doctor id" fullWidth/>
          </Grid>
          <Grid item xs={4}>
            <TextField 
            type="time" fullWidth/>
          </Grid>
          <Grid item xs={4}>
            <TextField 
            type="time" fullWidth/>
          </Grid>
          <Grid item xs={4}>
            <FormControl >
              <FormLabel id="demo-radio-buttons-group-label">status</FormLabel>
              <RadioGroup row>
                <FormControlLabel value="available" control={<Radio />} label="available" />
                <FormControlLabel value="not available" control={<Radio />} label="not available" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="sunday" />
              <FormControlLabel control={<Checkbox />} label="monday" />
              <FormControlLabel control={<Checkbox />} label="twesday" />
              <FormControlLabel control={<Checkbox />} label="wednesday" />
              <FormControlLabel control={<Checkbox />} label="thursday" />
              <FormControlLabel control={<Checkbox />} label="friday" />
              <FormControlLabel control={<Checkbox />} label="saturday" />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <TextField 
            fullWidth/>
          </Grid>
          
        </Grid>

      </div>
    </div>
  );
}  