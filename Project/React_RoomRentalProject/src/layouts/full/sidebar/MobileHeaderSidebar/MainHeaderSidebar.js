import React from 'react';
import { Drawer, Box, List, ListItem, ListItemText, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Profile from '../../header/MainProfile';

const MobileSidebar = ({ isOpen, onClose, isLogin }) => {
  const navigate = useNavigate();
  const handleNavigation = (path) => navigate(path);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} variant="temporary"
    PaperProps={{
      sx: {

        boxShadow: (theme) => theme.shadows[8],
      },
    }}>
      <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
        <List>
          {/* Conditionally render Profile or Login/Register */}
          <ListItem>
            <Stack direction="row" spacing={2} alignItems="center" width="100%">
              {isLogin ? (
                <Profile/>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleNavigation('/auth/login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleNavigation('/auth/register')}
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>
          </ListItem>

          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Listings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

MobileSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileSidebar;
