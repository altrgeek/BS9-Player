import { React, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Link, Grid, TextField, Typography } from '@mui/material';
import UploadFileIcon from "@mui/icons-material/UploadFile";



const theme = createTheme();

export default function AddNewAudio() {
  let navigate = useNavigate();
  let location = useLocation();
  const [title, setTitle] = useState("");
  const [artistName, setartistName] = useState("");
  const [owner, setOwner] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [thumbnailName, setThumbnailName] = useState();
  const [audioFileName, setAudioFileName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if (location && location.state && location.state.token !== "Token") {
      navigate("/login");
    }
    else if (location == null || location.state == null || location.state.token == null) {
      navigate("/login");
    }
    // }
  }, [])


  const backToListing = () => {
    navigate('/audioListing', { state: { token: "Token" } });
  }

  const HandleTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value)
  }

  const HandleArtist = (event) => {
    event.preventDefault();
    setartistName(event.target.value)
  }

  const HandleOwner = (event) => {
    event.preventDefault();
    setOwner(event.target.value)
  }

  const HandleThumbnail = (event) => {
    let file = event.target.files[0];
    setThumbnailName(file.name);
    setThumbnail(file);
  }
  const HandleAudioFile = (event) => {
    let file = event.target.files[0];
    setAudioFile(file);
    setAudioFileName(file.name)
  }


  const FileUploadHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    let form = new FormData();
    form.append('title', title);
    form.append('artistName', artistName);
    form.append('owner', owner);
    form.append('thumbnail', thumbnail);
    form.append('audioFile', audioFile);

    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}`,
      data: form
    }

    const promise = axios(config)
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

    /*     console.log("title", title);
        console.log("artistName", artistName);
        console.log("owner", owner);
        console.log("thumbnail", thumbnail);
        console.log("audioFile", audioFile); */


  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            BS9 Player
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          style={{ background: "white", margin: "auto" }}
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

            <div style={{ height: 750, width: '100%', display: 'block', overflow: 'auto' }}>

              <form onSubmit={FileUploadHandler}>
                <Box sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Add new item
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  margin="normal"
                  name="title"
                  type="text"
                  className="form-control input-group m-b-0"
                  placeholder="Enter title"
                  onChange={HandleTitle}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  name="artistName"
                  placeholder="Enter artist name"
                  type="text"
                  onChange={HandleArtist}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  name="owner"
                  type="text"
                  placeholder="Enter owner name"
                  onChange={HandleOwner}
                />
                <Typography className="text-center upload-resume m-auto"
                  style={{
                    border: "1px dashed #696871",
                    padding: "20px",
                    height: "5em",
                    marginBottom: "10px",
                    borderRadius: "8px"
                  }}>

                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    sx={{ marginRight: "1rem" }}
                  >
                    Upload Thumbnail
                    <input type="file" name="thumbnail" accept="image/*" hidden onChange={HandleThumbnail} />
                  </Button><Link className="sub-text-color f-13 textEllipse w-200" underline="hover">{thumbnailName}</Link>

                </Typography>

                <Typography className="text-center upload-resume m-auto"
                  style={{
                    border: "1px dashed #696871",
                    padding: "20px",
                    height: "5em",
                    margin: "2px",
                    borderRadius: "8px"
                  }}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    sx={{ marginRight: "1rem" }}
                  >
                    Upload Audio File
                    <input type="file" name="audioFile" accept="audio/*" hidden onChange={HandleAudioFile} />
                  </Button><Link className="sub-text-color f-13 textEllipse w-200" underline="hover">{audioFileName}</Link>

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
            </div>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
