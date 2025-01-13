import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types';
import { addTask, deleteTask, editTask, getTasks } from './tasksThunk.ts';
import { RootState } from '../../app/store.ts';

interface InitialTask {
  tasks: ITask[];
  loaders: {
    getLoader: boolean;
    addLoader: boolean;
    deleteLoader: boolean;
    editLoader: boolean;
  },
  error: boolean;
}

const initialState: InitialTask = {
  tasks: [],
  loaders: {
    getLoader: false,
    addLoader: false,
    deleteLoader: false,
    editLoader: false,
  },
  error: false,
};

export const allTasksSlice = (state: RootState) => state.tasks.tasks;
export const addSlice = (state: RootState) => state.tasks.loaders.addLoader;
export const getSlice = (state: RootState) => state.tasks.loaders.getLoader;
export const editSlice = (state: RootState) => state.tasks.loaders.editLoader;

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loaders.addLoader = true;
        state.error = false;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.loaders.addLoader = false;
        state.error = false;
      })
      .addCase(addTask.rejected, (state) => {
        state.loaders.addLoader = false;
        state.error = true;
      })
      .addCase(getTasks.pending, (state) => {
        state.loaders.getLoader = true;
        state.error = false;
      })
      .addCase(getTasks.fulfilled, (state, {payload: tasks}) => {
        state.loaders.getLoader = false;
        state.error = false;
        state.tasks = tasks;
      })
      .addCase(getTasks.rejected, (state) => {
        state.loaders.getLoader = false;
        state.error = true;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loaders.deleteLoader = true;
        state.error = false;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loaders.deleteLoader = false;
        state.error = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loaders.deleteLoader = false;
        state.error = true;
      })
      .addCase(editTask.pending, (state) => {
        state.loaders.editLoader = true;
        state.error = false;
      })
      .addCase(editTask.fulfilled, (state) => {
        state.loaders.editLoader = false;
        state.error = false;
      })
      .addCase(editTask.rejected, (state) => {
        state.loaders.editLoader = false;
        state.error = true;
      });
  }
});

export const tasksRouter = tasksSlice.reducer;