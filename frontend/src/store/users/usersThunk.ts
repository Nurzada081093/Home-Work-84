import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserMutation } from '../../types';
import axiosRequest from '../../axiosRequest.ts';

export const getUser = createAsyncThunk<IUserMutation, IUser>(
  'users/getUserThunk',
  async (user) => {
    const response = await axiosRequest.post('/users/sessions', user);
    return response.data || null;
  }
);

export const addUser = createAsyncThunk<IUserMutation, IUser>(
  'users/addUser',
  async (user) => {
    const response = await axiosRequest.post('/users', user);
    return response.data;
  }
);