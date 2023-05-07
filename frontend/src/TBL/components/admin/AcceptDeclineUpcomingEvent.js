import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";

const commonStyles = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width:'100wh',
    height:'100vh'

  };


function AcceptDeclineUpcomingEvent(){

    return(

        <Box sx={commonStyles}>
            <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

            <h3>Event Name:</h3>
            <h3>Date :</h3>
            <h3>Location:</h3>
            <h3>Other Info:</h3>

            <Button variant="contained" style={{ backgroundColor: 'green' }}>Accept</Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>Decline</Button>




            </Stack>


        </Box>



    )
}

export default AcceptDeclineUpcomingEvent;