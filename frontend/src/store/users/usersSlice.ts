import { createSlice } from '@reduxjs/toolkit';
import { IUserMutation } from '../../types';
import { addUser, getUser } from './usersThunk.ts';
import { RootState } from '../../app/store.ts';

interface IUserInterface {
  user: IUserMutation | null;
  loading: boolean;
  error: string | null;
}

const initialState: IUserInterface = {
  user: null,
  loading: false,
  error: null,
}

export const userSlice = (state: RootState) => state.users.user;
export const loaderSlice = (state: RootState) => state.users.loading;
export const errorSlice = (state: RootState) => state.users.error;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, {payload: user}) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.user = user;
      })
      .addCase(getUser.rejected, (state, {payload: message}) => {
        state.loading = false;
        if (message) {
          state.error = String(message);
        }
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, {payload: user}) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.user = user;
      })
      .addCase(addUser.rejected, (state, {payload: message}) => {
        state.loading = false;
        if (message) {
          state.error = String(message);
        }
      });
  }
});

export const usersRouter = usersSlice.reducer;
export const { clearUser } = usersSlice.actions;
