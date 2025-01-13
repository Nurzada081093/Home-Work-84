import {
  Button,
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
        margin: '20px 10px',
        padding: '20px 10px',
      }}>
        <Grid container spacing={2} sx={{margin: '0 30%', width: '80%'}}>
          <Typography variant="h4" sx={{flexGrow: 0.4, textAlign: 'center', marginBottom: '20px'}}>
            {isEdit ? 'Edit' : 'Add'} task
          </Typography>
          <Grid size={12}>
            <TextField
              sx={{width: '50%'}}
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
              sx={{width: '50%'}}
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
            <FormControl sx={{width: '50%'}}>
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
              // disabled={addLoading}
              sx={{width: '50%'}} variant="contained"
              type="submit">
              {isEdit ? 'Edit' : 'Add'}
              {/*{addLoading ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}*/}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskForm;