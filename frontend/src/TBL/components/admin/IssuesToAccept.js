import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";
import myPhoto from './events-in-hyderabad.jpg'
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";


const commonStyles = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width:'50wh',
    height:'100%'

  };



function IssuesToAccept(){
    const [apiData,setApiData] = useState([]);
    const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch(`http://localhost:7000/api/issue/get-issue-by-id/${id}`);
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

        console.log(apiData.title)
    },[]);

    function getDataFunction(json){
        setApiData(json);

       
    }

    function convertToImage(base64String) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve(img);
          };
          img.onerror = (error) => {
            reject(error);
          };
          img.src = base64String;
        });
      }

      function handleAccept (e){

        axios.patch(`http://localhost:7000/api/issue/accept-issue/${id}`);
        navigate('/issues-list-page');
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
              <h5>Are you sure want to accept the community?</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ marginRight: "20px" }}
                variant="danger"
                onClick={handleAccept}
                
              >
                Accept
              </Button>
              <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (

        <Box sx={commonStyles}>

            <Stack spacing={2} direction='column' sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'50%',height:'90%'}}>


            <h3>Issue Topic:</h3>{apiData.length > 0 && apiData[0].title}

            <h3>Issue details: </h3>{apiData.length > 0 && apiData[0].description}
            <h3>Proof: </h3><img src={apiData.length > 0 && apiData[0].proof} alt="My Photo" width="50%" height="50%"/>
            <h3>Province: </h3>{apiData.length > 0 && apiData[0].province}
            <h3>District: </h3>{apiData.length > 0 && apiData[0].district}

            <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={()=> setModalDeleteShow(true)}>Accept</Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>Decline</Button>

      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />



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