import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

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

    const [modalDeleteShow, setModalDeleteShow] = React.useState(false);
    
    const {id} = useParams();
    const navigate = useNavigate();

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
        axios.patch(`http://localhost:7000/api/events/accept/${id}`)
        navigate("/upcoming-events-list")

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

    return(

        <Box sx={commonStyles}>
            <Stack spacing={2} direction='column' sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'50%',height:'90%'}}>

            <h3>Event Name:</h3>{apiData.name}
            
            
            <h3>Other Info:</h3>{apiData.description}
            <img src={apiData.image} alt="My Photo" width="50%" height="50%"/>
            
            <h3>Comunity Name:</h3>{apiData.commName}

            <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={() => setModalDeleteShow(true)}>Accept</Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>Decline</Button>

      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />



            </Stack>


        </Box>



    )
}

export default AcceptDeclineUpcomingEvent;