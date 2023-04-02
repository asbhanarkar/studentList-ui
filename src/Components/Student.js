import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Table, TableContainer,TableHead, TableCell, TableBody,TableRow } from '@mui/material';

export default function Student() {
    const paperStyle = {padding:"50px 20px" , width: 600, margin:'20px auto'};
    const [name, setName] =React.useState('');
    const [address, setAddress] =React.useState('');
    const [student, setStuent]= React.useState([]);

    const handleClick =(e)=>{
        e.preventDefault();
        const student={name,address};
        console.log(student);

        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then=(()=>{
            console.log("Successfully added New student")
        })
        window.location.reload(true)
    }

    React.useEffect(()=>{
        fetch("http://localhost:8080/student/getAllStudent").
        then(res=>res.json()).
        then(result=>{
            setStuent(result)
        })
    },[])

    // console.log(student);

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h2>Add New Student</h2>
            <Box component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Student Name" variant="standard" fullWidth 
                value={name} onChange={(e)=>setName(e.target.value)}/>
                <TextField id="standard-basic" label="Address" variant="standard" fullWidth 
                value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <Button variant='contained' color='secondary' onClick={handleClick}>Sumbit</Button>
                {/* <Button variant='contained' color='secondary' onClick={handleClick}>All Student List</Button> */}
            </Box>
        </Paper>

        
        <TableContainer component={Paper} style={{margin:'30px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell align="right"><b>Name</b></TableCell>
                        <TableCell align="right"><b>Address</b></TableCell>  
                    </TableRow>
                </TableHead>
                <TableBody>
                    {student.map((row) => (
                        <TableRow  >
                            <TableCell component="th" scope="row">{row.id} </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
  );
}