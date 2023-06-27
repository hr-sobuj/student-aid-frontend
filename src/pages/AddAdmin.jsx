import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import Layout from '../components/Layout/Layout';
import { SignUpEnd } from '../constants/api.constants';
import Toast from '../Utils/Toast';

const AddAdmin = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const [loading, setLoading] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();

    setLoading(true);
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(SignUpEnd, userData, header);
      if (res.status === 200) {
        Toast('success', 'Admin added successfully');
        setLoading(false);
        setUserData({
          name: '',
          email: '',
          password: '',
          role: 'admin',
        });
      } else throw new Error(res);
    } catch (error) {
      setLoading(false);
      Toast('err', 'Please enter a valid email or password');
    }
  };

  return (
    <Layout>
      <div className=' w-100 p-3'>
        <h3 className='mb-3'>Add Admin</h3>
        <Form onSubmit={createAccount}>
          <Form.Group className='mb-3'>
            <Form.Label>Admin Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter your name'
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Admin Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={userData.password}
              type='password'
              required
              placeholder='Password'
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Group>

          <Button type='submit' className='w-100 mb-3 fw-bold text-white'>
            Create Admin {loading && <Spinner animation='border' size='sm' />}
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default AddAdmin;
