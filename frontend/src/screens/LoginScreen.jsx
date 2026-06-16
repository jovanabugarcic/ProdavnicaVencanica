import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className='lux-screen-shell'>
            <FormContainer>
                <Card className='lux-panel'>
                    <Card.Body>
                        <p className='lux-subtitle mb-1'>Welcome back</p>
                        <h1 className='lux-section-title mb-4'>Prijavite se</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='email' className='mb-3'>
                                <Form.Label className='lux-form-label'>Email</Form.Label>
                                <Form.Control
                                    className='lux-form-control'
                                    type='email'
                                    placeholder='Upišite email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='password' className='mb-3'>
                                <Form.Label className='lux-form-label'>Lozinka</Form.Label>
                                <Form.Control
                                    className='lux-form-control'
                                    type='password'
                                    placeholder='Upišite lozinku'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant='primary' type='submit' className='lux-btn-primary w-100 mt-2' disabled={isLoading}>
                                Prijava
                            </Button>
                            {isLoading && <Loader />}
                        </Form>

                        <Row className='py-3'>
                            <Col className='text-center'>
                                Nemate nalog?{' '}
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                    Registrujte se
                                </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </FormContainer>
        </div>
    );
};

export default LoginScreen;