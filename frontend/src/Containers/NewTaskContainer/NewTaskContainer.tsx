import TaskForm from '../../Components/TaskForm/TaskForm.tsx';
import { ITaskMutation } from '../../types';
import { useAppDispatch } from '../../app/hoks.ts';
import { addTask, getTasks } from '../../store/tasks/tasksThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ToolBar from '../../Components/ToolBar/ToolBar.tsx';

const NewTaskContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNewTask = (task: ITaskMutation) => {
    dispatch(addTask({...task}));
    toast.success("The task was added successfully");
    dispatch(getTasks());
    navigate('/tasks');
  };

  return (
    <>
      <ToolBar/>
      <TaskForm addNewTask={addNewTask}/>
    </>
  );
};

export default NewTaskContainer;