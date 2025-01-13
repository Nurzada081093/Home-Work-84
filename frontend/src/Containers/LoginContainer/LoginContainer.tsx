import UserForm from '../../Components/UserForm/UserForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { clearUser, errorSlice, userSlice } from '../../store/users/usersSlice.ts';
import { getUser } from '../../store/users/usersThunk.ts';
import { IUser } from '../../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const LoginContainer = () => {
  const userAPI = useAppSelector(userSlice);
  const dispatch = useAppDispatch();
  const tokens: string[] = JSON.parse(localStorage.getItem('tokens') || '[]');
  const navigate = useNavigate();
  const userErrorFromAPI = useAppSelector(errorSlice);

  const getUserFromAPI = async (user: IUser) => {
    await dispatch(getUser(user));
  };

  useEffect(() => {
    if (userErrorFromAPI === null && userAPI) {
      dispatch(clearUser());
      navigate('/tasks');
    } else if (userErrorFromAPI !== null) {
      toast.error(`${userErrorFromAPI}`);
    }
  }, [userErrorFromAPI, userAPI, navigate]);


  if (userAPI) {
    const token = tokens.find(token => token === userAPI.token);

    if (!token) {
      tokens.push(userAPI.token);
    }
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  return (
    <div className='login'>
      <UserForm getUserFromAPI={getUserFromAPI}/>
    </div>
  );
};

export default LoginContainer;