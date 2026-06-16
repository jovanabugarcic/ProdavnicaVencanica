import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
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
        if (password !== confirmPassword) {
            toast.error('Lozinke se ne poklapaju');
            return;
        }
        try {
            const res = await register({ name, email, password }).unwrap();
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
                        <p className='lux-subtitle mb-1'>Create account</p>
                        <h1 className='lux-section-title mb-4'>Registrujte se</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label className='lux-form-label'>Ime</Form.Label>
                                <Form.Control className='lux-form-control' type='text' placeholder='Upišite ime' value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='email' className='mb-3'>
                                <Form.Label className='lux-form-label'>Email adresa</Form.Label>
                                <Form.Control className='lux-form-control' type='email' placeholder='Upišite email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='password' className='mb-3'>
                                <Form.Label className='lux-form-label'>Lozinka</Form.Label>
                                <Form.Control className='lux-form-control' type='password' placeholder='Upišite lozinku' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId='confirmPassword' className='mb-3'>
                                <Form.Label className='lux-form-label'>Potvrdite lozinku</Form.Label>
                                <Form.Control className='lux-form-control' type='password' placeholder='Potvrdite lozinku' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant='primary' type='submit' className='lux-btn-primary w-100 mt-2' disabled={isLoading}>
                                Registruj se
                            </Button>
                            {isLoading && <Loader />}
                        </Form>

                        <Row className='py-3'>
                            <Col className='text-center'>
                                Imate nalog?{' '}
                                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                    Prijavite se
                                </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </FormContainer>
        </div>
    );
};

export default RegisterScreen;