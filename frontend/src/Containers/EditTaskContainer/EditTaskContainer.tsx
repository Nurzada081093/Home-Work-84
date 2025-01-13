import TaskForm from '../../Components/TaskForm/TaskForm.tsx';
import { useAppDispatch } from '../../app/hoks.ts';
import { ITaskMutation } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { editTask, getTasks } from '../../store/tasks/tasksThunk.ts';
import { toast } from 'react-toastify';

const EditTaskContainer = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const addNewTask = (task: ITaskMutation) => {
    if (id) {
      dispatch(editTask({taskId: id, task}));
      toast.success("The task was edited successfully!");
      dispatch(getTasks());
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