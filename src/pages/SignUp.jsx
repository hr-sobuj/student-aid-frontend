import React from 'react';
import SignUpForm from '../components/Form/SignUpForm';

const SignUp = () => {
  return (
    <div className=' p-4' style={{ marginTop: '6rem' }}>
      <div
        className='bg-white mx-auto px-5 py-3'
        style={{
          maxWidth: '40rem',
          boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px',
        }}
      >
        <h2 className='text-center my-3 '>Create Account</h2>
        <div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
