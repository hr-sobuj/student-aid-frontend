import React, { useEffect } from 'react';
import { Form, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

export default function NavBar() {
  const { currentUser, userAllInfo, isDonorView, setIsDonorView } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isDonorView', isDonorView);
  }, [isDonorView]);

  console.log(userAllInfo);

  return (
    <Navbar
      bg='primary'
      className='px-3'
      style={{ position: 'sticky', top: '0', zIndex: '10' }}
    >
      <Navbar.Brand href='#home' className='text-white fw-bold'>
        HSTU Donation Connection
      </Navbar.Brand>
      <Nav className='ms-auto'>
        {currentUser?.role !== 'admin' && (
          <Form.Check
            type='switch'
            className='text-white fw-bold mb-0 p-2'
            label={isDonorView ? 'Donor view' : 'Seeker view'}
            onClick={() => {
              setIsDonorView(!isDonorView);
              navigate(isDonorView ? '/create-a-post' : '/donate-now');
            }}
            checked={isDonorView ? true : false}
          />
        )}

        <span className='text-white fw-bold mt-2 ms-5'>
          {currentUser?.name?.toUpperCase()}
        </span>
      </Nav>
    </Navbar>
  );
}
