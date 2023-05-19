import React, { useEffect, useState } from "react";
import axios from 'axios';
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
    height:'100vh'

  };


function AcceptDeclineBlog(){

    const [apiData, setApiData] = useState([]);
    const [modalDeleteShow, setModalDeleteShow] = React.useState(false);
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch(`http://localhost:7000/api/posts/post/${id}`);
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
        axios.patch(`http://localhost:7000/api/posts/post/accept/${id}`)
        navigate("/blog-list-page")
       
    };

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

            <h1>Blog Title: </h1>{ apiData.title}
            <h1>Blog Description: </h1>{ apiData.summary}
            
            <h1>Blog:  </h1>{ apiData.content}
            <h3>Proof: </h3><img src={apiData.cover} alt="My Photo" width="50%" height="50%"/>
            

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

export default AcceptDeclineBlog;



/* <div>
            <h1>Blog title: {apiData.userId}</h1>
      <p>Blog description: {apiData.id}</p>
      <div>Blog:  {apiData.title}</div>
        </div>*/