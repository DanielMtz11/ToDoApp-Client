import React, { useState, useEffect } from 'react';
import { Card, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';

const apiURL = process.env.REACT_APP_API_URL;

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);

  const loadTasks = async () => {
    try {
      // const res = await fetch('http://localhost:4000/tasks/');
      const res = await fetch(`${apiURL}/tasks`);
      const data = await res.json();

      const updateLoadTasks = data.map(task => ({...task, isComplete: task.iscomplete}));
      setTaskList(updateLoadTasks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${apiURL}tasks/${id}`, {
        method: 'DELETE',
      });

      setTaskList(taskList.filter((task) => task.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = async (id, isComplete) => {
    try {
      const updatedTaskList = taskList.map((task) =>
        task.id === id ? { ...task, isComplete: !isComplete } : task
      );

      setTaskList(updatedTaskList);

      await fetch(`${apiURL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ iscomplete: !isComplete }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const Responsive = styled('div')(({ theme }) => ({
    [theme.breakpoints.down("sm")]:{
      width :"350px",
      fontSize: ".8rem"   
  },

  [theme.breakpoints.up("sm")]:{
      width :"600px",
      fontSize: "1.2rem"
  },

  [theme.breakpoints.up("md")]:{
      width :"700px"
  }
}));

const ButtonStyle = styled("div")(({theme})=>({
  [theme.breakpoints.up("sm")]:{
      marginLeft: "15px",
  },
  }));

  return (
    <div
      style={{
        display: 'flex',
        WebkitFlexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>taskList</h1>
      <Responsive>
        {taskList.map((task) => {
          return (
            <Card
              key={task.id}
              style={{
                marginBottom: '1rem',
                backgroundColor: '#1e272e',
            
              }}
            >
              <CardContent
                sx={{ height: 'auto' }}
                style={{
                  display: 'grid',
                  alignItems: "center",
                  gridTemplateColumns: '.5fr 3fr 1fr',
                }}
              >
                <ButtonStyle>
                  <IconButton
                    style={{
                      borderRadius: '50%',
                      width: '23px',
                      height: '23px',
                      cursor: 'pointer',
                      backgroundColor: task.isComplete? '#1976D2' : '#0000',
                      border: '1px solid white',
                    }}
                    onClick={() => handleUpdate(task.id, task.isComplete)}
                  />
                </ButtonStyle>

                <div style={{ textDecoration: task.isComplete? "line-through" :"none", color: task.isComplete? "#808080":"whitesmoke" }} sx={{ padding: '10px' }}>
                  <h2  style={{ margin:'0px 0px 8px' }}>{task.title}</h2 >
                  <p style={{ margin: '0px' }}>{task.description}</p>
                </div>

                <div>
                  <Button
                    sx={{ marginLeft: '30px' }}
                    variant='outlined'
                    color='error'
                    onClick={() => handleDelete(task.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </Responsive>
    </div>
  );
};

export default TaskList;
