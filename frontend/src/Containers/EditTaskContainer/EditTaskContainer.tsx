import TaskForm from '../../Components/TaskForm/TaskForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { ITaskMutation } from '../../types';
import { tokenSlice } from '../../store/users/usersSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { editTask, getTasks } from '../../store/tasks/tasksThunk.ts';
import { toast } from 'react-toastify';

const EditTaskContainer = () => {
  const userToken = useAppSelector(tokenSlice);
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const addNewTask = (task: ITaskMutation) => {
    if (id) {
      dispatch(editTask({taskId: id, task, token: userToken}));
      toast.success("The task was edited successfully!");
      dispatch(getTasks(userToken));
      navigate('/tasks');
    }
  };
  return (
    <>
      <TaskForm addNewTask={addNewTask} isEdit/>
    </>
  );
};

export default EditTaskContainer;