import { React, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useNavigate,useLocation} from "react-router-dom";
import axios from 'axios';

// import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { toast } from 'react-toastify';
import { Navigation } from '@material-ui/icons';


const columns = [
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'title', headerName: 'Title', width: 200 },
   { field: 'artistName', headerName: 'Artist Name', width: 200 },
   { field: 'owner', headerName: 'Owner', width: 200 },
   { field: 'audio', headerName: 'Audio', width: 200 },
 ];
 

const theme = createTheme();

export default function AudioListing() {
  //const aduioURL = process.env.REACT_APP_PLANT_Q_APP_API_URL + "audio";
  //const path = "http://localhost:8080/audio/";
  const path = "";
  
   let navigate = useNavigate();
   let location = useLocation();
    const [audios, setAudios] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      getAudioList();
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

   }, []);

   const getAudioList = () => {
    let mounted = true;
    //setAudios([{"id":123,"title":"Title No 1","artistName":"Moiz" ,"owner":"Moiz","audio": "songAB" }]);
    axios.get("http://localhost:8080/audio/")
        .then(
            (response) => {
                if (mounted) {
                  //console.log(response);
                  setAudios(response.data.data);
                }
            }).catch(function (error) {
              console.log(error);
    });
    // axios.get("https://dummy.restapiexample.com/api/v1/employees")
    //     .then(
    //         (response) => {
    //             // if (mounted) {
    //             //   setAudios(response.data.data.audioList);
    //             // }
    //             console.log(response);
    //         }).catch(function (error) {
    //           console.log(error);
    // });
    return () => mounted = false;
}
  const deleteAudio = (id) => {
    setIsLoading(true);
     axios.delete("http://localhost:8080/audio"+`/${id}`)
     .then(
      (response) => {
          //console.log('response', response);
          navigate('/audiolisting');
          setIsLoading(false);
          getAudioList();
          toast.success("Audio item deleted successfully!");
      }).catch(function (error) {
        console.log(error);
        setIsLoading(false);
      })
  }
  const update = (id) => {
    setIsLoading(true);
    /*axios.post(aduioURL+`/${id}`)
    .then(
      (response) => {
          console.log('response', response);
          navigate('/audiolisting');
          setIsLoading(false);
          getAudioList();
          toast.success("Audio item deleted successfully!");
      }).catch(function (error) {
        console.log(error);
        setIsLoading(false);
  
      })*/
  }
   const addNewItem = () => {
      navigate('/add-audio',{state:{token:"Token"} ,});
   }
  const editItem = (index) => {
    navigate('/edit-audio',{state:{list:audios[index] ,token:"Token" }});
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            Planet Q Production
          </Typography>
        </Toolbar>
      </AppBar>
      <main >
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
            <Button variant="contained" startIcon={<AddIcon />} style={{float:"right", marginBottom:"5px"}} onClick={addNewItem}>
                        Add Item
            </Button>
               </Grid>
            </Grid>  
          <div style={{ height: 400 , width: '100%' ,display: 'block' ,
                overflow: 'auto' }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Artist Name</th>
                <th scope="col">Owner</th>
                <th scope="col">Audio</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {audios.length > 0 ?  audios.map((audio, index) => {
                return (
                  <tr key= {index}>
                  <th scope="row">{ index+1 }</th>
                  <td>{ audio?.title }</td>
                  <td>{ audio?.artistName }</td>
                  <td>{ audio?.owner }</td>
                  <td>{ audio?.audioFileName }</td>
                  <td><DeleteIcon onClick={ () => deleteAudio(audio.id)} /></td>
                  <td><EditSharpIcon onClick={ () => editItem(index)} /></td>
                </tr>
                )
              }) : <p>No data added yet</p> }

            </tbody>
          </table>
         </div>
          </Container>
        </Box>

      </main>

    </ThemeProvider>
  );
}
