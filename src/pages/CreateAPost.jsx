import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import {
  CreateDonate,
  CreatePostEnd,
  updateUserPost,
} from '../constants/api.constants';
import { useAuth } from '../context/AuthContext';
import Toast from '../Utils/Toast';

const CreateAPost = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  let [postData, setPostData] = useState({
    title: '',
    description: '',
    amount: 0,
    tags: [],
    user: auth?.currentUser?._id,
  });
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (postData?.tags.includes(event.target.value) === false) {
        setPostData({
          ...postData,
          tags: [...postData.tags, event.target.value],
        });
        setTag('');
      }
    }
  };

  const handleDeleteTag = (tag) => {
    let newArr = postData?.tags.filter((t) => tag !== t);

    setPostData({ ...postData, tags: newArr });
  };

  const createDonate = async () => {
    setLoading(true);

    try {
      let donateObj = {
        collected: 0,
        need: 0,
        total_amount: postData?.amount,
        owner: auth?.currentUser?._id,
      };

      const results = await axios.post(CreateDonate, donateObj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (results.status === 200) {
        let donate_id = results?.data?.result?._id;
        createPost(donate_id);
      } else throw new Error(results?.data?.msg);
    } catch (error) {
      setLoading(false);
      Toast('err', error.response?.data?.error || 'Something went wrong');
    }
  };

  const createPost = async (donate_id) => {
    // e.preventDefault();
    setLoading(true);
    try {
      postData = {
        ...postData,
        donate: donate_id,
      };

      // create post
      const res = await axios.post(CreatePostEnd, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (res.status === 200) {
        updateProfile(res.data.result._id, res.data.msg);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      setLoading(false);
      Toast('err', error.response?.data?.error || 'Something went wrong');
    }
  };

  const updateProfile = async (id, message) => {
    setLoading(true);

    const postBody = {
      post_id: id,
    };

    try {
      const res = await axios.put(
        updateUserPost + `/${auth.currentUser._id}`,
        postBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      if (res.status === 200) {
        Toast('success', message);
        navigate('/my-posts');
        setPostData({
          title: '',
          description: '',
          amount: '',
          tags: [],
          user: auth?.currentUser?._id,
        });
        setLoading(false);
      } else throw new Error(res?.data?.message);
    } catch (error) {
      setLoading(false);
      Toast('err', error.response?.data?.error || 'Something went wrong');
    }
  };
  return (
    <Layout>
      <div className=' w-100 p-3'>
        {auth.currentUser?.status === 'unverified' ? (
          <Alert key={'danger'} variant={'danger'} className='text-center py-4'>
            <h2 className='fw-bold '> Caution!!</h2>
            <p> Please update your profile properly to post for donation.</p>
          </Alert>
        ) : (
          <div>
            <h2 className='mb-3 fw-bold'>Create post</h2>

            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter a title'
                required
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                placeholder='Enter your Amount'
                required
                type='number'
                value={postData.amount}
                onChange={(e) =>
                  setPostData({ ...postData, amount: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter a Description'
                rows={5}
                required
                value={postData.description}
                onChange={(e) =>
                  setPostData({ ...postData, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                placeholder='Enter a tag'
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </Form.Group>

            <div className=' mb-3 d-flex justify-content-start align-items-center flex-wrap'>
              {postData?.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className=' p-2  me-2 mb-2'
                  style={{
                    color: 'black',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                  }}
                >
                  {tag}
                  <TiDelete
                    style={{
                      marginLeft: '5px',
                      height: '20px',
                      width: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDeleteTag(tag)}
                  />
                </span>
              ))}
            </div>

            <Button
              className='w-100 mb-3 fw-bold text-white'
              disabled={
                Object.values(postData).some(
                  (x) => x === null || x === '' || undefined
                )
                  ? true
                  : false
              }
              onClick={() => createDonate()}
            >
              Create post {loading && <Spinner animation='border' size='sm' />}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateAPost;
