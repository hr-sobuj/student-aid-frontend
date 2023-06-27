import React from 'react';
import { GoUnverified, GoVerified } from 'react-icons/go';
import Layout from '../components/Layout/Layout';
import { BaseUrl } from '../constants/api.constants';
import { useAuth } from '../context/AuthContext';

const MyProfile = () => {
  let { userAllInfo } = useAuth();

  // console.log(userAllInfo);

  return (
    <Layout>
      <div className=' p-3'>
        <div
          style={{
            height: '12rem',
            backgroundImage:
              'url(https://media-exp1.licdn.com/dms/image/C4D12AQFUmHK8MnpwNA/article-cover_image-shrink_720_1280/0/1618593874153?e=1665619200&v=beta&t=ZSYSDGLuFU5F2jCaCUt-FlbjecxPXsgWCv8gsCRLuQI)',
            backgroundPosition: 'center',
          }}
          className='w-100 bg-light'
        >
          {' '}
          <img
            src={
              userAllInfo.avatar != null
                ? BaseUrl + `/uploads/avatars/${userAllInfo.avatar}`
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
            }
            alt=''
            height='200px'
            width='200px'
            style={{
              borderRadius: '50%',
              position: 'absolute',
              top: '5rem',
              marginLeft: '1rem',
              boxShadow: '0px 6px 5px lightgrey',
            }}
          />
        </div>

        <div className='p-3 rounded bg-white' style={{ marginTop: '7rem' }}>
          {userAllInfo?.status === 'verified' ? (
            <span
              className='bg-success text-white p-2 rounded'
              style={{ position: 'absolute', right: '1.5rem', top: '20.5rem' }}
            >
              <GoVerified
                className='me-auto'
                style={{ height: '20px', width: '20px', color: 'white' }}
              />{' '}
              Verified
            </span>
          ) : (
            <span
              className='bg-danger text-white p-2 rounded'
              style={{ position: 'absolute', right: '1.5rem', top: '20.5rem' }}
            >
              <GoUnverified
                className='me-auto'
                style={{ height: '20px', width: '20px', color: 'white' }}
              />{' '}
              Unverified
            </span>
          )}
          <h5 style={{ textDecoration: 'underline' }}>Basic Info</h5>

          <div>
            <div className='row mt-3'>
              <h6 className='fw-bold col-2'>Name:</h6>
              <h6 className=' col-10'>{userAllInfo?.name}</h6>
            </div>
            <div className='row '>
              <h6 className='fw-bold col-2'>Email:</h6>
              <h6 className=' col-10'>{userAllInfo?.email}</h6>
            </div>

            <div className='row '>
              <h6 className='fw-bold col-2'>Phone:</h6>
              <h6 className=' col-10'>{userAllInfo?.phone || 'N/A'}</h6>
            </div>
            <div className='row '>
              <h6 className='fw-bold col-2'>Address:</h6>
              <h6 className=' col-10'>{userAllInfo?.address || 'N/A'}</h6>
            </div>
          </div>
        </div>

        <div
          className='p-3 rounded bg-white mb-5'
          style={{ marginTop: '1rem', minHeight: '10rem' }}
        >
          <h5 style={{ textDecoration: 'underline' }}>Provided Documents</h5>
          {userAllInfo?.attachments?.length > 0 ? (
            <div className='mt-5'>
              {userAllInfo?.attachments.map((attachment, idx) => (
                <img
                  src={BaseUrl + `/uploads/documents/${attachment}`}
                  alt=''
                  height='100%'
                  width='100%'
                  key={idx}
                  className='my-1'
                />
              ))}
            </div>
          ) : (
            <h6 className='text-muted mt-5'>No document is found!</h6>
          )}{' '}
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
