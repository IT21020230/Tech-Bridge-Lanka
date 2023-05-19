import React from "react";
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";
import './dropdown.css';
import './imageUpload.css';
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function AdminHome(){

    const Image = styled('img')({

        width:'200px',
        height:'auto',
        objectFit:'cover',
        border:'none',
        borderRadius:'10px'
    
    })
    
    const commonStyles = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        width:'100wh',
        height:'100vh'
    
      };

    return(

        <Box sx={commonStyles} >
  
  
  <Stack spacing={3} direction='column' sx={{justifyContent:'center',alignItems:'center', backgroundColor: '#a2c6eb', width:'50%', borderRadius: 10}}>
  <Typography variant="h3">Welcome Admin</Typography>
        
      
      

       
    
    

     

       

    

    
    

    
      
</Stack>  


</Box>
    )




}

export default AdminHome;