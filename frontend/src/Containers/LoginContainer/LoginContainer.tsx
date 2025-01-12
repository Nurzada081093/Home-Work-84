import UserForm from '../../Components/UserForm/UserForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hoks.ts';
import { userSlice } from '../../store/users/usersSlice.ts';
import { addUser } from '../../store/users/usersThunk.ts';
import { IUser } from '../../types';

const LoginContainer = () => {
  const userAPI = useAppSelector(userSlice);
  const dispatch = useAppDispatch();

  const getUserFromAPI = async (user: IUser) => {
    await dispatch(addUser(user));


  };

  console.log(userAPI);

  return (
    <>
      <UserForm getUserFromAPI={getUserFromAPI}/>
    </>
  );
};

export default LoginContainer;