import { React, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import { useNavigate ,useLocation} from "react-router-dom";
import { toast } from 'react-toastify';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';
import * as Yup from 'yup';
import { Box, Button, Container, Link, Grid, TextField, Typography } from '@mui/material';
import { ThumbDownAltOutlined } from '@material-ui/icons';
//import * as fs from 'fs';

 

 
const theme = createTheme();

export default function AddNewAudio() {
  const aduioURL = process.env.REACT_APP_PLANT_Q_APP_API_URL + "audio";
  const location = useLocation();
  let navigate = useNavigate();

  const [thumnail, setThumnail] = useState();
  const [thumnailName, setThumnailName] = useState();
  const [thumnailMedia, setThumnailMedia] = useState(null);
  const [audioFileName, setAudioFileName] = useState();
  const [audioFile, setAudioFile] = useState();
  const [audioFileMedia, setAudioFileMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // var http = require('http');
  //
   useEffect(() => {
    // console.log(location);
    // console.log(location.state)
    //console.log(location.state.token);
    if(location && location.state && location.state.token!== "Token"){
      navigate("/login");
    }
    else if(location == null || location.state== null || location.state.token== null)
    {
      navigate("/login");
    }
      let temp = location.state.list.thumnail.split('/') 
      setThumnailName (temp[temp.length-1]);
      setThumnail(location.state.list.thumnail);
      setAudioFileName (location.state.list.audioFileName);
      setAudioFile(location.state.list.audioFile);
   }, [])
  
  const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .max(128, 'Exceeded maximum character length of 128')
  });
   const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
});
const backToListing = () => {
  navigate('/audioListing',{state:{token:"Token"} }); 
}
const handleChangeThumnail = (event) => {
    let file = event.target.files[0];
    setThumnailName (file.name);
    setThumnail(file);
    setThumnailMedia("abc");
}
const handleChangeAudioFile = (event) => {
  let file = event.target.files[0];
  setAudioFile(file);
  setAudioFileName(file.name)
  setAudioFileMedia("abc");
}
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const onSubmit = async (data) => {
  // Update 
  setIsLoading(true);
  
  // console.log(thumnail)
  // console.log(audioFile)
  // console.log(audioFileName)
  // console.log(thumnailName)
  var data1 = await JSON.stringify({
    "id": location.state.list.id,
    "title": data.title,
    "artistName": data.artistName,
    "owner": data.owner,
    "audioFileName": audioFileName,
    "audioFile": "http://localhost:8080/audio/"+audioFileName,
    "audioMedia" : audioFileMedia != null ? await getBase64(audioFile).then((response)=>{ return response;}) : null,
    "thumnailFileName":thumnailName,
    "thumnail": "http://localhost:8080/audio/"+thumnailName,
    "thumnailMedia": thumnailMedia != null ? await getBase64(thumnail).then((response)=>{ return response.split(',')[1];}) : null,
    "created_at": null,
    "updated_at": null,
    "deleted_at": null
  });
  //console.log(data1);   
  var config = {
    method: 'put',
    url: 'http://localhost:8080/audio/'+location.state.list.id,
    headers: { 
      'Content-Type': 'application/json', 
    },
    data : data1
  };
  
  
  const promise = axios(config)
  .then((response) => {
    if(response.status == 200){
      //console.log('response', response);
      navigate('/audiolisting',{state:{token:"Token"} });
      setIsLoading(false);
      
    }
    })
  .catch(function (error) {
    console.log(error);
    setIsLoading(false);
    if(error.status == 413){
      toast.error("Your File greater than maximum Uploading Limit");
    }
    else{
      toast.error("Error");
    }
  });
  toast.promise(
    promise,
    {
      pending: {
        render(){
          return "Loading..."
        },
        icon: false,
      },
      success: {
        render(){
          return `Edited successfully!`
        },
        // other options
        icon: "🟢",
      }
    }
)
    


  /*axios.post(aduioURL, formData)
  .then(
    (response) => {
        console.log('response', response);
        navigate('/audiolisting');
        setIsLoading(false);
        toast.success("Audio item added successfully!");
    }).catch(function (error) {
      console.log(error);
      setIsLoading(false);

    })*/
}
//console.log(location);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
          Planet Q Production
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
        style={{background:"white", margin:"2%"}}
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >

          <Container >
          <Grid container spacing={2}>
            <Grid item xs={8}>
            
            </Grid>
            <Grid item xs={4}>
            <Button variant="outlined"  startIcon={<ArrowBack />} style={{float:"right", marginBottom:"-65px"}} onClick={backToListing}>
                        Back to listing
            </Button>
               </Grid>
            </Grid>  

            <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
               Edit Item 
              </Typography>
            </Box>

            <TextField
              fullWidth
              margin="normal"
              name="title"
              type="text"
              className="form-control input-group m-b-0"
              placeholder="Enter title"
              //{"id":123,"title":"Title No 1","artistName":"Moiz" ,"owner":"Moiz","audio": "songAB" }
              defaultValue={location.state.list.title}
              
              {...register('title')}
            />
            <span style={{color:"#C92938"}}> {errors.title && errors.title.message}</span>

            <TextField
              fullWidth
              margin="normal"
              name="artistName"
              placeholder="Enter artist name"
              type="text"
              defaultValue={location.state.list.artistName}
              {...register('artistName')}
            />
             <span style={{color:"#C92938"}}> {errors.artistName && errors.artistName.message}</span>
            <TextField
              fullWidth
              margin="normal"
              name="owner"
              type="text"
              placeholder="Enter owner name"
              defaultValue={location.state.list.owner}
              {...register('owner')}
            />
            <span style={{color:"#C92938"}}> {errors.owner && errors.owner.message}</span>
            <Typography className="text-center upload-resume m-auto"
             style={{    
              border: "1px dashed #696871",
              padding: "51px",
              height: "10em",
              margin: "4px",
              marginBottom: "15px !important",
              borderRadius: "8px"
              }}>
                                <input
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    //value={value={location.state.list.thum}}
                                    defaultValue= {location.state.thumnail}
                                    //value= {location.state.thumnail}
                                    onChange={handleChangeThumnail} 
                                />
                                <Typography>
                                    <label htmlFor="raised-button-file">
                                        <Typography>
                                            {!thumnailName && 
                                                <Link className="link-color f-13 " underline="hover">Select Thumnail</Link>
                                              }
                                           
                                                <Link className="sub-text-color f-13 textEllipse w-200" underline="hover">{thumnailName}</Link>
                                           
                                        </Typography>
                                    </label>
                                </Typography>
                                </Typography>
                                <Typography className="text-center upload-resume m-auto"
                                style={{    
                                  border: "1px dashed #696871",
                                  padding: "51px",
                                  height: "10em",
                                  margin: "4px",
                                  borderRadius: "8px"
                                }}>
                                <input
                                    type="file"
                                    //value={location.state.audioFile}
                                    defaultValue= {location.state.audioFile}
                                    accept="audio/*"
                                    name="audioFile"
                                    onChange={handleChangeAudioFile} 
                                />
                                <Typography>
                                    <label htmlFor="raised-button-file">
                                        <Typography>
                                              <Link className="sub-text-color f-13 textEllipse w-200" underline="hover">{audioFileName}</Link>
                                        </Typography>
                                    </label>
                                </Typography>
                                </Typography>
                        <Box sx={{ py: 2 }}>
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                          >
                            Save
                          </Button>
                    </Box>
          </form>
          </Container>
        </Box>

      </main>

    </ThemeProvider>
  );
}
