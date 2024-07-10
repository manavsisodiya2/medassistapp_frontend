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
 

import adddoctor from '../assets/adddoctor.png'
import doctorimage from '../assets/doctor.webp'
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
    width: "100%",
    height: "100vh",
    background: "#a5b1c2",
    display: "flex",
  },
  box: {
    width: 1000,
    height:'80%' ,
    background: "#fff",
    borderRadius: 10,
    padding: 15,
    marginLeft:'10%',
    marginTop:'2%'
  },
}));

export default function DisplayUser()
{ var classes=useStyles()
  const [doctorList,setDoctorList]=useState([])   
  





  /**********************/

  const fetchAllDoctors=async()=>{
    var result=await getData('doctorlist')
    setDoctorList(result)
  }  

  useEffect(function(){
    fetchAllDoctors()
  },[])  


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


 function showDoctorList() {
    return (
      <Grid container spacing={2}> 
      <Grid item xs={12}>
      <Heading
              color="#079992"
              icon={doctorimage}
              text="User Register"
              linkimage={adddoctor}
              link={'/home/user'}
            />
      </Grid>  
      <Grid item xs={12}>
      <MaterialTable
        title=''
         columns={[
          { title: 'User',render:(rowData)=><div><div>{rowData.id}/{rowData.doctorname}</div><div>{rowData.gender}</div></div> },
          // { title: 'Specialization', render:(rowData)=><div>{rowData.category.categoryname}</div> },
          { title: 'Birth', field:'dob'},
          { title: 'Qualification', field:'qualification'},
          { title: 'Address', render:(rowData)=><div><div>{rowData.address}</div></div> },
          { title: 'Photograph', render:(rowData)=><div><Avatar src={`${imageURL}${rowData.photograph}`}  style={{width:65,height:65}} /></div> },
          
        ]}
        data={doctorList}
        options={{
        paging:true,
        pageSize:5,
        emptyRowsWhenPaging:false,
        pageSizeOptions:[3,5,10]}}
        actions={[
          // {
          //   icon: 'edit',
          //   tooltip: 'Edit User',
          //   onClick: (event, rowData) =>handleEdit(rowData)
          // },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) =>handleDelete(rowData)
          }
        ]}
      />
      </Grid>
      </Grid>
    )
  }

  return(<div className={classes.container}>
    <div className={classes.box}>
    {showDoctorList()}
  </div>  
  </div>)
}