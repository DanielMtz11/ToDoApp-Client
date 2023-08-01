import React from 'react';
import {Button , Box, AppBar, Container, Toolbar, Typography} from '@mui/material';
import { useNavigate, Link} from 'react-router-dom' ;



const Nav = () => {

    const navigate = useNavigate();//es un hook que guardamos como un objeto nuevo llamado navigate
    
    
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position= "static" color="transparent">
                <Container>
                    <Toolbar>
                        <Typography variant='h6' sx={{flexGrow: 1}}>   
                        <Link style={{textDecoration:"none", color:"#eee"}} to="/">PERN Stack</Link>
                        </Typography>       
                        {/* <h1>Nav</h1> */}
                        <Button variant= "contained" color="primary" onClick={()=>{navigate("/task/")}}> new task</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Nav;