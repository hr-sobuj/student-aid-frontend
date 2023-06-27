import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Spinner, Tab, Tabs } from 'react-bootstrap';
import Layout from '../components/Layout/Layout';
import { getAllPostEnd, updatePostEnd } from '../constants/api.constants';
import Toast from '../Utils/Toast';

const AllPosts = () => {
  const [loading, setLoading] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [key, setKey] = useState('pending');

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    setLoading(true);
    try {
      // create post
      const res = await axios.get(getAllPostEnd, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (res.status === 200) {
        setAllPosts(res.data.posts);
        setLoading(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      setLoading(false);
      Toast('err', error.response?.data?.error || 'Something went wrong');
    }
  };
  const updatePost = async (post, status) => {
    // e.preventDefault();
    setLoading(true);

    const newData = {
      ...post,
      status: status,
    };

    try {
      // update post
      const res = await axios.put(updatePostEnd + `/${post._id}`, newData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (res.status === 200) {
        getAllPosts();
        Toast('success', res.data.message);
      } else throw new Error(res?.data?.message);
    } catch (error) {
      setLoading(false);
      Toast('err', error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <Layout>
      <div className=' w-100 p-3'>
        <h3 className='mb-3 d-flex align-items-center'>
          All Posts{' '}
          {loading && <Spinner animation='border' size='md' className='ms-2' />}
        </h3>

        <Tabs activeKey={key} className='mb-3 ' onSelect={(k) => setKey(k)}>
          <Tab eventKey='pending' title='Pending' className='mb-5'>
            {allPosts.filter((d) => d.status === 'pending').length > 0 ? (
              allPosts
                .filter((d) => d.status === 'pending')
                .map((post, idx) => (
                  <div className='rounded bg-white mb-2 p-4' key={idx}>
                    <div className='d-flex justify-content-between align-items-start'>
                      <h4>{post?.title} </h4>
                      <Badge
                        bg={
                          post?.status === 'pending'
                            ? 'warning'
                            : post?.status === 'accepted'
                            ? 'success'
                            : 'danger'
                        }
                        pill
                      >
                        {post?.status}
                      </Badge>
                    </div>
                    <p className='text-muted'>
                      posted on {new Date(post?.createdAt).toLocaleString()}
                    </p>
                    <p style={{ textAlign: 'justify' }}>{post?.description}</p>

                    <div className=' mb-3 d-flex justify-content-start align-items-center flex-wrap'>
                      {post?.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className='px-2  me-2 mb-2'
                          style={{
                            color: 'black',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant='danger'
                      className='mt-2 w-100 text-center fw-bold '
                      onClick={() => {
                        updatePost(post, 'rejected');
                      }}
                    >
                      Reject post
                    </Button>
                    <Button
                      className='mt-2 w-100 text-center fw-bold'
                      onClick={() => {
                        updatePost(post, 'accepted');
                      }}
                    >
                      Approve post
                    </Button>
                  </div>
                ))
            ) : (
              <h4 className='mt-5 text-muted'>No Pending Post</h4>
            )}
          </Tab>
          <Tab eventKey='Approved' title='Approved' className='mb-5'>
            {' '}
            {allPosts.filter((d) => d.status === 'accepted').length > 0 ? (
              allPosts
                .filter((d) => d.status === 'accepted')
                .map((post, idx) => (
                  <div className='rounded bg-white mb-2 p-4' key={idx}>
                    <div className='d-flex justify-content-between align-items-start'>
                      <h4>{post?.title} </h4>
                      <Badge
                        bg={
                          post?.status === 'pending'
                            ? 'warning'
                            : post?.status === 'accepted'
                            ? 'success'
                            : 'danger'
                        }
                        pill
                      >
                        {post?.status}
                      </Badge>
                    </div>
                    <p className='text-muted'>
                      posted on {new Date(post?.createdAt).toLocaleString()}
                    </p>
                    <p style={{ textAlign: 'justify' }}>{post?.description}</p>

                    <div className=' mb-3 d-flex justify-content-start align-items-center flex-wrap'>
                      {post?.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className='px-2  me-2 mb-2'
                          style={{
                            color: 'black',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant='danger'
                      className='mt-2 w-100 text-center fw-bold'
                      onClick={() => {
                        updatePost(post, 'rejected');
                      }}
                    >
                      Through to reject
                    </Button>
                    <Button
                      variant='info'
                      className='mt-2 w-100 text-center fw-bold'
                      onClick={() => {
                        updatePost(post, 'pending');
                      }}
                    >
                      Through to pending
                    </Button>
                  </div>
                ))
            ) : (
              <h4 className='mt-5  text-muted'>No Approved Post</h4>
            )}
          </Tab>
          <Tab eventKey='Rejected' title='Rejected' className='mb-5'>
            {' '}
            {allPosts.filter((d) => d.status === 'rejected').length > 0 ? (
              allPosts
                .filter((d) => d.status === 'rejected')
                .map((post, idx) => (
                  <div className='rounded bg-white mb-2 p-4' key={idx}>
                    <div className='d-flex justify-content-between align-items-start'>
                      <h4>{post?.title} </h4>
                      <Badge
                        bg={
                          post?.status === 'pending'
                            ? 'warning'
                            : post?.status === 'accepted'
                            ? 'success'
                            : 'danger'
                        }
                        pill
                      >
                        {post?.status}
                      </Badge>
                    </div>
                    <p className='text-muted'>
                      posted on {new Date(post?.createdAt).toLocaleString()}
                    </p>
                    <p style={{ textAlign: 'justify' }}>{post?.description}</p>

                    <div className=' mb-3 d-flex justify-content-start align-items-center flex-wrap'>
                      {post?.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className='px-2  me-2 mb-2'
                          style={{
                            color: 'black',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant='info'
                      className='mt-2 w-100 text-center fw-bold'
                      onClick={() => {
                        updatePost(post, 'pending');
                      }}
                    >
                      Through to pending
                    </Button>
                    <Button
                      className='mt-2 w-100 text-center fw-bold'
                      onClick={() => {
                        updatePost(post, 'accepted');
                      }}
                    >
                      Approve post
                    </Button>
                  </div>
                ))
            ) : (
              <h4 className='mt-5 text-muted'>No Post Yet</h4>
            )}
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AllPosts;
