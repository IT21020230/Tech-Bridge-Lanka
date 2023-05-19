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

  function CreateProject(){

    const [image, setImage] = useState(null);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const navigate = useNavigate();
    const [modalDeleteShow, setModalDeleteShow] = React.useState(false);


    async function handleButtonSubmit(e){

        
    
        await axios.post('http://localhost:7000/api/issue/', {
          
    
      })
    
      
    
      navigate("/create-issues")
    
    
      }

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

      function DeleteModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Accept Community
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Event created successfully</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ marginRight: "20px" }}
                variant="danger"
                onClick={handleButtonSubmit}
                
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return(

        <Box sx={commonStyles} >
          
          
          <Stack spacing={3} direction='column' sx={{justifyContent:'center',alignItems:'center', backgroundColor: '#a2c6eb', width:'50%', borderRadius: 10}}>
          <Typography variant="h3">Create Project</Typography>
                
              <TextField id="outlined-basic" label="Project Name:" variant="outlined" sx={{width:'80%', backgroundColor: '#fafafa', borderRadius: 2}}
              value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
              
        
                <TextField fullWidth label="Project Description:" id="fullWidth"  multiline sx={{width:'80%', backgroundColor: '#fafafa', borderRadius: 2}}
                value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>
        
              {/*  <Input type="file" hidden onChange={handleImageUpload} />
            
            {image && <Image src={URL.createObjectURL(image)} alt="Uploaded Image" />}  */}
        
              Please upload any images if you have:
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
        
           
            <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={() => setModalDeleteShow(true)} >PLACE ISSUE</Button>
        
            <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />
              
        </Stack>  
        
        
        </Box>
         
        
        
            
            )
  }

  export default CreateProject;