import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const history = useNavigate();
  function backToHome() {
    history('/');
  }
  return (
    <>
      <h1 className='mx-auto p-5'>Not Found</h1>
    </>
  );
}
