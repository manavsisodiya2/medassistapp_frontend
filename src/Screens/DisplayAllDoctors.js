import {useState,useEffect} from "react"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
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
import MaterialTable from "@material-table/core"

import makeStyles from "@mui/styles/makeStyles";
 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
 
import DialogTitle from '@mui/material/DialogTitle';
import Heading from "../Component/Heading";
import Swal from "sweetalert2";

import { serverURL, getData, postData,imageURL } from "../Services/FetchDjangoServices";
const useStyles = makeStyles((theme) => ({
  rootcontainer: {
    width: "auto",
    height: "auto",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rootbox: {
    width: "auto",
    height: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  container: {
    width: "100vw",
    height: "100vh",
    background: "#78e08f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 1200,
    height: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
  },
}));

export default function DisplayAllDoctor()
{ var classes=useStyles()
  const [doctorList,setDoctorList]=useState([])   
  const[open,setOpen]=useState(false)
  const[over,setOver]=useState(false)
  /********** doctor interface **************/
  const [states, setStates] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [dob, setDOB] = useState("1/1/1");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [stateid, setStateId] = useState("");
  const [cityid, setCityId] = useState("");
  const [qualification, setQualification] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [password, setPassword] = useState("");
  const [photograph, setPhotograph] = useState({ url: "", bytes: "" });
  const [formError, setFormError] = useState({});
  const [btnStatus, setBtnStatus] = useState(false);
  const [tempPicture, setTempPicture] = useState('');

  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }));

    console.log("Error", formError);
  };

  const isError = () => {
    var error = false;
    if (categoryId.length == 0) {
      handleError("Please Select Category Id", "categoryid");
      error = true;
    }
    if (doctorName.length == 0) {
      handleError("Doctor Name Should Not Be Blank", "doctorname");
      error = true;
    }

    if (gender.length == 0) {
      handleError("Select Gender", "gender");
      error = true;
    }
    if (dob.length == 0) {
      handleError("Pls input DOB", "dob");
      error = true;
    }
    if (address.length == 0) {
      handleError("Pls Input Address", "address");
      error = true;
    }

    if (stateid.length == 0) {
      handleError("Select State..", "stateid");
      error = true;
    }
    if (cityid.length == 0) {
      handleError("Select City", "cityid");
      error = true;
    }
    if (
      emailId.length == 0 ||
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailId)
    ) {
      handleError("Pls Input Correct Email Id", "emailid");
      error = true;
    }
    if (mobileno.length == 0 || !/^[0-9]{10}$/.test(mobileno)) {
      handleError("Pls Input Correct Mobile Number", "mobileno");
      error = true;
    }
/*
    if (photograph.bytes.length == 0) {
      handleError("Pls Upload Picture", "photograph");
      error = true;
    }*/
    if (qualification.length == 0) {
      handleError("Pls Input Qualification", "qualification");
      error = true;
    }

    return error;
  };

  const fetchAllStates = async () => {
    var data = await getData("statelist");
    setStates(data);
  };
  const fetchAllCategory = async () => {
    var data = await getData("categorylist");
    setCategory(data);
  };

  const fillStates = () => {
    return states.map((item) => {
      return <MenuItem value={item.id}>{item.statename}</MenuItem>;
    });
  };
  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchAllCity = async (sid) => {
    var body = { id: sid };

    var data = await postData("citylist", body);
    setCity(data);
  };
  const fillCity = () => {
    return city.map((item) => {
      return <MenuItem value={item.id}>{item.cityname}</MenuItem>;
    });
  };

  const handleStateChange = (event) => {
    fetchAllCity(event.target.value);
    setStateId(event.target.value);
  };
  

  useEffect(function () {
    fetchAllStates();
    fetchAllCategory();
  }, []);

  const handlePhotograph = (event) => {
    setPhotograph({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true)
  };

  const handleSubmit = async () => {
    if (!isError()) {
    var  body= {"id":doctorId,"category":categoryId,"doctorname":doctorName,
    "gender":gender,"dob":dob,"address":address,"states":stateid,"city":cityid,"qualification":qualification,"emailid":emailId,"mobileno":mobileno,"photograph":photograph.bytes}
    var result = await postData("doctoredit",body);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer:2000,
        });
        fetchAllDoctors()
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };



  /**********************/



  const fetchAllDoctors=async()=>{
    var result=await getData('doctorlist')
    setDoctorList(result)
  }  
  useEffect(function(){
    fetchAllDoctors()
  },[])  

const handleClose=()=>{
  setOpen(false)
}  
const handleEdit=(rowData)=>{
  fetchAllCity(rowData.states.id)
  setDoctorId(rowData.id)
  setCategoryId(rowData.category.id)
  setDoctorName(rowData.doctorname)
  setGender(rowData.gender)
  setDOB(rowData.dob)
  setQualification(rowData.qualification)
  setStateId(rowData.states.id)
  setCityId(rowData.city.id)
  setAddress(rowData.address)
  setEmailId(rowData.emailid)
  setMobileno(rowData.mobileno)
  setPhotograph({ url:`${imageURL}${rowData.photograph}`, bytes: "" })
  setTempPicture(`${imageURL}${rowData.photograph}`)
  setOpen(true)
}
const handleDelete=async(rowData)=>{

  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
     
    confirmButtonText: 'Delete',
    denyButtonText: `Don't delete`,
  }).then(async(result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var body={'id':rowData.id}
      var result=await postData('doctordelete',body)
      if(result.status)
      {

      Swal.fire('Deleted!', '', 'success')
      fetchAllDoctors()
      }
      else
      {
        Swal.fire('Server Error!', '', 'error')
      }
    } else if (result.isDenied) {
      Swal.fire('Record not deleted', '', 'info')
    }
  })



}
const handleEditPicture=async()=>{
 
    var formData = new FormData();
    formData.append("id", doctorId);
    
    formData.append("photograph", photograph.bytes);
    

    var result = await postData("doctorpictureedit", formData);
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 5000,
      });
      fetchAllDoctors()
      setBtnStatus(false)
    } else {

      Swal.fire({
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  

}
const saveCancel=()=>{
 return(<div>
   <Button onClick={handleEditPicture}>Save</Button>
   <Button onClick={handleCancel}>Cancel</Button>
 </div>)

}
const handleCancel=()=>{
  setPhotograph({url:tempPicture,bytes:''})
 setBtnStatus(false)
}
const showPen=()=>{
  
  
}
const showDoctor=()=>{
return (
    <div className={classes.rootcontainer}>
      <div className={classes.rootbox}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading
              color="#079992"
              icon="Doctor.webp"
              text="Doctor Register"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                error={formError.categoryid}
                onFocus={() => handleError("", "categoryid")}
                label="Category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <MenuItem>-Select Category-</MenuItem>
                {fillCategory()}
              </Select>
              {formError.categoryid ? (
                <FormHelperText style={{ color: "red" }}>
                  {formError.categoryid}
                </FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formError.doctorname}
              onFocus={() => handleError("", "doctorname")}
              onChange={(event) => setDoctorName(event.target.value)}
              label="Doctor Name"
              value={doctorName}
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
                  checked={gender=="Female"?true:false}
                  onChange={(event) => setGender(event.target.value)}
                />
                <FormControlLabel
                  error={formError.gender}
                  onFocus={() => handleError("", "gender")}
                  value="Male"
                  control={<Radio />}
                  label="Male"
                  checked={gender=="Male"?true:false}
                  onChange={(event) => setGender(event.target.value)}
                />
                <FormControlLabel
                  error={formError.gender}
                  onFocus={() => handleError("", "gender")}
                  value="Other"
                  control={<Radio />}
                  label="Other"
                  checked={gender=="Other"?true:false}
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
          <Grid item xs={6}>
            <TextField
              error={formError.address}
              onFocus={() => handleError("", "address")}
              onChange={(event) => setAddress(event.target.value)}
              label="Address"
              value={address}
              helperText={formError.address}
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                error={formError.stateid}
                onFocus={() => handleError("", "stateid")}
                onChange={handleStateChange}
                label="State"
                value={stateid}
              >
                <MenuItem>-Select State-</MenuItem>
                {fillStates()}
              </Select>
              {formError.stateid ? (
                <FormHelperText style={{ color: "red" }}>
                  {formError.stateid}
                </FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                error={formError.cityid}
                onFocus={() => handleError("", "cityid")}
                label="City"
                onChange={(event) => setCityId(event.target.value)}
                value={cityid}
              >
                <MenuItem>-Select City-</MenuItem>
                {fillCity()}
              </Select>
              {formError.cityid ? (
                <FormHelperText style={{ color: "red" }}>
                  {formError.cityid}
                </FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formError.qualification}
              onFocus={() => handleError("", "qualification")}
              value={qualification}
              onChange={(event) => setQualification(event.target.value)}
              label="Qualification"

              fullWidth
              helperText={formError.qualification}
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
            <Button fullWidth variant="contained" component="label">
              Upload Doctor Image
              <input
                error={formError.photograph}
                onFocus={() => handleError("", "photograph")}
                onChange={handlePhotograph}
                type="file"
                hidden
                accept="image/*"
                multiple
              />
            </Button>
            {formError.photograph ? (
              <FormHelperText style={{ color: "red" }}>
                {formError.photograph}
              </FormHelperText>
            ) : (
              <></>
            )}
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div  style={{position:'relative'}}>
            
            {over?<div style={{display:'flex',justifyContent:'center',alignItems:'center',bottom:3,left:3,position:'absolute',width:26,height:26,borderRadius:13, background:'#ffff',zIndex:2}}><EditRoundedIcon size={2}/></div>:<></> } 

            <Avatar
             onMouseOver={()=>setOver(true)}
             onMouseLeave={()=>setOver(false)}
              
              alt="Doctor Image"
              src={photograph.url}
              variant="rounded"
              sx={{ width: 56, height: 56 }}
            />
            </div>
            {btnStatus?saveCancel():<></>}
          </Grid>

            </Grid>
      </div>
    </div>
  );


}

const showDoctorDetails=()=>{
    return (
      <div>
        
        <Dialog
         open={open}
         keepMounted
         onClose={handleClose}
         maxWidth={'md'}
         >
         
          <DialogContent>
             {showDoctor()}
          </DialogContent>
          <DialogActions>
            <Button 
            onClick={handleSubmit}
            >Edit Data</Button>
            <Button 
            onClick={handleClose}
            >Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  

  }

  function showDoctorList() {
    return (
      <MaterialTable
        title="Doctor List"
        columns={[
          { title: 'Doctor',render:(rowData)=><div><div>{rowData.id}/{rowData.doctorname}</div><div>{rowData.gender}</div></div> },
          { title: 'Specialization', render:(rowData)=><div>{rowData.category.categoryname}</div> },
          { title: 'Birth', field:'dob'},
          { title: 'Qualification', field:'qualification'},
          { title: 'Address', render:(rowData)=><div><div>{rowData.address}</div><div>{rowData.city.cityname},{rowData.states.statename}</div></div> },
          { title: 'Photograph', render:(rowData)=><div><Avatar src={`${imageURL}${rowData.photograph}`}  style={{width:65,height:65}} /></div> },
          
        ]}
        data={doctorList}
        options={{
        paging:true,
        pageSize:3,
        emptyRowsWhenPaging:false,
        pageSizeOptions:[3,5,10]}}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) =>handleEdit(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) =>handleDelete(rowData)
          }
        ]}
      />
    )
  }

  return(<div className={classes.container}>
    <div className={classes.box}>
    {showDoctorList()}
  </div>  
  {showDoctorDetails()}
  </div>)
}