import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ToolBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background: 'rgb(49,53,49)'}}>
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to={'/'} style={{textDecoration: 'none', color: 'white', fontSize: '30px', fontWeight: '600', fontStyle: 'italic'}}>Todolist</NavLink>
            </Typography>
            <Box sx={{width: '200px', display: 'flex', justifyContent: 'space-between'}}>
              <Button variant="outlined" to={'/login'} component={NavLink} color="inherit">
                Log in
              </Button>
              <Button variant="outlined" to={'/register'} component={NavLink} color="inherit">
                Sign up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ToolBar;