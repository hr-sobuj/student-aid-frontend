import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpEnd } from '../../constants/api.constants';
import Toast from '../../Utils/Toast';

export default function SignUpForm() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)


    const createAccount = async (e) => {
        e.preventDefault();

        setLoading(true)
        const header = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const res = await axios.post(
                SignUpEnd,
                userData,
                header
            )
            if (res.status === 200) {
                Toast('success', res.data.msg)
                navigate('/login')
                setLoading(false)
            } else throw new Error(res)
        } catch (error) {
            setLoading(false)
            Toast('err', 'Please enter a valid email or password')
        }
    };




    return (
        <Form onSubmit={createAccount}>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter your name" required onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            </Form.Group>

            <Button type="submit" className="w-100 mb-3 fw-bold text-white">
                Create Account {loading && <Spinner animation="border" size='sm' />}
            </Button>
            <div className="text-center">
                <Link to="/login" className="text-primary">
                    Go to login
                </Link>
            </div>
        </Form>
    );
};

