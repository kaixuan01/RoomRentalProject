import React from 'react';
import { Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Profile from '../../header/MainProfile';
import { Sidebar, Logo } from 'react-mui-sidebar';
import SidebarItem from './MainHeaderSidebarItems';
import { useSelector } from 'react-redux';

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleNavigation = (path) => navigate(path);
  const isLogin = useSelector((state) => state.isLogin)  ?? false;

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',

    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  return (
    <Drawer       
    anchor="right"
    open={isOpen}
    onClose={onClose}
    variant="temporary"
    
    PaperProps={{
      sx: {

        boxShadow: (theme) => theme.shadows[8],
        ...scrollbarStyles,
      },
    }}>
        <Sidebar
          width={'270px'}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={isLogin}
          userName="Kx"
          designation="test"
          >
            <SidebarItem/>
        </Sidebar>
        
    </Drawer>
  );
};

MobileSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileSidebar;
