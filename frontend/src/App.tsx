import './App.css';
import LoginContainer from './Containers/LoginContainer/LoginContainer.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterContainer from './Containers/RegisterContainer/RegisterContainer.tsx';
import { Typography } from '@mui/material';
import TasksContainer from './Containers/TasksContainer/TasksContainer.tsx';
import NewTaskContainer from './Containers/NewTaskContainer/NewTaskContainer.tsx';
import EditTaskContainer from './Containers/EditTaskContainer/EditTaskContainer.tsx';
import Home from './Containers/Home/Home.tsx';
import Layout from './Components/Layout/Layout.tsx';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<LoginContainer/>}></Route>
        <Route path='/register' element={<RegisterContainer/>}></Route>
        <Route path='/tasks' element={<TasksContainer/>}></Route>
        <Route path='/tasks/newTask' element={<NewTaskContainer/>}></Route>
        <Route path='/tasks/:id/editTask' element={<EditTaskContainer/>}></Route>
        <Route path='*' element={<Typography variant="h1" component="h2" sx={{color: 'white', margin: '15% 30%'}}>Not found</Typography>}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
