import React from 'react';
import {Card, CardContent, Grid, Typography,TextField, Button, CircularProgress} from '@mui/material';
import { useNavigate} from 'react-router-dom'  //Navigate
import {useState} from 'react';
import shadows from '@mui/material/styles/shadows';


const TaskForm = () => {

    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        iscomplete: false
    });

    const[loading, setLoading] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();

        setLoading(true);

        const res = await fetch("http://localhost:4000/tasks",{
            method:'POST',
            body: JSON.stringify(task),
            //para decirle que es un objeto JSON:
            headers: {"Content-Type": "application/json"},
        }); 

        const data = await res.json();
        
        setLoading(false);
        console.log(data);
        navigate("/");
    }


    const handleChange =(e)=>{
        // name: el nombre del textField
        // value: lo que se esta tipeando
        // console.log(e.target.name, e.target.value);
        setTask({...task,[e.target.name]: e.target.value})
    }

    const handleCancel=(e)=>{
        navigate("/");
    }

    return (

    
        // para obtener un cuadro centrado en la pantalla: "container y item" 
        <Grid 
            container
            direction="column"
            alignItems="center"   
            
        > 
            <Grid item xs={3}>
                <Card 
                    sx={{mt:5}}
                    style={{
                        backgroundColor: "#1e272e",
                        padding: "1rem",
                        borderRadius: "10px"

                    }}>
                    <Typography color="#eee" textAlign="center" > Create Taks</Typography>
                    
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Task Name'
                                sx={{
                                    display:"block",
                                    // margin:".5rem 0rem",
                                    // paddig: "30rem 10rem"
                                }}
                                name='title'
                                onChange={handleChange}
                                inputProps={{style:{color: "white"  }}}
                                InputLabelProps={{style:{color: "white"}}}
                            />

                            <TextField
                                variant='filled'
                                label='Description'
                                multiline
                                rows={4}
                                sx={{
                                    display:"block",
                                    margin:".5rem .3rem .5rem .18rem",

                                }}
                                name='description'
                                onChange={handleChange}
                                inputProps={{style:{color: "white"}}}
                                InputLabelProps={{style:{color: "white"}}}
                                />
    
                            <Button 
                                variant='contained'
                                color="primary"
                                disabled={!task.title }
                                style={{marginRight: "50px"}}
                                type='submint'
                            > 
                                {loading? <CircularProgress 
                                color ="inherit"
                                size={24}/>: 'save'}
                                
                            </Button>

                            <Button
                            variant= "contained"
                            color = "warning"
                            onClick={handleCancel}

                            >
                                cancel
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
};

export default TaskForm;