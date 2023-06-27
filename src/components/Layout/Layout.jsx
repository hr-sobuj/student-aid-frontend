import React from 'react';
import { Menu, MenuItem, ProSidebarProvider, Sidebar } from 'react-pro-sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../NavBar/NavBar';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Logout, currentUser, isDonorView } = useAuth();

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <NavBar />
      <div className='mb-4'>
        <div style={{ width: '100%', display: 'flex' }}>
          <div style={{ width: 'auto' }}>
            <ProSidebarProvider>
              <Sidebar
                backgroundColor='white'
                style={{
                  position: 'sticky',
                  left: '0',
                  height: '100vh',
                  width: 'auto',
                  maxWidth: '20rem',
                }}
              >
                <Menu className='my-menu'>
                  {!isDonorView && currentUser.role === 'student' ? (
                    <div>
                      <MenuItem
                        active={
                          location.pathname === '/create-a-post' ? true : false
                        }
                        onClick={() => navigate('/create-a-post')}
                      >
                        {' '}
                        Create a post{' '}
                      </MenuItem>
                      <MenuItem
                        active={
                          location.pathname === '/my-posts' ? true : false
                        }
                        onClick={() => navigate('/my-posts')}
                      >
                        {' '}
                        My posts{' '}
                      </MenuItem>
                      <MenuItem
                        active={
                          location.pathname === '/my-profile' ? true : false
                        }
                        onClick={() => navigate('/my-profile')}
                      >
                        {' '}
                        My profile{' '}
                      </MenuItem>
                      <MenuItem
                        active={
                          location.pathname === '/my-settings' ? true : false
                        }
                        onClick={() => navigate('/my-settings')}
                      >
                        {' '}
                        Settings{' '}
                      </MenuItem>
                    </div>
                  ) : isDonorView && currentUser.role === 'student' ? (
                    <div>
                      <MenuItem
                        active={
                          location.pathname === '/donate-now' ? true : false
                        }
                        onClick={() => navigate('/donate-now')}
                      >
                        {' '}
                        Donate now
                      </MenuItem>
                      <MenuItem
                        active={
                          location.pathname === '/my-profile' ? true : false
                        }
                        onClick={() => navigate('/my-profile')}
                      >
                        {' '}
                        My profile{' '}
                      </MenuItem>
                      <MenuItem
                        active={
                          location.pathname === '/my-settings' ? true : false
                        }
                        onClick={() => navigate('/my-settings')}
                      >
                        {' '}
                        Settings{' '}
                      </MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem
                        active={location.pathname === '/admin' ? true : false}
                        onClick={() => navigate('/admin')}
                      >
                        {' '}
                        Add Admin
                      </MenuItem>
                      <MenuItem
                        active={
                          location.pathname === '/all-posts' ? true : false
                        }
                        onClick={() => navigate('/all-posts')}
                      >
                        All Posts
                      </MenuItem>
                      <MenuItem
                        active={
                          location.pathname === '/all-users' ? true : false
                        }
                        onClick={() => navigate('/all-users')}
                      >
                        All Users
                      </MenuItem>
                    </div>
                  )}

                  <MenuItem onClick={() => Logout()}> Log out </MenuItem>
                </Menu>
              </Sidebar>
            </ProSidebarProvider>
          </div>
          <div
            style={{
              width: '100%',
              height: '100vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            {children}
          </div>{' '}
        </div>
      </div>
      {/* <div
        className='bg-primary w-100 text-center py-2'
        style={{ position: 'fixed', bottom: '0rem' }}
      >
        <h6 className='text-white  m-0'>
          Developed @ By Zafor, Sobuj, Shishir
        </h6>
        <h6 className='text-white  m-0'>
          Department of Computer Science & Engineering
        </h6>
      </div> */}
    </div>
  );
};

export default Layout;
