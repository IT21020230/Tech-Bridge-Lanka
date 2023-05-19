import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Navigate, useParams } from "react-router-dom";
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


function VerifyUserCommunity(){

    const [apiData, setApiData] = useState([]);

    const {id} = useParams();

    const navigate = useNavigate();

    const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch(`http://localhost:7000/api/community/get-single-comuunity/${id}`);
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
        axios.patch(`http://localhost:7000/api/community/accept-community/${id}`);
        
       navigate("/verify-user-communities-list")
    };

    
    
      //Delete modal
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
        <>

        <Box sx = {commonStyles}>

            <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center', width:'50%',height:'90%'}}>

            {apiData.length > 0 && apiData[0].logo}
            {apiData.length > 0 && apiData[0].coverPic}
            <h1>Community Name: </h1>{apiData.length > 0 && apiData[0].commName}
            <h1>Community Location: </h1>{apiData.length > 0 && apiData[0].location}
            
            <h1>Vision:  </h1>{apiData.length > 0 && apiData[0].vission}
            <h1>Mission:  </h1>{apiData.length > 0 && apiData[0].Mission}
            <h1>Instagram:  </h1>{apiData.length > 0 && apiData[0].instergrameLink}
            <h1>Whatsapp:  </h1>{apiData.length > 0 && apiData[0].whatsappLink}
            <h1>Facebook:  </h1>{apiData.length > 0 && apiData[0].faceBookLink}
            <h1>Contact:  </h1>{apiData.length > 0 && apiData[0].contactNumber}
            <h3>Size: </h3>{apiData.length > 0 && apiData[0].size}
            

      <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={() => setModalDeleteShow(true)}>Accept</Button>
      <Button variant="contained" style={{ backgroundColor: 'red' }}>Decline</Button>

      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />



            </Stack>



        </Box>
        
        
        
        </>
    )



}

export default VerifyUserCommunity;



/* <div>
            <h1>Blog title: {apiData.userId}</h1>
      <p>Blog description: {apiData.id}</p>
      <div>Blog:  {apiData.title}</div>
        </div>*/