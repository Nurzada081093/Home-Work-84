import { createSlice } from '@reduxjs/toolkit';
import { IUserMutation } from '../../types';
import { addUser, getUser } from './usersThunk.ts';
import { RootState } from '../../app/store.ts';

interface IUserInterface {
  user: IUserMutation | null;
  loading: boolean;
  error: boolean;
}

const initialState: IUserInterface = {
  user: null,
  loading: false,
  error: false,
}

export const userSlice = (state: RootState) => state.users.user;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUser.fulfilled, (state, {payload: user}) => {
        state.user = null;
        state.loading = false;
        state.error = false;
        state.user = user;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addUser.fulfilled, (state, {payload: user}) => {
        state.user = null;
        state.loading = false;
        state.error = false;
        state.user = user;
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const usersRouter = usersSlice.reducer;