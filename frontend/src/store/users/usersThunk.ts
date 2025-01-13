import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserMutation } from '../../types';
import axiosRequest from '../../axiosRequest.ts';
import { AxiosError } from 'axios';

export const getUser = createAsyncThunk<IUserMutation, IUser>(
  'users/getUserThunk',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosRequest.post('/users/sessions', user);
      return response.data || null;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return rejectWithValue(error.response.data.error);
        }
      }
    }
  }
);

export const addUser = createAsyncThunk<IUserMutation, IUser>(
  'users/addUser',
  async (user) => {
    const response = await axiosRequest.post('/users', user);
    return response.data;
  }
);