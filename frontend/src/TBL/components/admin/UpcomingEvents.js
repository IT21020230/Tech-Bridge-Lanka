import React from "react";
import { useState, useEffect} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Input, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core";
import { Stack } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";


const commonStyles = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width:'50wh',
    height:'100vh'

  };


function UpcomingEvents(){

  const [apiData, setApiData] = useState([]);

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch("http://localhost:7000/api/events/get-event-by-status/Pending");
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

        <Box sx={commonStyles}>

            <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Event Name</h4></TableCell>
            <TableCell align="right"><h4>Comunity ID</h4></TableCell>
            <TableCell align="right"><h4>Comunity Name</h4></TableCell>
            <TableCell align="right"><h4>Date</h4></TableCell>
            <TableCell align="right"><h4>Location</h4></TableCell>
            <TableCell align="right"><h4>View</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.commID}</TableCell>
              <TableCell align="right">{row.commName}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right"><Link to={{ pathname: `/accept-decline-upcoming-event/${row._id}` }}>View</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>





            </Stack>





        </Box>




    )




}

export default UpcomingEvents;