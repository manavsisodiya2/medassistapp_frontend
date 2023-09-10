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
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";

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
      width: 800 ,
      height: "auto",
      background: "#fff",
      borderRadius: 10,
      padding: 15,
    },
  }));




export default function Question(props){

  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [QuestionId,setQuestionId]=useState("");
  const [Question,setQuestion]=useState([]);
  const [formError, setFormError] = useState({});

  const handleReset = () => {
    setQuestionId("")
    setCategoryId("");
  };  

  const fetchAllCategory = async () => {
    var data = await getData("categorylist");
    setCategory(data);
  };
  const FetchAllQuestions = async (cid) => {
    var body = { id: cid };

    var data = await postData("questionlist", body);
    setQuestion(data);
  };
  const fillQuestion = () => {
    return Question.map((item) => {
      return <MenuItem value={item.id}>{item.Questionname}</MenuItem>;
    });
  };
  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>;
    });
  };


  const handlecategoryChange=(event)=>{
    FetchAllQuestions(event.target.value)
    setCategoryId(event.target.value)
  }

  useEffect(function () {
    fetchAllCategory();
  }, []);



    var classes = UseStyles();
    return (
    <div className={classes.container}>
    <div className={classes.box}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>category</InputLabel>
                <Select
                  error={formError.categoryId}
                  onChange={handlecategoryChange}
                  label="category"
                  value={categoryId}
                >
                  <MenuItem>-Select category-</MenuItem>
                  {fillCategory()}
                </Select>
              
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>question</InputLabel>
              <Select
                error={formError.QuestionId}
                label="question"
                onChange={(event) => setQuestionId(event.target.value)}
                value={QuestionId}
              >
                <MenuItem>-Select question-</MenuItem>
                {fillQuestion()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
    </div>
    </div>
    )  
}