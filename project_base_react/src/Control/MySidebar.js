import { useLocation } from 'react-router-dom';
import myURLRoutes from '../Common/RoutePath';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export default function MySidebar({toggled}) {
    const location = useLocation();
    const [collapse, setCollapse] = useState(false);
    const SidebarHeader = () => (
        <div style={{ display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: '#2E3B4E',whiteSpace: 'nowrap', width: 'auto' }}>
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
                onClick={() => setCollapse(!collapse)}
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
            {!collapse && <span style={{ backgroundColor: '#f7ab1e', color: 'black', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', fontSize:'20px' }} className='ms-2'>PB</span>}
        </div>
    );
    


    return (
        <Sidebar
            style={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            collapsed={collapse}
            backgroundColor='#2E3B4E'
            className='border-0'
            breakPoint="md"
            toggled={toggled}
        >
            <div>
                <Menu
                    menuItemStyles={{
                        root: {
                            fontSize: '16px',
                            color: '#BBB',
                            transition: 'color 0.3s, background-color 0.3s',
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        },
                        icon: {
                            color: '#FFF',
                            fontSize: '18px',
                        },
                        label: {
                            // fontWeight: 'bold',
                        },
                        subMenuContent: {
                            backgroundColor: '#444d5c',
                        },
                        button: ({ level, active }) => {
                            let styles = {
                                ':hover': {
                                    backgroundColor: '#3D4F6A',
                                    color: '#FFF',
                                },
                            };

                            if (active) {
                                styles.backgroundColor = '#1C2A3E';
                                styles.color = '#FFF';
                            }

                            if (level === 0) {
                                styles = {
                                    ...styles,
                                    ':hover': {
                                        backgroundColor: '#3D4F6A',
                                    },
                                };
                            }
                            return styles;
                        },
                    }}
                >
                    {/* <MenuItem
                        icon={
                            <FontAwesomeIcon
                                icon={faBars}
                                style={{
                                    transform: collapse ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}
                            />}
                        onClick={() => setCollapse(!collapse)}
                    >
                    </MenuItem> */}
                     <SidebarHeader /> 
                    {myURLRoutes.map((route, index) => (
                        route.excludedMenu ? null :
                            route.subRoutes && route.subRoutes.length > 0 ? (
                                <SubMenu icon={route.icon} key={index} label={route.name} disabled={route.excludedMenu}>
                                    {route.subRoutes.map((subRoute, subIndex) => (
                                        subRoute.excludedMenu ? null :
                                            <MenuItem
                                                icon={subRoute.icon}
                                                key={subIndex}
                                                active={location.pathname === `${route.path}${subRoute.path}`}
                                                component={<Link to={`${route.path}${subRoute.path}`} />}
                                            >
                                                {subRoute.name}
                                            </MenuItem>
                                    ))}
                                </SubMenu>
                            ) : (
                                <MenuItem
                                    active={location.pathname === route.path}
                                    icon={route.icon}
                                    key={index}
                                    component={<Link to={route.path} />}
                                    disabled={route.excludedMenu}
                                >
                                    {route.name}
                                </MenuItem>
                            )
                    ))}
                </Menu>
            </div>

        </Sidebar>
    );
}
