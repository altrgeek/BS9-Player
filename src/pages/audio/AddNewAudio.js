import { React, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Link, Grid, TextField, Typography } from '@mui/material';


const theme = createTheme();

export default function AddNewAudio() {
  let navigate = useNavigate();
  let location = useLocation();
  const [title, setTitle] = useState("");
  const [artistName, setartistName] = useState("");
  const [owner, setOwner] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if(location && location.state && location.state.token!== "Token"){
      navigate("/login");
    }
    else if(location == null || location.state== null || location.state.token== null)
    {
      navigate("/login");
    }
    // }
 }, [])

  const backToListing = () => {
    navigate('/audioListing', { state: { token: "Token" } });
  }

  const HandleChanget = (event) => {
    event.preventDefault();
    setTitle(...title, event.target.value)
  }

  const HandleChangea = (event) => {
    event.preventDefault();
    setartistName(...artistName, event.target.value)
  }

  const HandleChangeo = (event) => {
    event.preventDefault();
    setOwner(...owner, event.target.value)
  }

  const HandleThumbnail = (event) => {
    //let value = (event.target.files[0]);
    setThumbnail(event.target.files[0]);
  }
  const HandleAudioFile = (event) => {
    //let value = (event.target.files[0]);
    setAudioFile(event.target.files[0]);
  }

  const FileUploadHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    let form = new FormData();
    form.append('title', title);
    form.append('artistName', artistName);
    form.append('owner', owner);
    form.append('thumbnail', await thumbnail);
    form.append('audioFile', await audioFile);

    const config = {
      method: 'post',
      url: 'http://localhost:8080/audio',
      data: form
    }

    const promise = await axios(config)
      .then((response) => {

        if (response.status == 200) {
          //console.log('response', response);
          navigate('/audiolisting', { state: { token: "Token" } });
          setIsLoading(false);
          //toast.success("Audio item added successfully!");
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.status == 413) {
          toast.error("Your File greater than maximum Uploading Limit");
        }
        else {
          toast.error("Error");
        }
      });
    toast.promise(
      promise,
      {
        pending: {
          render() {
            return "Loading..."
          },
          icon: false,
        },
        success: {
          render() {
            return `Added successfully!`
          },
          // other options
          icon: "🟢",
        }
      }
    );

    console.log("title", title);
    console.log("artistName", artistName);
    console.log("owner", owner);
    console.log("thumbnail", thumbnail);
    console.log("audioFile", audioFile);


  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Planet Q Production
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          style={{ background: "white", margin: "2%" }}
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
                <Button variant="outlined" startIcon={<ArrowBack />} style={{ float: "right", marginBottom: "-65px" }} onClick={backToListing}>
                  Back to listing
                </Button>
              </Grid>
            </Grid>

            <div>
              <form encType="multipart/form">
                <input
                  type="text"
                  name="title"
                  placeholder="Song title"
                  onChange={HandleChanget}
                />
                <br />
                <input
                  type="text"
                  name="artistName"
                  placeholder="Artist Name"
                  onChange={HandleChangea}
                />
                <br />
                <input
                  type="text"
                  name="owner"
                  placeholder="Owner"
                  onChange={HandleChangeo}
                />
                <br />
                <input
                  type="file"
                  name="thumbnail"
                  placeholder="Upload your file"
                  onChange={HandleThumbnail}
                />
                <br />
                <input
                  type="file"
                  name="audioFile"
                  placeholder="Upload your file"
                  onChange={HandleAudioFile}
                />
                <br />
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={FileUploadHandler}
                >Submit</button>
              </form>
            </div>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
