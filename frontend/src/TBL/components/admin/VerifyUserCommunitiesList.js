import React from "react";
import { useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const commonStyles = {
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  width:'100wh',
  height:'100vh'

};

function VerifyUserCommunitiesList(){

  const [apiData, setApiData] = useState([]);

  useEffect(() => {

    const getBlogData = async () => {
        const response = await fetch("http://localhost:7000/api/community/get-community-by-status/Pending");
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

    return (
      <Box sx={commonStyles}>

      <Stack spacing={2} direction='column' sx={{justifyContent:'center',alignItems:'center'}}>

      <TableContainer component={Paper}>
<Table sx={{ minWidth: 750 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell><h4>Comunity ID</h4></TableCell>
      <TableCell align="right"><h4>Comunity Name</h4></TableCell>
      <TableCell align="right"><h4>Date created</h4></TableCell>
      <TableCell align="right"><h4>created By</h4></TableCell>
      
      <TableCell align="right"><h4>View</h4></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {apiData.map((row) => (
      <TableRow
        key={row._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="right">{row.commName}</TableCell>
        <TableCell align="right">{row.startedDate}</TableCell>
        <TableCell align="right">{row.createdBy}</TableCell>
        <TableCell align="right"><Link to={{ pathname: `/verify-user-community/${row._id}` }}>View</Link></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>



      </Stack>


  </Box>
      );





}

export default VerifyUserCommunitiesList;