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
    width:'50wh',
    height:'100vh'

  };



function IssuesToAccept(){
    const [apiData,setApiData] = useState([]);

    return (

        <Box sx={commonStyles}>

            <Stack spacing={2} direction='column' sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'50%',height:'90%'}}>


            <h3>Issue topic:</h3>{apiData.title}
            <h3>Issue details: </h3>Scratches on your face, hands, or body when you wake up are usually caused by scratching yourself while asleep. You may have a skin condition thats causing intense itchiness at night, or you may have dermatographia. Dermatographia causes even very light scratches to produce raised red marks.
            <h3>Proof: </h3>{apiData.photos}
            <h3>Province: </h3>
            <h3>District: </h3>

            <Button variant="contained" style={{ backgroundColor: 'green' }}>Accept</Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>Decline</Button>



            </Stack>



        </Box>
    )



}

export default IssuesToAccept;

/* <div>

<h1>Issue</h1>

<h3>Issue topic:</h3>{apiData.title}
<h3>Issue details: </h3>{apiData.details}
<h3>Photograps: </h3>{apiData.photos}





</div>        */