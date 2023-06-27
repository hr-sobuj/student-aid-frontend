import axios from 'axios';
import { useState } from 'react';
import { paymentRequest } from '../constants/api.constants';

export default function Payment() {
  let [amount, setAmount] = useState(0);
  const formHandle = (e) => {
    e.preventDefault();

    payment(e.target.amount.value);
  };
  const payment = async (amount) => {
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
      } else throw new Error(res?.data?.msg);
    } catch (error) {}
  };
  return (
    <>
      <form method='post' onSubmit={formHandle}>
        <input type='number' name='amount' id='amount' />
        <button type='submit'>Donate Now</button>
      </form>
    </>
  );
}
