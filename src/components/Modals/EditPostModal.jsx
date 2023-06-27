import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { updatePostEnd } from '../../constants/api.constants';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../Utils/Toast';

const EditPostModal = ({ show, setShow, data, getFullUserAllInfo }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  let [postData, setPostData] = useState({
    title: '',
    description: '',
    amount: '',
    tags: [],
    user: auth?.currentUser?._id,
  });
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [newTagsArr, setNewTagsArr] = useState([]);

  useEffect(() => {
    setPostData({
      ...data,
    });
    setNewTagsArr(data.tags);
  }, [data]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (newTagsArr?.includes(event.target.value) === false) {
        setNewTagsArr([...newTagsArr, event.target.value]);
        setTag('');
      }
    }
  };

  const handleDeleteTag = (tag) => {
    let newArr = newTagsArr?.filter((t) => tag !== t);

    setNewTagsArr(newArr);
  };

  const updatePost = async () => {
    setLoading(true);
    try {
      setPostData({ ...postData, tags: newTagsArr });
      const newData = { ...postData, tags: newTagsArr };
      
      // update post
      const res = await axios.put(updatePostEnd + `/${postData._id}`, newData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      
      if (res.status === 200) {
        // updateProfile(res.data.result._id, res.data.message);
        Toast('success', res.data.message);
        setShow(false);
        setLoading(false);
        navigate(0);
      } else throw new Error(res?.data?.message);
    } catch (error) {
      setLoading(false);
      Toast('err', error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className=' fw-bold'>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=' w-100 p-3'>
            <div>
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
                {newTagsArr?.map((tag, idx) => (
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
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            className='fw-bold'
            onClick={() => setShow(false)}
          >
            Close
          </Button>

          <Button
            className=' fw-bold text-white'
            disabled={
              Object.values(postData).some(
                (x) => x === null || x === '' || undefined
              )
                ? true
                : false
            }
            onClick={() => updatePost()}
          >
            Update post {loading && <Spinner animation='border' size='sm' />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditPostModal;
