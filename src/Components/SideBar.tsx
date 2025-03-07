
import { useState, useEffect } from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import { useCookies } from 'react-cookie';
import logo from '../assets/download (1).png';


const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);
  // const navigate = useNavigate();

  useEffect(() => {
    const userToken = cookies.login_token; 
    if (userToken) {
      setLoggedIn(true);
      const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser") || '{}');
      setUserRole(loggedUser.role);
    } else {
      setLoggedIn(false);
    }
  }, [cookies]);
console.log(isLoggedIn);
console.log(setCookie);
  const handleLogout = () => {
    console.log("Logging out...");
    window.localStorage.removeItem("loggedUser");
    removeCookie("login_token");
    setLoggedIn(false);
    window.location.href = "/login"; 
  };

  const userMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Create tickets', icon: <EventIcon />, path: '/tickets' },
    // { text: 'Tickets List', icon: <ListAltIcon />, path: '/tickets/created' },
    { text: 'Response', icon: <ReplyIcon />, path: '/Response' },
  ];

  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    // { text: 'Create tickets', icon: <EventIcon />, path: '/tickets' },
    { text: 'Tickets List', icon: <ListAltIcon />, path: '/tickets/created' },
    { text: 'Response', icon: <ReplyIcon />, path: '/Response' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: '240px',
          backgroundColor: '#fff',
          padding: '1rem',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ width: '80px', marginBottom: '1rem' }}
        />
      </Box>

      <List>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={item.text}
            style={({ isActive }) => ({
              textDecoration: 'none', 
              color: isActive ? '#FFB606' : 'gray',
              fontWeight: isActive ? '700px' : '400px',
            })}
          >
            <ListItem
              onClick={() => setActiveIndex(index)} 
              sx={{
                color: activeIndex === index ? '#FFB606' : 'gray',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                borderLeft: activeIndex === index ? '4px solid purple' : 'none',
                pl: activeIndex === index ? '12px' : '20px',
              }}
            >
              <ListItemIcon sx={{ color: activeIndex === index ? '#FFB606' : 'gray' }}>
                {item.icon}
              </ListItemIcon>
              <Typography
                variant="body1"
                style={{
                  fontWeight: activeIndex === index ? 'bold' : 'normal',
                  fontSize: '16px', 
                }}
              >
                {item.text}
              </Typography>
            </ListItem>
          </NavLink>
        ))}
      </List>

      <Divider sx={{ marginTop: 'auto' }} />

      <List>
        <ListItem
          onClick={handleLogout}
          sx={{
            color: '#A020EF',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#A020EFFF' }}>
            <LogoutIcon />
          </ListItemIcon>
          <Typography variant="body1" style={{ fontSize: '16px' }}>
            Logout
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;