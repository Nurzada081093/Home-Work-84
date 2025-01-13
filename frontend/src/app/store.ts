import { configureStore } from '@reduxjs/toolkit';
import { usersRouter } from '../store/users/usersSlice.ts';
import { tasksRouter } from '../store/tasks/tasksSlice.ts';

export const store = configureStore({
  reducer: {
    users: usersRouter,
    tasks: tasksRouter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

