
import { useState, useContext, useEffect } from 'react';
import Sidebar from '../Components/SideBar';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Outlet } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function MainScreen() {
  const { loggedUser, setLoggedUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = cookies.login_token; 
    if (userToken) {
      setLoggedIn(true);
      const storedUser = window.localStorage.getItem("loggedUser");
      if (storedUser) {
        setLoggedUser(JSON.parse(storedUser));
      }
    } else {
      setLoggedIn(false);
      navigate('/login');
    }
  }, [cookies, navigate, setLoggedUser]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    window.localStorage.removeItem("loggedUser");
    removeCookie("login_token");
    window.location.href = "/login"; // Force redirect to login page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, marginLeft: '240px' }}>
        <AppBar
          position="sticky"
          sx={{
            boxShadow: 'none',
            backgroundColor: 'white',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{ marginRight: 2, color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={handleMenuOpen}
            >
              <Avatar
                alt="User Avatar"
                src="/path/to/default/avatar.jpg"
                sx={{ marginRight: 1 }}
              />
              <Typography sx={{ color: 'black', marginRight: 0.5 }}>
                {loggedUser ? loggedUser.name : "User Name"}
              </Typography>
              <ArrowDropDownIcon sx={{ color: 'black' }} />
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            padding: '1rem',
            backgroundColor: '#F5F6FA',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}