import { createSlice } from '@reduxjs/toolkit';
import { IUserMutation } from '../../types';
import { addUser, getUser } from './usersThunk.ts';
import { RootState } from '../../app/store.ts';

interface IUserInterface {
  user: IUserMutation | null;
  token: string;
  loading: boolean;
  error: boolean;
}

const initialState: IUserInterface = {
  user: null,
  token: '',
  loading: false,
  error: false,
}

export const userSlice = (state: RootState) => state.users.user;
export const tokenSlice = (state: RootState) => state.users.token;

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
        state.token = '';
        state.loading = false;
        state.error = false;
        state.user = user;
        state.token = user.token;
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
        state.token = '';
        state.loading = false;
        state.error = false;
        state.user = user;
        state.token = user.token;
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const usersRouter = usersSlice.reducer;