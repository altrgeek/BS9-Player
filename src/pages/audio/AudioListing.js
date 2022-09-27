import { React, useEffect, useState } from 'react';
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
import { Navigation } from '@material-ui/icons';
import LinearProgress from '@mui/material/LinearProgress';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'artistName', headerName: 'Artist Name', width: 300 },
  { field: 'owner', headerName: 'Owner', width: 300 },
  //{ field: 'audio', headerName: 'Audio', width: 300 },
];


const theme = createTheme();

export default function AudioListing() {

  const path = "";

  let navigate = useNavigate();
  let location = useLocation();
  const [audios, setAudios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAudioList();
    if (location && location.state && location.state.token !== "Token") {
      navigate("/login");
    }
    else if (location == null || location.state == null || location.state.token == null) {
      navigate("/login");
    }
    let active = true;

    (() => {
      setIsLoading(true)
      const audios = getAudioList()

      if (!active) {
        return
      }

      setAudios(audios)
      setIsLoading(false)
    })()

    return () => {
      active = false
    }
  }, []);

  const getAudioList = () => {
    let mounted = true;
    axios.get(`${process.env.REACT_APP_API_URL}`)
      .then(
        (response) => {
          if (mounted) {
            setAudios(response.data.data);
          }
        }).catch(function (error) {
          console.log(error);
        });

    return () => mounted = false;

  }
  const deleteAudio = (id) => {
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
  }
  const update = (id) => {
    setIsLoading(true);

  }
  const addNewItem = () => {
    navigate('/add-audio', { state: { token: "Token" }, });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            BS9 Player
          </Typography>
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
            <Grid container spacing={2}>
              <Grid item xs={8}>

              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" startIcon={<AddIcon />} style={{ float: "right", marginBottom: "5px" }} onClick={addNewItem}>
                  Add Item
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 700, width: '100%', display: 'block', overflow: 'auto' }}>
              <DataGrid
                rows={audios}
                columns={columns}
                components={{
                  LoadingOverlay: LinearProgress,
                }}
                loading={isLoading}
              />
            </div>
          </Container>
        </Box>

      </main>

    </ThemeProvider>
  );
}
