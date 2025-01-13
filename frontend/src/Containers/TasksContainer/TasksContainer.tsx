import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { allTasksSlice, getSlice } from '../../store/tasks/tasksSlice.ts';
import { useEffect } from 'react';
import { getTasks } from '../../store/tasks/tasksThunk.ts';
import Tasks from '../../Components/Tasks/Tasks.tsx';
import { Box } from '@mui/joy';
import ToolBar from '../../Components/ToolBar/ToolBar.tsx';
import Typography from '@mui/material/Typography';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const TasksContainer = () => {
  const tasks = useAppSelector(allTasksSlice);
  const loader = useAppSelector(getSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      <ToolBar/>
      {loader ? <Loader/> :
        <Container>
          <Box sx={{margin: '20px 0', textAlign: 'end', width: '98%'}}>
            <Button variant="contained" onClick={() => navigate('/tasks/newTask')}>Add new task</Button>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '40px'}}>
            {tasks.length !== 0 ? <Tasks tasks={tasks}/> : <Typography variant="body2" sx={{ color: 'white', fontSize: '50px'}}>
              No tasks yet!
            </Typography>}
          </Box>
        </Container>
      }
    </>
  );
};

export default TasksContainer;