import TaskForm from '../../Components/TaskForm/TaskForm.tsx';
import { ITaskMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { tokenSlice } from '../../store/users/usersSlice.ts';
import { addTask, getTasks } from '../../store/tasks/tasksThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewTaskContainer = () => {
  const userToken = useAppSelector(tokenSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNewTask = (task: ITaskMutation) => {
    dispatch(addTask({task, token: userToken}));
    toast.success("The task was added successfully");
    dispatch(getTasks(userToken));
    navigate('/tasks');
  };

  return (
    <>
      <TaskForm addNewTask={addNewTask}/>
    </>
  );
};

export default NewTaskContainer;