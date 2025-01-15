import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, styled, Stack, IconButton, Button, Box, useMediaQuery } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import { IconMenu } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import Logo from '../../../assets/images/logos/SmallLogo.png';
import LoginDialog from '../../../components/Dialog/LoginDialog';

// Components
import Profile from './MainProfile';

const MainHeader = (props) => {
  const isLogin = useSelector((state) => state.isLogin) ?? false;
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isRegisterTab, setIsRegisterTab] = useState(false);

  // Styled Components
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',

    backgroundColor: theme.palette.primary.light,
    backdropFilter: 'blur(6px)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('lg')]: {
      minHeight: '50px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 3),
    color: theme.palette.text.secondary
  }));

  const NavLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      fontWeight: 500,
      color: theme.palette.text.primary,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    '& a.active': {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  }));

  const handleNavigation = (path) => navigate(path);

  const handleLoginClick = () => {
    setIsRegisterTab(false);
    setOpenLoginDialog(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterTab(true);
    setOpenLoginDialog(true);
  };

  const handleLoginSuccess = () => {
    setOpenLoginDialog(false);
  };

  return (
    <AppBarStyled position="sticky" >
      <ToolbarStyled logo={Logo}>
        {/* Logo/Brand */}
        <Box
          onClick={() => handleNavigation('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontWeight: 600, fontSize: '1.25rem', color:'black' }}>StaySeeker</span>
        </Box>
          
        
        {/* Desktop View */}
        {lgUp ? (
          <>
            {/* Navigation Links */}
            <NavLinks>
              <NavLink to="/" end>
                Home
              </NavLink>
              <NavLink to="/property-listing">Properties</NavLink>
              <NavLink to="/about-us">About Us</NavLink>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </NavLinks>

            {/* Right Actions */}
            <Stack direction="row" alignItems="center" spacing={2}>
              {isLogin ? (
                <Profile />
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>
          </>
        ) : (
        <>
            {/* Mobile View */}
            <IconButton
                color="inherit"
                aria-label="menu"
                onClick={props.toggleMobileSidebar}
                sx={{
                display: {
                    lg: 'none',
                    xs: 'flex',
                },
                }}
            >
                <IconMenu width="20" height="20" />
            </IconButton>

        </>
          
        )}
      </ToolbarStyled>

      {/* Add LoginDialog */}
      {openLoginDialog && (
        <LoginDialog 
          open={openLoginDialog}
          onClose={() => setOpenLoginDialog(false)}
          onLoginSuccess={handleLoginSuccess}
          defaultTab={isRegisterTab ? 1 : 0}
        />
      )}
    </AppBarStyled>
  );
};

MainHeader.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default MainHeader;
