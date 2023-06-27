import React from 'react';
import LoginForm from '../components/Form/LoginForm';

const Login = () => {
  return (
    <div className=' p-4 ' style={{ marginTop: '6rem' }}>
      <div
        className='bg-white mx-auto px-5 py-3'
        style={{
          maxWidth: '40rem',
          boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px',
        }}
      >
        <h2 className='text-center my-3 '>Login</h2>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
