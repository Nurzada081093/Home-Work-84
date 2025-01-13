import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { ITask } from '../../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hoks.ts';
import { deleteTask, getTasks } from '../../../store/tasks/tasksThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DeleteButtonSpinner from '../../UI/DeleteButtonSpinner/DeleteButtonSpinner.tsx';

interface Props {
  task: ITask;
}

const Task: React.FC<Props> = ({task}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState<{index: string | null; loading: boolean}>({
    index: null,
    loading: false,
  });

  const deleteUserTask = async (taskId: string) => {
    setDeleteLoading(prevState => ({...prevState, loading: true, index: taskId}));
    await dispatch(deleteTask(taskId));
    await dispatch(getTasks());
    toast.success("The task was deleted successfully");
    setDeleteLoading(prevState => ({...prevState, loading: false, index: null}));
  };

  return (
    <Card sx={{ width: '300px', margin: '20px 10px', display: 'flex', flexDirection: 'column', wordWrap: 'break-word', whiteSpace: 'normal'}}>
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
        <Button
          disabled={deleteLoading.loading && task._id === deleteLoading.index}
          size="small" color="primary" onClick={() => deleteUserTask(task._id)}>
          Delete
          {deleteLoading.loading && task._id === deleteLoading.index ? <DeleteButtonSpinner/> : null}
        </Button>
        <Button size="small" color="primary" onClick={() => navigate(`/tasks/${task._id}/editTask`)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;