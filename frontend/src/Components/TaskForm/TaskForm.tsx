import {
  Button, CircularProgress,
  Container,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { FormControl, Textarea } from '@mui/joy';
import { ITaskMutation } from '../../types';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../app/hoks.ts';
import { addSlice, editSlice } from '../../store/tasks/tasksSlice.ts';

interface Props {
  addNewTask: (task: ITaskMutation) => void;
  isEdit?: boolean;
}

const initialTask = {
  title: '',
  description: '',
  status: '',
};

const TaskForm: React.FC<Props> = ({addNewTask, isEdit}) => {
  const [newTask, setNewTask] = useState<ITaskMutation>(initialTask);
  const addLoading = useAppSelector(addSlice);
  const editLoading = useAppSelector(editSlice);

  const onChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setNewTask((prevState) => ({
      ...prevState,
      [name]: name === 'description' && value.trim().length === 0 ? null : value,
    }));
  };

  const onSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTask.title.trim().length === 0 || newTask.status.trim().length === 0) {
      toast.error("Enter the title and choose status!");
    } else {
      addNewTask({...newTask});
    }

    setNewTask(initialTask);
  };

  return (
    <Container>
      <form onSubmit={onSubmitTask} style={{
        margin: '40px auto',
        padding: '40px 10px',
        backgroundColor: 'rgba(235,241,241,0.93)',
        width: '50%',
        borderRadius: '10px'
      }}>
        <Grid container spacing={1} sx={{margin: '0 20%', width: '80%'}}>
          <Typography variant="h4" sx={{flexGrow: 0.4, textAlign: 'center', marginBottom: '20px'}}>
            {isEdit ? 'Edit' : 'Add'} task
          </Typography>
          <Grid size={10}>
            <TextField
              sx={{width: '100%'}}
              id="outlined-basic"
              label="Title"
              name="title"
              variant="outlined"
              value={newTask.title}
              onChange={onChange}
              type="text"
            />
          </Grid>
          <Grid size={12}>
            <Textarea
              sx={{width: '83%', backgroundColor: 'transparent', border: '1px solid darkgrey'}}
              id="outlined-basic"
              variant="outlined"
              placeholder="Description..."
              minRows={3}
              value={newTask.description || ''}
              name="description"
              onChange={onChange}
            />
          </Grid>
          <Grid size={12}>
            <FormControl sx={{width: '83%'}}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="Status"
                id="demo-simple-select-label"
                name="status"
                value={newTask.status}
                onChange={onChange}
                input={<OutlinedInput label="Status"/>}
                variant="outlined"
              >
                <MenuItem value="" disabled>Select the status!</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="in_progress">In progress</MenuItem>
                <MenuItem value="complete">Complete</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Button
              disabled={addLoading || editLoading}
              sx={{width: '83%'}} variant="contained"
              type="submit">
              {isEdit ? 'Edit' : 'Add'}
              {addLoading || editLoading ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskForm;