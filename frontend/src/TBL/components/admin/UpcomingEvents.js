import React from "react";
import { useState } from "react";
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
    width:'100wh',
    height:'100vh'

  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Event 01', '6457df523d440e21c8c127db', '2021-02-07','Location 1'),
    createData('Event 02', '6457df523d440e21c8c127da', '2021-03-11', 'Location 2'),
    createData('Event 03', '6457df523d440e21c8c127d9', '2021-01-30', 'Location 3'),
    
  ];

function UpcomingEvents(){

    return(

        <Box sx={commonStyles}>

            <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Event Name</h4></TableCell>
            <TableCell align="right"><h4>Comunity ID</h4></TableCell>
            <TableCell align="right"><h4>Date</h4></TableCell>
            <TableCell align="right"><h4>Location</h4></TableCell>
            <TableCell align="right"><h4>View</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right"><Link>View</Link></TableCell>
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