import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Box } from '@mui/joy';
import React, { useState } from 'react';
import { IUser } from '../../types';
import registerImg from '../../assets/register.jpg';
import { toast } from 'react-toastify';

interface Props {
  addNewUser: (user: IUser) => void;
}

const initialNewUser = {
  username: '',
  password: '',
};

const UserFormRegister: React.FC<Props> = ({addNewUser}) => {
  const [newUser, setNewUser] = useState<IUser>(initialNewUser);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newUser.username.trim().length === 0 || newUser.password.trim().length === 0) {
      toast.error("Enter your login and password!");
    } else {
      addNewUser(newUser);
    }
  };

  return (
    <Box
      sx={{
        width: '400px',
        margin: '5.5% auto',
        borderRadius: 4,
        p: "19px",
        backgroundColor: "rgba(123,131,128,0.71)",
      }}
    >
      <img
        style={{width: '100%', height: '50%', }}
        srcSet={registerImg}
        src={registerImg}
        alt='user'
        loading="lazy"
      />
      <form onSubmit={onSubmitForm}>
        <Stack spacing={1}>
          <Input
            style={{borderRadius: 2, height: '40px'}}
            type="text"
            value={newUser.username}
            id="username"
            name="username"
            onChange={onChange}
            placeholder="Enter your login"
          />
          <Input
            style={{borderRadius: 2, height: '40px'}}
            type="password"
            value={newUser.password}
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
          />
          <Button type="submit" sx={{height: '40px', fontSize: '18px'}}
            // disabled={loaderPost}
          >
            Enter
            {/*{loaderPost ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}*/}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UserFormRegister;