import React from 'react';
import Menuitems from './MainHeaderMenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from '../NavItem';
import NavGroup from '../NavGroup/NavGroup';
import { useSelector } from 'react-redux';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const isLogin = useSelector((state) => state.isLogin)  ?? false;

  return (

    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.filter((item) => {
          // Show item if:
          // - authRequired is undefined
          // - authRequired matches isLogin
          return item.authRequired === undefined || 
          (isLogin && item.authRequired) || 
          (!isLogin && !item.authRequired);
        })
        .map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
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
