import { ITask } from '../../types';
import React from 'react';
import Task from './Task/Task.tsx';

interface Props {
  tasks: ITask[];
}

const Tasks: React.FC<Props> = ({tasks}) => {
  return (
    <>
      {tasks.map((task: ITask) => (
        <Task key={task._id} task={task} />
      ))}
    </>
  );
};

export default Tasks;