import { configureStore } from '@reduxjs/toolkit';
import { usersRouter } from '../store/users/usersSlice.ts';

export const store = configureStore({
  reducer: {
    users: usersRouter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

