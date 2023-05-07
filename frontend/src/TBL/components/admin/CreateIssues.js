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

function CreateIssues(){

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
  
  <Typography variant="h3">Upload an issue</Typography>
  <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

        
      <TextField id="outlined-basic" label="Type of issue" variant="outlined" sx={{width:'100%'}}/>
      

        <TextField fullWidth label="Tell us your problem here:" id="fullWidth"  multiline/>

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


       <select value={province} onChange={handleSelectionChange1}>
      <option value="default">Select province</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="Pagaya 3">Pagaya 3</option>
    </select>

    <select value={province} onChange={handleSelectionChange2}>
      <option value="default">Select district</option>
      <option value="Page lankawa">Page lankawa</option>
      <option value="option2">Option 2</option>
      <option value="Pagaya 3">Pagaya 3</option>
    </select>

    
    <Button variant="contained">PLACE ISSUE</Button>
      
</Stack>  


</Box>
 


    
    )
}

export default CreateIssues;