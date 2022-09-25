import YouTube from 'react-youtube-embed'
import { styled } from '@mui/system';
import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

/* const Div = styled('div')(({ theme }) => ({
    maxWidth: '100%',
    marginTop: '2rem',
})); */


const Videos = () => {
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
       <>
          {/* <Box sx={{ marginTop: "1.4rem" }}>
             <Img
                src={pqpl}
                alt=''
             />
         <div>
           <Div> <YouTube id='' /> </Div>
           <Div> <YouTube id='' /> </Div>
           <Div> <YouTube id='' /> </Div>
        </div> 
          </Box>
 
          <Box>
             <Img
                src={aliens}
                alt=''
             />
          </Box>
          <Box sx={{ background: "#ffffff" }}>
             <iframe src="" width="100%" height="750px"></iframe>
          </Box> */}
       </>
 
    );
 };
 
 export default Videos;