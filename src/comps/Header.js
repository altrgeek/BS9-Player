import { Button, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import twitter from '../media/twitter.webp'
import youtube from '../media/youtube.webp'
import instagram from '../media/insta.webp'
import {
   useTheme,
   useMediaQuery,
} from "@material-ui/core";
//import useMediaQuery from '@material-ui/core/useMediaQuery'
//import { theme } from '@material-ui/core/styles';//
//import { createTheme } from '@mui/material';



const HeaderWrapper = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.primary.main,
   padding: '3rem 1rem',
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));

const Menus = styled(Box)(({ theme }) => ({
   flex: 2,
}));

const Row = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   marginBottom: '1rem',
}));

const MenuButton = styled(Button)(({ theme }) => ({
   background: 'rgb(57, 114, 155)',
   color: 'white',
   marginRight: '1rem',
   fontSize: '0.7rem',
   padding: '0.4rem .3rem',
   '&:hover': {
      background: 'rgb(57, 114, 155)',
   },
}));

const Social = styled(Box)(({ theme }) => ({
   '& img': {
      marginRight: '1rem',
   }
}));

const Header = () => {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   return (
      <HeaderWrapper>
         <Flex>
            <Box sx={{ flex: 1 }}>
               <Typography variant='h5' gutterBottom>
                  BS9 Player
               </Typography>
               <Typography sx={{ fontSize: '13px', color: 'rgb(255, 203, 5)' }}>
                  All Rights Reserved © 2022
               </Typography>
            </Box>
{/*             {isMobile ? (
               <DrawerComponent />
            ) : (
               <Menus>
                  <Row>

                     <Social>
                        <a href="#"> <img src={twitter} alt='' /> </a>
                        <a href="#"> <img src={instagram} alt='' /> </a>
                        <a href="#"><img src={youtube} alt='' /> </a>
                     </Social>
                  </Row>

               </Menus>
            )} */}

         </Flex>
      </HeaderWrapper>
   );
};

export default Header;
