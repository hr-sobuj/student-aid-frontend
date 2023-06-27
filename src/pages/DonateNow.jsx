import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import {
  getAllPostEnd,
  getDonate,
  paymentRequest,
} from '../constants/api.constants';
import Toast from '../Utils/Toast';

const DonateNow = () => {
  const [loading, setLoading] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPOst] = useState('');
  const [donateinfo, setDonateInfo] = useState([]);
  const [amount, setAmount] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts();

    localStorage.setItem('currentPost', currentPost);
  }, [currentPost]);

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
        updateNeed(res.data.posts);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      setLoading(false);
      Toast('err', error.response?.data?.error || 'Something went wrong');
    }
  };

  const updateNeed = (allPosts) => {
    allPosts.map(async (post, idx) => {
      try {
        let donate = await axios.get(getDonate + `/${post.donate}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        setDonateInfo((prev) => [...prev, donate.data.donate]);
      } catch (error) {}
    });
  };

  const payment = async () => {
    try {
      let postBody = {
        total_amount: amount,
      };
      const res = await axios.post(paymentRequest, postBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      window.open(res.data.url, '_self');
      if (res.status === 200) {
        navigate('/donate-now');
      } else throw new Error(res?.data?.msg);
    } catch (error) {}
  };

  return (
    <Layout>
      <div className=' w-100 p-3'>
        <h3 className='mb-5 d-flex align-items-center'>
          All Posts{' '}
          {loading && <Spinner animation='border' size='md' className='ms-2' />}
        </h3>

        {allPosts.filter((d) => d.status === 'accepted').length > 0 ? (
          allPosts
            .filter((d) => d.status === 'accepted')
            .map((post, idx) => {
              let collected = donateinfo[idx]?.collected;
              return (
                <div className='rounded bg-white mb-5 p-4' key={idx}>
                  <div className='d-flex justify-content-between align-items-start'>
                    <h4>{post?.title} </h4>
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

                  <Button disabled className='w-100 text-center fw-bold'>
                    Fund collected: {collected}BDT / {post?.amount}BDT
                  </Button>
                  <Button
                    className='mt-2 w-100 text-center fw-bold'
                    onClick={() => {
                      // updatePost(post, 'accepted');

                      handleShow();
                      setCurrentPOst(JSON.stringify(post));
                    }}
                  >
                    Donate Now
                  </Button>
                </div>
              );
            })
        ) : (
          <h4 className='mt-5 text-muted'>No Post</h4>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Donation Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Please enter a amount '
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='danger'
              onClick={handleClose}
              className=' fw-bold text-white'
            >
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                handleClose();
                payment();
              }}
              className=' fw-bold text-white'
            >
              Processed
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default DonateNow;
