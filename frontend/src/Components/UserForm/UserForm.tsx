import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/joy';
import React, { useState } from 'react';
import { IUser } from '../../types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hoks.ts';
import { loaderSlice } from '../../store/users/usersSlice.ts';
import { CircularProgress } from '@mui/material';

interface Props {
  getUserFromAPI: (user: IUser) => void;
}

const initialValues = {
  username: '',
  password: ''
};

const UserForm:React.FC<Props> = ({getUserFromAPI}) => {
  const [user, setUser] = useState<IUser>(initialValues);
  const loader = useAppSelector(loaderSlice);
  const navigate = useNavigate();

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.username.trim().length === 0 || user.password.trim().length === 0) {
      toast.error("Enter your login and password!");
    } else {
      getUserFromAPI({...user});
    }
  };

  return (
    <Box
      sx={{
        width: '400px',
        margin: '6% auto',
        borderRadius: 4,
        p: "19px",
        backgroundColor: "rgba(123,131,128,0.71)",
      }}
    >
      <img
        style={{width: '50%', height: '50%', margin: '10px 25%'}}
        srcSet={'https://media.licdn.com/dms/image/v2/C5612AQGzF_LiHLxBTw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1638096064024?e=2147483647&v=beta&t=SvqfhU5KF4rmSPQk3h_jZSSHnQ3CUh7SBi3KMWQr2Eo'}
        src={`https://media.licdn.com/dms/image/v2/C5612AQGzF_LiHLxBTw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1638096064024?e=2147483647&v=beta&t=SvqfhU5KF4rmSPQk3h_jZSSHnQ3CUh7SBi3KMWQr2Eo`}
        alt='user'
        loading="lazy"
      />
      <form onSubmit={onSubmitForm}>
        <Stack spacing={1}>
          <Input
            style={{borderRadius: 2, height: '40px'}}
            type="text"
            value={user.username}
            id="username"
            name="username"
            onChange={onChangeLogin}
            placeholder="Enter your login"
          />
          <Input
            style={{borderRadius: 2, height: '40px'}}
            type="password"
            value={user.password}
            id="password"
            name="password"
            onChange={onChangeLogin}
            placeholder="Enter your password"
          />
          <Button type="submit" sx={{height: '40px', fontSize: '18px'}}
            disabled={loader}
          >
            Login
            {loader ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
          <Button variant="outlined" type="button" sx={{height: '40px', fontSize: '18px', color: 'white', '&:hover': {color: 'rgb(123,131,128)'}}} onClick={() => navigate('/')}>Exit</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UserForm;