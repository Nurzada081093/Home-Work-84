import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { allTasksSlice } from '../../store/tasks/tasksSlice.ts';
import { useEffect } from 'react';
import { tokenSlice } from '../../store/users/usersSlice.ts';
import { getTasks } from '../../store/tasks/tasksThunk.ts';
import Tasks from '../../Components/Tasks/Tasks.tsx';
import { Box } from '@mui/joy';

const TasksContainer = () => {
  const tasks = useAppSelector(allTasksSlice);
  const userToken = useAppSelector(tokenSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasks(userToken));
  }, [dispatch]);

  return (
    <Container>
      <Button variant="contained" onClick={() => navigate('/tasks/newTask')}>Add new task</Button>
      <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '40px'}}>
        <Tasks tasks={tasks}/>
      </Box>
    </Container>
  );
};

export default TasksContainer;