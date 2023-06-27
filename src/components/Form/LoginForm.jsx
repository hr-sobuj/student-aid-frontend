import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SignInEnd } from '../../constants/api.constants';
import Toast from '../../Utils/Toast';

export default function LoginForm() {
  const navigate = useNavigate();

  if (localStorage.getItem('userToken')) {
    navigate('/create-a-post');
  }

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(SignInEnd, userData, header);
      console.log(res.data);
      if (res.status === 200) {
        localStorage.setItem('userToken', res?.data?.access_token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        localStorage.setItem('isDonorView', false);

        if (res.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/create-a-post');
        }
        setLoading(false);
        Toast('success', 'Login successful!');
      } else throw new Error(res);
    } catch (error) {
      setLoading(false);
      Toast('err', 'Please enter a valid email or password');
    }
  };

  return (
    <Form onSubmit={login}>
      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          required
          value={userData?.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          required
          placeholder='Password'
          value={userData?.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
      </Form.Group>

      <Button type='submit' className='w-100 mb-3 fw-bold'>
        Login {loading && <Spinner animation='border' size='sm' />}
      </Button>
      <div className='text-center'>
        <Link to='/signup' className='text-primary'>
          Create Account
        </Link>
      </div>
    </Form>
  );
}
