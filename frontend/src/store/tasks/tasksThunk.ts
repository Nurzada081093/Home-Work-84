import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask, ITaskMutation } from '../../types';
import axiosRequest, { getAuthToken } from '../../axiosRequest.ts';

export const addTask = createAsyncThunk<void, ITaskMutation>(
  'tasks/addTask',
  async (task) => {
    getAuthToken();
    await axiosRequest.post('tasks', {...task});
  }
);

export const getTasks = createAsyncThunk<ITask[], void>(
  'tasks/getTasks',
  async () => {
    getAuthToken();
    const response = await axiosRequest('/tasks');
    return response.data || [];
  }
);

export const deleteTask = createAsyncThunk<void, string>(
  'tasks/deleteTask',
  async (taskId) => {
    getAuthToken();
     await axiosRequest.delete(`/tasks/${taskId}`);
  }
);

export const editTask = createAsyncThunk<void, {taskId: string, task: ITaskMutation}>(
  'tasks/editTask',
  async ({taskId, task}) => {
    getAuthToken();
    await axiosRequest.patch(`tasks/${taskId}`, {...task});
  }
);
