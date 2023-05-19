import React from "react";
import { useState, useEffect} from "react";
import Box from '@mui/material/Box';
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

  function IssuesList(){

    const [apiData, setApiData] = useState([])

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch("http://localhost:7000/api/issue/get-issue-by-issue-status/Pending");
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
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h4>Issue Title</h4></TableCell>
            <TableCell align="right"><h4>Status</h4></TableCell>
            <TableCell align="right"><h4>Province</h4></TableCell>
            <TableCell align="right"><h4>District</h4></TableCell>
            <TableCell align="right"><h4>Action</h4></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.province}</TableCell>
              <TableCell align="right">{row.district}</TableCell>
              
              <TableCell align="right"><Link to={{ pathname: `/issues-to-accept/${row._id}` }}>View</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </Stack>

        </Box>




    )


  }

  export default IssuesList;