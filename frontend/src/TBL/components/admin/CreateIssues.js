import React from "react";
import {StyleSheet} from 'react'
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";


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

function CreateIssues(){

    const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    // TODO: Send formData to server using fetch or axios
    setImage(file);
  };

    return(
<>
<Box sx={commonStyles} >
  
  <Typography variant="h3">This is a Blog!</Typography>
  <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

        
      <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{width:'100%'}}/>
      

        <TextField fullWidth label="Tell us your problem here:" id="fullWidth"  multiline/>

        <Input type="file" hidden onChange={handleImageUpload} />
    
      {image && <Image src={URL.createObjectURL(image)} alt="Uploaded Image" />}
      <Button variant="contained">PLACE ISSUE</Button>
</Stack>   
</Box>
</>
    
    )
}

export default CreateIssues;