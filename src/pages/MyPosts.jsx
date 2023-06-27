import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Layout from '../components/Layout/Layout';
import EditPostModal from '../components/Modals/EditPostModal';
import {
    getDonate,
    getUserInfoEnd,
    specificPost
} from '../constants/api.constants';
import { useAuth } from '../context/AuthContext';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postsLen, setPostsLen] = useState(0);
  const [donateinfo, setDonateInfo] = useState([]);
  // const { userAllInfo } = useAuth();
  const { userAllInfo } = useAuth();

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setPosts([]);

    getFullUserAllInfo();
  }, [userAllInfo]);

  const getFullUserAllInfo = async () => {
    try {
      const res = await axios.get(getUserInfoEnd + `/${userAllInfo._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (res.status === 200) {
      } else throw new Error(res?.data?.msg);
      
      let posts = res.data.user.post;
      setPostsLen(posts.length);

      posts.map(async (postID) => {
        const res = await axios.get(specificPost + `/${postID}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        setPosts((prev) => [...prev, res]);

        if (res.status === 200) {
          // localStorage.setItem('userPost',res.)
         
          let donate = await axios.get(getDonate + `/${res.data.post.donate}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
      
          setDonateInfo((prev) => [...prev, donate.data.donate]);
        } else throw new Error(res?.data?.msg);
      });
    } catch (error) {}
  };

  const [editModalData, setEditModalData] = useState({});
  
  
  return (
    <Layout>
      <div className=' w-100 p-3 mb-5'>
        <h2 className='mb-5'>My Posts</h2>
        {posts.length >= postsLen &&
          posts?.map((post, idx) => {
            let singlePost = post?.data?.post;
         
          
            let collected = donateinfo[idx]?.collected;
            return (
              <div className='rounded bg-white mb-2 p-4' key={idx}>
                <div className='d-flex justify-content-between align-items-start'>
                  <h4>{singlePost?.title} </h4>
                  <Badge
                    bg={
                      singlePost?.status === 'pending'
                        ? 'warning'
                        : singlePost?.status === 'accepted'
                        ? 'success'
                        : 'danger'
                    }
                    pill
                  >
                    {singlePost?.status}
                  </Badge>
                </div>
                <p className='text-muted'>
                  posted on {new Date(singlePost?.createdAt).toLocaleString()}
                </p>
                <p style={{ textAlign: 'justify' }}>
                  {singlePost?.description}
                </p>

                <div className=' mb-3 d-flex justify-content-start align-items-center flex-wrap'>
                  {singlePost?.tags?.map((tag, idx) => (
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
                  Fund collected: {collected}BDT / {singlePost?.amount}BDT
                </Button>
                <Button
                  className='mt-2 w-100 text-center fw-bold'
                  onClick={() => {
                    setShowEditModal(true);
                    setEditModalData(singlePost);
                  }}
                >
                  Edit post
                </Button>
              </div>
            );
          })}
        {posts.length < postsLen && posts.length > 0 && <h1>Loading...</h1>}
        {/* {posts.length <= 0 && <h1>Not found!</h1>} */}
        <EditPostModal
          show={showEditModal}
          setShow={() => setShowEditModal(false)}
          data={editModalData}
          getFullUserAllInfo={getFullUserAllInfo}
        />
      </div>
    </Layout>
  );
};

export default MyPosts;

//auth/user/<id>
