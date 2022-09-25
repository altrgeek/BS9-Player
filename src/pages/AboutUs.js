import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


const Wrapper = styled(Box)(({ theme }) => ({
   backgroundColor: '#ffffff',
   color: '#000000',
   padding: '2rem 0',

   '& p': {
      textAlign: 'center',
      margin: '1rem auto',
      width: '80%',
      fontSize: '1.5rem',
   },
   '& a': {
      textAlign: 'center',
      display: 'block',
      margin: '2rem 0',
      textDecoration: '',
   },
}));



const AboutUs = () => {
   let navigate = useNavigate();
   let location = useLocation();
   useEffect(() => {
      // document.body.style.backgroundImage = "url()";
      // if(location.state.){

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
      // }
   }, [])
   return (
      <Wrapper>
         <Typography variant='h3' component='a'>
         </Typography>

         <Box>
            <Typography
               variant='h5'
               sx={{ fontSize: '12px', textAlign: 'center', padding: '2rem 0', margin: 'auto' }}
            >
               We hope you enjoy and like what you hear
            </Typography>

         </Box>



      </Wrapper>
   );
};

export default AboutUs;
