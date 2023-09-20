import { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Heading from "../Component/Heading";
import { Height } from "@mui/icons-material";
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField,Button } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: "#74b9ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "60%",
    minHeight: "auto",
    background: "#ffff",
    borderRadius: 10,
    padding: "1%",
  },
}));
export default function QuestionInterface() {
  const [subQuestionsNumbers,setSubQuestionsNumbers]=useState(0)
  const [category, setCategory] = useState([]);
  const [question,setQuestion]=useState([]);

  const fetchAllCategory = async () => {
    var data = await getData("categorylist");
    setCategory(data);
    // console.log('category',data)
  };
  const fetchAllQuestions=async(cid)=>{
    var body={id:cid};
    var data = await postData("questionlist",body);
    setQuestion(data)
  }
  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>;
    });
  };
  const fillQuestions=()=>{
    return question.map((item)=>{
      return <MenuItem value={item.id}>{item.question}</MenuItem>
    })
  }
  const handleCategoryChange = (event) => {
    fetchAllQuestions(event.target.value);
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);
  const showTextField=()=>{
    var x=new Array(subQuestionsNumbers)
    x.fill(1)
    return x.map((item,index)=>{
        return(
          <Grid item xs={6}>
            <TextField label={"Question "+parseInt(index+1)} fullWidth/>
          </Grid>
        );
    })
  }
  var classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid item xs={12}>
          <Heading icon="doctor.png" text="Questions Interface" />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" onChange={handleCategoryChange}>
                <MenuItem>- Select Category-</MenuItem>
                {fillCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Question Category</InputLabel>
              <Select label="Question Category">
                <MenuItem>- Select Question Type-</MenuItem>
                {fillQuestions()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Number of Questions</InputLabel>
              <Select onChange={(event)=>setSubQuestionsNumbers(event.target.value)} label="Number of Questions">
                <MenuItem value={0}>-Select Number of Questions</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            {showTextField()}
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="success" fullWidth>Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth>Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
