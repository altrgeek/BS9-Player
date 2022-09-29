import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import speaker1 from '../media/speaker1.gif';
import speakerCircle from '../media/speakercircle.gif';
import speakerAnim from '../media/speakeranim.gif';
import rain from '../media/rain.gif';
import viz from '../media/vizualization.gif';

const MicsWrapper = styled(Box)(({ theme }) => ({
   backgroundColor: 'rgb(7, 10, 23)',
   height: '66px',
   width: '100%',
   padding: '1.4rem 1.4rem',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));

const Speaker = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   '& img': {
      height: '45px',
      width: '45px',
      marginRight: '1rem',
      '&:last-child': {
         marginRight: 0,
      },
   },
}));

const CircleGif = styled('img')(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
}));




const MiddleSpeaker = styled(Box)(({ theme }) => ({
   flex: 2,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '& img': {
      height: '52px',
      width: '79px',
   },
}));

const RainBox = styled(Box)(({ theme }) => ({
    //backgroundImage: `url(${viz})`,
    display: 'flex', 
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '265px',
    backgroundPosition: 'center',
}));

const Mics = () => {
   return (
      <>
{/*          <MicsWrapper>
            <Speaker>
               <Box sx={{ position: 'relative' }}>
                  <img src={speaker1} alt='' />
                  <CircleGif src={speakerCircle} alt='' />
               </Box>
               <Box sx={{ position: 'relative' }}>
                  <CircleGif src={speakerCircle} alt='' />
                  <img src={speaker1} alt='' />
               </Box>
            </Speaker>
            <MiddleSpeaker>
               <img src={speakerAnim} alt='' />
            </MiddleSpeaker>
            <Speaker>
               <Box sx={{ position: 'relative' }}>
                  <img src={speaker1} alt='' />
                  <CircleGif src={speakerCircle} alt='' />
               </Box>
               <Box sx={{ position: 'relative' }}>
                  <CircleGif src={speakerCircle} alt='' />
                  <img src={speaker1} alt='' />
               </Box>
            </Speaker>
         </MicsWrapper> */}
         <RainBox>
            { <img src={viz} alt='' /> }
         </RainBox>
      </>
   );
};

export default Mics;

