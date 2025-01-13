import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask, ITaskMutation } from '../../types';
import axiosRequest from '../../axiosRequest.ts';

export const addTask = createAsyncThunk<void, {task: ITaskMutation, token: string}>(
  'tasks/addTask',
  async ({task, token}) => {
    await axiosRequest.post('tasks', {...task}, {headers: {'Authorization': token}});
  }
);

export const getTasks = createAsyncThunk<ITask[], string>(
  'tasks/getTasks',
  async (token) => {
    const response = await axiosRequest('/tasks',  {headers: {'Authorization': token}});
    return response.data || [];
  }
);

export const deleteTask = createAsyncThunk<void, {taskId: string, token: string}>(
  'tasks/deleteTask',
  async ({taskId, token}) => {
     await axiosRequest.delete(`/tasks/${taskId}`,  {headers: {'Authorization': token}});
  }
);

export const editTask = createAsyncThunk<void, {taskId: string, task: ITaskMutation, token: string}>(
  'tasks/editTask',
  async ({taskId, task, token}) => {
    await axiosRequest.patch(`tasks/${taskId}`, {...task}, {headers: {'Authorization': token}});
  }
);
