import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import HTTPReq from '../Control/HTTPReq';
import { useAuthHandlers } from '../Hook/AuthHandlers';
import styles from '../CSS/TopBar.module.css'; // Import CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function MyTopBar({ toggled,  setToggled }) {
  const { handleLogout, userName } = useAuthHandlers();
  const [isMobile, setIsMobile] = useState(false);

  const successLogout = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initialize the value on mount
    handleResize();

    // Attach the listener to window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Navbar className={styles.navbar} dark expand="md">
      {isMobile ? (
        <div
          style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: '50%',
            backgroundColor: '#2E3B4E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '0.5px solid #595959',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
          onClick={() => setToggled(!toggled)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3D4F6A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2E3B4E';
          }}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{
              color: '#FFF',
            }}
          />
        </div>
      ) : (
        <NavbarBrand href="/" className={styles.brand}>
          Project <span className={styles.brandSpan}>Base</span>
        </NavbarBrand>
      )}
      <div className={styles.navbarRight}>
        <span className={styles.welcomeMessage}>Welcome, {userName}!</span>
        <img 
          src="/images/Winnie.png" 
          alt="User Icon" 
          className={styles.userIcon} 
        />
        <HTTPReq
          method="POST"
          url={`/OAuth/Logout`}
          credentials="include"
          onSuccess={(result) => successLogout(result)}
        >
          {({ sendRequest }) => (
            <Button color='danger' className={styles.logoutButton} onClick={sendRequest} size='sm'>
              Logout
            </Button>
          )}
        </HTTPReq>
      </div>
    </Navbar>
  );
}
