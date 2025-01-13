import UserFormRegister from '../../Components/UserFormRegister/UserFormRegister.tsx';
import { IUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { userSlice } from '../../store/users/usersSlice.ts';
import { addUser } from '../../store/users/usersThunk.ts';
import { useNavigate } from 'react-router-dom';

const RegisterContainer = () => {
  const userAPI = useAppSelector(userSlice);
  const dispatch = useAppDispatch();
  const  navigate = useNavigate();

  const addNewUser = (user: IUser) => {
    dispatch(addUser(user));
    navigate('/tasks');
  };

  const tokens: string[] = JSON.parse(localStorage.getItem('tokens') || '[]');

  if (userAPI) {

    const token = tokens.find(token => token === userAPI.token);

    if (!token) {
      tokens.push(userAPI.token);
    }

    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  console.log(userAPI);
  console.log(tokens);

  return (
    <div className='register'>
      <UserFormRegister addNewUser={addNewUser} />
    </div>
  );
};

export default RegisterContainer;