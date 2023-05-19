import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    height:'100%'

  };


function AcceptDeclineUpcomingEvent(){

    const [apiData, setApiData] = useState([]);
    
    const {id} = useParams();

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch(`http://localhost:7000/api/events/${id}`);
            const json = await response.json();

            if(response.ok){
                setApiData(json);
                console.log(json);
            }

            if (!response.ok){
                console.log(Error)
            }
        }
        getBlogData();
    },[]);

    function handleAccept(e){
        axios.patch(`http://localhost:7000/api/events/accept/6457c5e53be7c23f0f0a2eb4`)
    }

    return(

        <Box sx={commonStyles}>
            <Stack spacing={2} direction='column' sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'50%',height:'90%'}}>

            <h3>Event Name:</h3>{apiData.name}
            
            
            <h3>Other Info:</h3>{apiData.description}
            <img src={apiData.image} alt="My Photo" width="50%" height="50%"/>
            
            <h3>Comunity ID:</h3>6457df523d440e21c8c127d9

            <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={() => handleAccept()}>Accept</Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>Decline</Button>




            </Stack>


        </Box>



    )
}

export default AcceptDeclineUpcomingEvent;