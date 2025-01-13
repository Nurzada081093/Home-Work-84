import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { ITask } from '../../../types';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hoks.ts';
import { tokenSlice } from '../../../store/users/usersSlice.ts';
import { deleteTask, getTasks } from '../../../store/tasks/tasksThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {
  task: ITask;
}

const Task: React.FC<Props> = ({task}) => {
  const token = useAppSelector(tokenSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteUserTask = (taskId: string) => {
    dispatch(deleteTask({taskId, token}));
    toast.success("The task was deleted successfully");
    dispatch(getTasks(token));
  };

  return (
    <Card sx={{ width: '300px', margin: '20px 0', display: 'flex', flexDirection: 'column', wordWrap: 'break-word', whiteSpace: 'normal'}}>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'end', width: '270px', margin: '10px auto' }}>
        Status: {task.status}
      </Typography>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {task.title}
          </Typography>
          {task.description !== null ? <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {task.description}
          </Typography> : null}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => deleteUserTask(task._id)}>
          Delete
        </Button>
        <Button size="small" color="primary" onClick={() => navigate(`/tasks/${task._id}/editTask`)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;