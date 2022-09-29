import React, { useState, useEffect } from 'react';
import Header from './Header';
import Mics from './Mics';
import ReactAplayer from 'react-aplayer';
import { Box, Container } from '@mui/material';
import axios from 'axios';
const Layout = ({ children }) => {
   
   const [mainTrackList,setMainTrackList] =useState(null);   
 
   /// Fetch Playlist from API
   const getAudioList = () => {

      
      axios.get(`${process.env.REACT_APP_API_URL}`)
          .then(
              (response) => {                 
                    
                    let trackList = [];
                    
                    response.data.data.forEach((item)=>{
                     trackList.push({
                        name: item.title,
                        artist : item.artistName,
                        url: item.audioFile,
                        cover: item.thumbnail,
                     });                                               
                    });
                    //console.log(trackList); 
                    setMainTrackList({
                        autoplay: true,
                        theme: '#FFF',
                        loop: 'all',
                        order: 'random',
                        preload: 'auto',
                        volume: 1,
                        mutex: true,
                        listFolded: false,
                        audio: trackList
                        });                 
                  
                  
              }).catch(function (error) {
                console.log(error);
      });
  }
// To Fetch and Start the Playlist 
useEffect(()=>{

   getAudioList();
   
},[]);


   /// Player Functions
   const onPlay = () => {
      console.log('on play');
   };
   const onPause = () => {
      console.log('on pause');
   };
   const onInit = (ap) => {
     
   };

   return (
      <>
         <Container maxWidth='md'>
            <Header />
            <Mics />
            <Box sx={{ width: '100%' }}>
            {mainTrackList &&( <ReactAplayer
               {...mainTrackList}
               onInit={onInit}
               onPlay={onPlay}
               onPause={onPause}
               />)}              
            </Box>
            {children}
         </Container>
      </>
   );
};

export default Layout;
