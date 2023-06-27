import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import Layout from '../components/Layout/Layout';
import {
  updateInfoEnd,
  updateUserAvatar,
  updateUserDocuments,
  updateUserPass,
} from '../constants/api.constants';
import { useAuth } from '../context/AuthContext';
import Toast from '../Utils/Toast';

const MySettings = () => {
  const ref = React.useRef();
  const [updateInfoLoader, setUpdateInfoLoader] = useState(false);
  const [passLoader, setPassLoader] = useState(false);
  const [avatarLoader, setAvatarLoader] = useState(false);
  const [docsLoader, setDocsLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
    varsity: '',
  });
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [docs, setDocs] = useState();
  const { userAllInfo } = useAuth();

  useEffect(() => {
    setUserData({
      name: userAllInfo.name,
      address: userAllInfo.address,
      phone: userAllInfo.phone,
      varsity: userAllInfo.varsity,
    });
  }, [userAllInfo]);

  const updateBasicData = async (e) => {
    e.preventDefault();

    setUpdateInfoLoader(true);

    try {
      const res = await axios.put(
        updateInfoEnd + `/${userAllInfo._id}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      if (res.status === 200) {
        Toast('success', 'Info updated!');

        let updatedUserInfo = {
          ...JSON.parse(localStorage.getItem('userInfo')),
          ...res.data.result,
        };

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setUpdateInfoLoader(false);
      } else throw new Error(res);
    } catch (error) {
      setUpdateInfoLoader(false);
      Toast('err', 'Please enter a valid email or password');
    }
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    setAvatarLoader(true);
    try {
      const formData = new FormData();
      formData.append('file', avatar);

      let res = await axios.put(
        updateUserAvatar + `/${userAllInfo._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (res.status === 200) {
        Toast('success', 'Avatar updated!');

        let updatedUserInfo = {
          ...JSON.parse(localStorage.getItem('userInfo')),
          ...res.data.result,
        };

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setAvatarLoader(false);
        ref.current.value = '';
      } else throw new Error(res);
    } catch (error) {
      setAvatarLoader(false);
      Toast('err', 'Avatar upload failed!');
    }
  };

  const updateDocs = async (e) => {
    e.preventDefault();
    setDocsLoader(true);

    try {
      const formData = new FormData();
      for (const key of Object.keys(docs)) {
        formData.append('attachments', docs[key]);
      }

      let res = await axios.put(
        updateUserDocuments + `/${userAllInfo._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      console.log('docs update', res.data.result);

      if (res.status === 200) {
        Toast('success', 'Documents uploaded!Its under verification!');
        let updatedUserInfo = {
          ...JSON.parse(localStorage.getItem('userInfo')),
          ...res.data.result,
        };

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setDocsLoader(false);
        ref.current.value = '';
      } else throw new Error(res);
    } catch (error) {
      setDocsLoader(false);
      Toast('err', 'Docs upload failed!');
    }
  };

  const updatePass = async (e) => {
    e.preventDefault();

    setPassLoader(true);

    try {
      const res = await axios.put(
        updateUserPass + `/${userAllInfo._id}`,
        { password: password.newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      if (res.status === 200) {
        Toast('success', 'Password updated!');
        let updatedUserInfo = {
          ...JSON.parse(localStorage.getItem('userInfo')),
          ...res.data.result,
        };

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setPassLoader(false);
        setPassword({
          newPassword: '',
          confirmPassword: '',
        });
      } else throw new Error(res);
    } catch (error) {
      setPassLoader(false);
      Toast('err', 'Please enter a valid email or password', error.message);
    }
  };

  return (
    <Layout>
      <div className='p-3'>
        <h3>My Settings</h3>
        <Form onSubmit={updateBasicData} className='bg-white p-3 rounded mt-4'>
          <h5 className='fw-bold mb-3'>Basic Info</h5>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your email'
            required
            value={userAllInfo.email}
            className='mb-3'
            disabled
          />
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            required
            value={userData.name}
            className='mb-3'
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            required
            className='mb-3'
            value={userData.address}
            placeholder='Enter your detail address'
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />

          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='phone'
            required
            className='mb-3'
            placeholder='Enter your phone'
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />

          {/* <Form.Label>Varsity</Form.Label>
          <Form.Control
            type='text'
            required
            className='mb-3'
            value={userAllInfo.varsity}
            placeholder='Enter your varsity name'
            onChange={(e) =>
              setUserData({ ...userData, varsity: e.target.value })
            }
          /> */}

          <Button type='submit' className='w-100 mb-3 fw-bold'>
            Update Info{' '}
            {updateInfoLoader && <Spinner animation='border' size='sm' />}
          </Button>
        </Form>

        <Form onSubmit={updateAvatar} className='bg-white p-3 rounded mt-4'>
          <h5 className='fw-bold mb-3'>Upload A New Avatar</h5>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type='file'
            placeholder='Enter your email'
            required
            name='avatar'
            ref={ref}
            onChange={(e) => setAvatar(e.target.files[0])}
            className='mb-3'
          />

          <Button type='submit' className='w-100 mb-3 fw-bold'>
            Update Avatar{' '}
            {avatarLoader && <Spinner animation='border' size='sm' />}
          </Button>
        </Form>

        <Form onSubmit={updateDocs} className='bg-white p-3 rounded mt-4'>
          <h5 className='fw-bold mb-3'>Upload Docs</h5>
          <Form.Control
            type='file'
            placeholder='Enter your email'
            required
            multiple
            ref={ref}
            name='docs'
            onChange={(e) => setDocs(e.target.files)}
            className='mb-3'
          />

          <Button type='submit' className='w-100 mb-3 fw-bold'>
            Update Docs {docsLoader && <Spinner animation='border' size='sm' />}
          </Button>
        </Form>

        <Form onSubmit={updatePass} className='bg-white p-3 rounded mt-4 mb-5'>
          <h5 className='fw-bold mb-3'>Update Password</h5>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your current password'
            required
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
            value={password.newPassword}
            className='mb-3'
          />
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your current password'
            required
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({ ...password, confirmPassword: e.target.value })
            }
            className='mb-3'
          />
          {password.newPassword.length > 0 &&
            password.confirmPassword.length > 0 &&
            password.newPassword !== password.confirmPassword && (
              <p className='fw-bold text-danger'>
                Current password and new password does not match.
              </p>
            )}{' '}
          <Form.Check
            className='mb-3 text-danger'
            type='checkbox'
            label='This process can not be undone. Okay with this?'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <Button
            type='submit'
            className='w-100 mb-3 fw-bold'
            disabled={!isChecked}
          >
            Update Password{' '}
            {passLoader && <Spinner animation='border' size='sm' />}
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default MySettings;
