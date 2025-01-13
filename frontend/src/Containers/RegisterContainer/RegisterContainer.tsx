import UserFormRegister from '../../Components/UserFormRegister/UserFormRegister.tsx';
import { IUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { userSlice } from '../../store/users/usersSlice.ts';
import { addUser } from '../../store/users/usersThunk.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const RegisterContainer = () => {
  const userAPI = useAppSelector(userSlice); // Получаем информацию о пользователе
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNewUser = async (user: IUser) => {
    await dispatch(addUser(user));
    toast.success("You are successfully registered!");

    navigate('/tasks');
  };

  useEffect(() => {
    if (userAPI) {
      navigate('/tasks');
    }
  }, [userAPI, navigate]);

  const tokens: string[] = JSON.parse(localStorage.getItem('tokens') || '[]');

  if (userAPI && userAPI.token) {
    const tokenExists = tokens.includes(userAPI.token);
    if (!tokenExists) {
      tokens.push(userAPI.token);
      localStorage.setItem('tokens', JSON.stringify(tokens));
    }
  }

  return (
    <div className='register'>
      <UserFormRegister addNewUser={addNewUser} />
    </div>
  );
};

export default RegisterContainer;

