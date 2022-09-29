import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { Link, TextField } from '@mui/material';
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AudioListing = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [title, setTitle] = useState("");
  const [artistName, setartistName] = useState("");
  const [owner, setOwner] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [thumbnailName, setThumbnailName] = useState();
  const [audioFileName, setAudioFileName] = useState();
  const [open, setOpen] = React.useState(false);
  const [audios, setAudios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = createTheme();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'artistName', headerName: 'Artist Name', width: 300 },
    { field: 'owner', headerName: 'Owner', width: 100 },
    //{ field: 'audio', headerName: 'Audio', width: 300 },
  ];

  useEffect(() => {
    if (location && location.state && location.state.token !== "Token") {
      navigate("/login");
    }
    else if (location == null || location.state == null || location.state.token == null) {
      navigate("/login");
    }

    setIsLoading(true);

    let mounted = true;
    axios.get(`${process.env.REACT_APP_API_URL}`)
      .then(
        (response) => {
          if (mounted) {
            setAudios(response.data.data);
          }

        })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setIsLoading(false)); // complete loading success/fail

    return () => mounted = false;

  }, []);


  /*   const deleteAudio = (id) => {
      setIsLoading(true);
      axios.delete(`${process.env.REACT_APP_API_URL}` + `/${id}`)
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
    } */
  const update = (id) => {
    setIsLoading(true);

  }
  const addNewItem = () => {
    navigate('/add-audio', { state: { token: "Token" }, });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
          setOpen(false);
          setIsLoading(false);
          window.location.reload();

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
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            BS9 Player
          </Typography>
          <Button variant="outlined"
            edge="start"
            color="inherit"
            onClick={handleClickOpen}>
            <AddIcon /> new music
          </Button>
        </Toolbar>
      </AppBar>
      <main >
        <Box
          style={{ background: "white", margin: "auto" }}
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container >
            <div style={{ height: 700, width: '100%' }}>
                  <DataGrid
                    rows={audios}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{
                      LoadingOverlay: LinearProgress,
                    }}
                    loading={isLoading}
                  />

            </div>
          </Container>
        </Box>
      </main>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Add new music
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div style={{ margin: "auto", height: "100%", width: '80%' }}>
            <form onSubmit={FileUploadHandler}>
              <TextField
                id="outlined-basic"
                label="Music title"
                variant="outlined"
                fullWidth
                margin="normal"
                name="title"
                type="text"
                className="form-control input-group m-b-0"
                onChange={HandleTitle}
              />

              <TextField
                id="outlined-basic"
                label="Artist name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="artistName"
                type="text"
                onChange={HandleArtist}
              />
              <TextField
                id="outlined-basic"
                label="Owner"
                variant="outlined"
                fullWidth
                margin="normal"
                name="owner"
                type="text"
                onChange={HandleOwner}
              />
              <Typography className="text-center upload-resume m-auto"
                style={{
                  border: "1px dashed #696871",
                  padding: "12px",
                  height: "4em",
                  marginTop: "15px",
                  marginBottom: "25px",
                  borderRadius: "5px"
                }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ marginRight: "1rem" }}
                >
                  Thumbnail
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    hidden onChange={HandleThumbnail} />
                </Button>
                <Link
                  className="sub-text-color f-13 textEllipse w-200"
                  underline="hover"
                >
                  {thumbnailName}
                </Link>

              </Typography>

              <Typography className="text-center upload-resume m-auto"
                style={{
                  border: "1px dashed #696871",
                  padding: "12px",
                  height: "4em",
                  margin: "2px",
                  borderRadius: "5px"
                }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ marginRight: "1rem" }}
                >
                  Audio File
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
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
export default AudioListing;
