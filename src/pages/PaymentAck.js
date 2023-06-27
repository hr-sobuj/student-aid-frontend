import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import {
  getDonate,
  updateDonateInfo,
  updateUserDonate,
  updateUserReceive,
} from '../constants/api.constants';
import { useAuth } from '../context/AuthContext';
import Toast from '../Utils/Toast';

export default function PaymentAck() {
  let { amount, msg } = useParams();
  let { currentUser } = useAuth();
  let navigate = useNavigate();

  let currentPost = JSON.parse(localStorage.getItem('currentPost'));

  useEffect(() => {
    const updateDonate = async () => {
      let res = await axios.get(getDonate + `/${currentPost.donate}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      let donateinfo = res.data.donate;

      let collected = parseInt(donateinfo.collected) + parseInt(amount);
      let need = parseInt(currentPost.amount) - parseInt(collected);

      let donateObj = {
        collected: collected,
        need: need,
        total_amount: currentPost.amount,
        donors: {
          donar_id: currentUser._id,
          weight: amount,
        },
      };
      if (need < 0) {
      } else {
        let donate_result = await axios.put(
          updateDonateInfo + `/${currentPost.donate}`,
          donateObj,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );

        if (donate_result.status === 200) {
          Toast('success', donate_result.data.message);
          navigate('/donate-now');
        } else throw new Error(res?.data?.msg);
      }
    };
    updateDonate();

    const updateUser = async () => {
      let donateObj = {
        donate: {
          post_id: currentPost._id,
          donate_id: currentPost.donate,
          amount: amount,
        },
      };
      let res = await axios.put(
        updateUserDonate + `/${currentUser._id}`,
        donateObj,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (res.status === 200) {
        Toast('success', res.data.message);
        navigate('/donate-now');
      } else throw new Error(res?.data?.msg);
    };

    updateUser();

    const updateReceive = async () => {
      // receive

      let get_donate = await axios.get(getDonate + `/${currentPost.donate}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      let donateinfo = get_donate.data.donate;

      let collected = parseInt(donateinfo.collected) + parseInt(amount);

      let receiveObj = {
        receive: {
          post_id: currentPost._id,
          collected_amount: parseInt(collected),
          total_amount: parseInt(currentPost.amount),
        },
      };
      let receive_res = await axios.put(
        updateUserReceive + `/${currentPost.user}`,
        receiveObj,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (receive_res.status === 200) {
        Toast('success', 'Receive History Added!');
        navigate('/donate-now');
      } else throw new Error(receive_res?.data?.msg);
    };
    updateReceive();
  }, []);
  return (
    <Layout>
      <div className=' w-100 p-3'>
        {/* {msg === 'success' && <h3 className='mb-3'>Payment Successful!</h3>} */}
      </div>
    </Layout>
  );
}
