import React from "react";

import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";
import './dropdown.css';
import './imageUpload.css';


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

function CreateEvents(){

    const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    // TODO: Send formData to server using fetch or axios
    setImage(file);
  };
  ///////////////////////////////////////////////////////////////////////////////////

  const [province, setProvince] = useState('default');
  const [district, setdistrict] = useState('default');
  

  useEffect(() => {
    console.log(province)
    console.log(district)
  })

  const handleSelectionChange1 = (event) => {
    setProvince(event.target.value);
    
  };

  const handleSelectionChange2 = (event) => {
    setdistrict(event.target.value);
    
  };


  //////////////////////////////////////////////////////////////////////////////////////

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setImage(base64)
  }

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////

    return(

<Box sx={commonStyles} >
  
  
  <Stack spacing={3} direction='column' sx={{justifyContent:'center',alignItems:'center', backgroundColor: '#a2c6eb', width:'50%', borderRadius: 10}}>
  <Typography variant="h3">Create an Event</Typography>
        
      <TextField id="outlined-basic" label="Event Name" variant="outlined" sx={{width:'80%', backgroundColor: '#fafafa', borderRadius: 2}}/>
      

        <TextField fullWidth label="Event description:" id="fullWidth"  multiline sx={{width:'80%', backgroundColor: '#fafafa', borderRadius: 2}}/>

        <TextField id="outlined-basic" label="Event location:" variant="outlined" sx={{width:'80%', backgroundColor: '#fafafa', borderRadius: 2}}/>

      {/*  <Input type="file" hidden onChange={handleImageUpload} />
    
    {image && <Image src={URL.createObjectURL(image)} alt="Uploaded Image" />}  */}

      Please upload any proof:
        <input
          id="img-upload"
          type="file"
          name="myFile"
          lable="Image"
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
          style={{ display: "block" }}
          sx={{ gridColumn: "span 1" }}
         />


       

    
    <Button variant="contained" style={{ backgroundColor: 'green' }}>Create Event</Button>
      
</Stack>  


</Box>
 


    
    )
}

export default CreateEvents;