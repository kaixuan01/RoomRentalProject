import React, { useEffect } from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Home,
  Apartment,
  Info,
  ContactSupport,
  Person,
  BookOnline,
  Dashboard,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state); // Get entire Redux state
  const isLogin = useSelector((state) => state.isLogin) ?? false;
  const jsonUserProfile = useSelector((state) => state.userProfile) ?? {};
  const userProfile = JSON.parse(jsonUserProfile);

  useEffect(() => {
    console.log("Redux State - isLogin:", isLogin);
    console.log("Redux State - userProfile:", userProfile);
    console.log("Data Namespace:", reduxState);

    console.log("LocalStorage - userProfile:", localStorage.getItem('userProfile'));
  }, [isLogin, userProfile]);

  const mainMenuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Properties', icon: <Apartment />, path: '/property-listing' },
    { text: 'About Us', icon: <Info />, path: '/about-us' },
    { text: 'Contact Us', icon: <ContactSupport />, path: '/contact-us' },
  ];

  const userMenuItems = [
    { text: 'My Portal', icon: <Dashboard />, path: '/portal' },
    { text: 'My Bookings', icon: <BookOnline />, path: '/portal/bookings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer       
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: 280,
          '&::-webkit-scrollbar': {
            width: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#eff2f7',
            borderRadius: '15px',
          },
        },
      }}
    >
      {/* User Profile Section */}
      {isLogin && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              src={userProfile?.avatar}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Box>
              <Box sx={{ fontWeight: 'bold' }}>
                {userProfile?.Name || userProfile?.name || 'User'}
              </Box>
              <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                {userProfile?.Email || userProfile?.email || 'user@example.com'}
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
      )}

      {/* Main Navigation */}
      <List>
        {mainMenuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              py: 1,
              '&:hover': {
                bgcolor: 'primary.lighter',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* User Menu Items (shown only when logged in) */}
      {isLogin && (
        <>
          <Divider sx={{ my: 1 }} />
          <List>
            {userMenuItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  py: 1,
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Login/Register Buttons (shown when not logged in) */}
      {!isLogin && (
        <Box sx={{ p: 2 }}>
          <Stack spacing={1}>
            <ListItem 
              button 
              onClick={() => handleNavigation('/auth/login')}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>

            <ListItem 
              button 
              onClick={() => handleNavigation('/auth/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'primary.lighter',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
};

MobileSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileSidebar;
