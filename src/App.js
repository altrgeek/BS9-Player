import './App.css';
import { Box, Container } from '@mui/material';
import Home from './pages/Home';
import 'aplayer/dist/APlayer.min.css';
import ReactAplayer from 'react-aplayer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './comps/Layout';
import { ThemeProvider } from '@mui/system';
import theme from './theme/theme';
import Login from './pages/Login';
import AudioListing from './pages/AudioListing';


function App() {
   return (
      <ThemeProvider theme={theme}>
         <BrowserRouter>
            <Routes>
               <Route
                  path='/'
                  element={
                     <Layout>
                        <Home />
                     </Layout>
                  }
               />
               
                             
               <Route
                  path='/login'
                  element={
                        <Login />
                  }
               />
               <Route
                  path='/audiolisting'
                  element={
                        <AudioListing />

                  }
               />

              
            </Routes>
            <ToastContainer
                    hideProgressBar
                    position="top-right"
                    icon={true}
                    autoClose={15000}/>
         </BrowserRouter>
      </ThemeProvider>
   );
}

export default App;
