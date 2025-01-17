import React from 'react';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { getMenuItems } from './MenuItems';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

  const userRoleId = userProfile?.userRoleId ?? null;
  // Get menu items based on user role
  const menuItems = getMenuItems(userRoleId);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
