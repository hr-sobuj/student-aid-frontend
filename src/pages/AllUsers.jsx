import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, Modal, Spinner, Table } from 'react-bootstrap';
import { GoUnverified, GoVerified } from 'react-icons/go';
import Toast from '../Utils/Toast';
import Layout from '../components/Layout/Layout';
import {
  BaseUrl,
  getAllUserEnd,
  updateInfoEnd,
} from '../constants/api.constants';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState(false);
  const [userToShow, setUserToShow] = useState([]);

  useEffect(() => {
    getFullUserAllInfo();
  }, []);

  const getFullUserAllInfo = async () => {
    try {
      const res = await axios.get(getAllUserEnd, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (res.status === 200) {
        setUsers(res.data.users);
        setUserToShow(res.data.users);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast('err', error.response.msg || 'something wrong happened');
    }
  };

  const verifyUser = async () => {
    setLoader(true);
    const updateData = {
      ...userDetails,
      status: 'verified',
    };

    try {
      const res = await axios.put(
        updateInfoEnd + `/${userDetails._id}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      if (res.status === 200) {
        Toast('success', 'User updated!');
        setLoader(false);
        getFullUserAllInfo();
        handleClose();
      } else throw new Error(res);
    } catch (error) {
      setLoader(false);
      handleClose();
      Toast(
        'err',
        error.response.message || 'something went wrong! try again later'
      );
    }
  };

  const handleSearch = (value) => {
    setUserToShow(
      users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <Layout>
      <div className=' w-100 p-3'>
        <h3 className='mb-3'>All Users</h3>

        <Form.Label>Search User</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter a user name'
          className='mb-4'
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Table striped bordered hover responsive>
          <thead className='text-center'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {userToShow?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>
                  {user?.status === 'unverified' ? (
                    <Badge pill bg='danger'>
                      {user?.status}
                    </Badge>
                  ) : (
                    <Badge pill bg='primary'>
                      {user?.status}
                    </Badge>
                  )}
                </td>
                <td>
                  <Button
                    size='sm'
                    onClick={() => {
                      handleShow();
                      setUserDetails(user);
                    }}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose} size='xl'>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-lightgray'>
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
                    userDetails.avatar != null
                      ? BaseUrl + `/uploads/avatars/${userDetails.avatar}`
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

              <div
                className='p-3 rounded bg-white'
                style={{ marginTop: '7rem' }}
              >
                {userDetails?.status === 'verified' ? (
                  <span
                    className='bg-success text-white p-2 rounded'
                    style={{
                      position: 'absolute',
                      right: '2.4rem',
                      top: '21.5rem',
                    }}
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
                    style={{
                      position: 'absolute',
                      right: '2.4rem',
                      top: '21.5rem',
                    }}
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
                    <h6 className=' col-10'>{userDetails?.name}</h6>
                  </div>
                  <div className='row '>
                    <h6 className='fw-bold col-2'>Email:</h6>
                    <h6 className=' col-10'>{userDetails?.email}</h6>
                  </div>

                  <div className='row '>
                    <h6 className='fw-bold col-2'>Phone:</h6>
                    <h6 className=' col-10'>{userDetails?.phone || 'N/A'}</h6>
                  </div>
                  <div className='row '>
                    <h6 className='fw-bold col-2'>Address:</h6>
                    <h6 className=' col-10'>{userDetails?.address || 'N/A'}</h6>
                  </div>
                </div>
              </div>

              <div
                className='p-3 rounded bg-white'
                style={{ marginTop: '1rem', minHeight: '10rem' }}
              >
                <h5 style={{ textDecoration: 'underline' }}>
                  Provided Documents
                </h5>

                {userDetails?.attachments?.length > 0 ? (
                  <div className='mt-5'>
                    {userDetails?.attachments.map((attachment, idx) => (
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
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={handleClose}>
              Close
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                verifyUser();
              }}
              className='fw-bold'
            >
              Verify User {loader && <Spinner animation='border' size='sm' />}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default AllUsers;
