import React, { useState, useRef } from 'react';
import './App.css';
import {
  Box,
  Button,
  TextField,
  Checkbox,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Card
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const idCounter = useRef(0);

  const addTask = () => {
    if (!titleInput.trim() || !descInput.trim()) return;
    const newTask = {
      id: idCounter.current++,
      title: titleInput,
      description: descInput,
      completed: false
    };    
    setTasks([...tasks, newTask]);
    setTitleInput('');
    setDescInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = () => {
    setTasks(tasks.filter(task => task.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  return (
    <Box className="App" display="flex" justifyContent="center" pt={10}>
      <Box width="100%" maxWidth="600px" p={2}>

        {/* Inputs */}
        <Stack spacing={2} mb={3}>
          <TextField
            fullWidth
            label="Task Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Task Description"
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTask}
            sx={{
              alignSelf: 'flex-start',
              px: '5%',
              whiteSpace: 'nowrap'
            }}
          >
            Add Task
          </Button>
        </Stack>

        {/* Cards */}      
        {tasks.map(task => (
          <Box key={task.id} mb={2}>
            <Card variant="outlined">
              <Box display="flex" alignItems="center" p={2}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  sx={{ mr: 2 }}
                />
                <Box flexGrow={1} textAlign="left">
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'gray' : 'black',
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'gray' : 'black',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {task.description}
                  </Typography>
                </Box>
                <IconButton onClick={() => setConfirmDeleteId(task.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Card>
          </Box>
        ))}

        {/* Delete */}
        <Dialog
          open={confirmDeleteId !== null}
          onClose={() => setConfirmDeleteId(null)}
        >

          <DialogTitle>
            {`Delete "${tasks.find(t => t.id === confirmDeleteId)?.title}"?`}
          </DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button color="error" onClick={deleteTask}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default App;