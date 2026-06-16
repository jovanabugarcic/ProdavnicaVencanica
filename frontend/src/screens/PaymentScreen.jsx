import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Card } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className='lux-screen-shell'>
            <FormContainer>
                <Card className='lux-panel'>
                    <Card.Body>
                        <CheckoutSteps step1 step2 step3 />
                        <p className='lux-subtitle mb-1'>Payment</p>
                        <h1 className='lux-section-title mb-4'>Način plaćanja</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Label as='legend' className='lux-form-label'>Odaberite način plaćanja</Form.Label>
                                <Col>
                                    <Form.Check
                                        type='radio'
                                        className='my-3'
                                        label='PayPal ili kreditna kartica'
                                        id='PayPal'
                                        name='paymentMethod'
                                        value='PayPal'
                                        checked={paymentMethod === 'PayPal'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Button type='submit' className='lux-btn-primary w-100 mt-2'>
                                Nastavite
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </FormContainer>
        </div>
    );
};

export default PaymentScreen;