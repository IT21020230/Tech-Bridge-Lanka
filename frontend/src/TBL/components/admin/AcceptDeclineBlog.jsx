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

            <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

            <h1>Blog title: {apiData.userId}</h1>
      <p>Blog description: {apiData.id}</p>
      <div>Blog:  {apiData.title}</div>

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