import React, { useEffect, useState } from "react";
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
    height:'100vh'

  };


function AcceptDeclineBlog(){

    const [apiData, setApiData] = useState([]);

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
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

    return(
        <>

        <Box sx = {commonStyles}>

            <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center', width:'50%',height:'90%'}}>

            <h1>Blog Title: </h1>The best solution ever for
            <h1>Blog Description: </h1><pr>In the rapidly evolving world of InfoSec, Sentinel Labs is where you’ll find highly-informed deep dives into the latest cybersecurity dangers and developments. Threat researchers and vetted contributors share critical information on malware, exploits, cybercrime, and APTs, with the aim of contributing to a safer digital space for everyone.</pr>
            
            <h1>Blog:  </h1>
            <pr>Wired is a popular tech blog that observes how technology affects human lives across culture, politics, and security. Business leaders can access informative news, delivered through approachable, easy-to-understand content. Focused on breakthroughs and innovation, you’ll also find hot takes on modern life, tech trends, and gadget reviews.</pr>

      <Button variant="contained" style={{ backgroundColor: 'green' }}>Accept</Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>Decline</Button>



            </Stack>



        </Box>
        
        
        
        </>
    )



}

export default AcceptDeclineBlog;



/* <div>
            <h1>Blog title: {apiData.userId}</h1>
      <p>Blog description: {apiData.id}</p>
      <div>Blog:  {apiData.title}</div>
        </div>*/