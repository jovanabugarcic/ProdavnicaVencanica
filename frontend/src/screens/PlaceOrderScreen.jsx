import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(
                err?.data?.message ||
                err?.error ||
                'Unable to place order. Please try again.'
            );
        }
    };

    return (
        <div className='lux-screen-shell'>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row className='g-4 mt-2'>
                <Col lg={8}>
                    <Card className='lux-panel'>
                        <Card.Body>
                            <p className='lux-subtitle mb-1'>Review</p>
                            <h2 className='lux-section-title mb-3'>Podaci za dostavu</h2>
                            <div className='mb-4'>
                                <p className='mb-1'><strong>Adresa:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                                <p className='mb-0'><strong>Način plaćanja:</strong> {cart.paymentMethod}</p>
                            </div>
                            <h3 className='h5 fw-semibold mb-3'>Stavke porudžbine</h3>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} className='lux-list-item'>
                                            <Row className='align-items-center'>
                                                <Col xs={3} md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded style={{ maxHeight: '90px', objectFit: 'cover' }} />
                                                </Col>
                                                <Col xs={6} md={7}>
                                                    <Link to={`/product/${item.product}`} className='text-decoration-none fw-semibold' style={{ color: '#3a2a18' }}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col xs={3} md={3} className='text-end'>
                                                    {item.qty} x {item.price} EUR
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className='lux-panel lux-summary-card'>
                        <Card.Body>
                            <p className='lux-subtitle mb-1'>Summary</p>
                            <h2 className='lux-section-title mb-3' style={{ fontSize: '2rem' }}>Rezimiranje</h2>
                            <div className='lux-summary-row'><span>Stavke</span><strong>{cart.itemsPrice} EUR</strong></div>
                            <div className='lux-summary-row'><span>Dostava</span><strong>{cart.shippingPrice} EUR</strong></div>
                            <div className='lux-summary-row'><span>Porez</span><strong>{cart.taxPrice} EUR</strong></div>
                            <div className='lux-summary-row'><span>Ukupno</span><strong>€{cart.totalPrice}</strong></div>
                            {error && (
                                <Message variant='danger'>
                                    {error?.data?.message || error?.error || 'Something went wrong'}
                                </Message>
                            )}
                            <Button
                                type='button'
                                className='lux-btn-primary w-100 mt-3'
                                disabled={cart.cartItems.length === 0 || isLoading}
                                onClick={placeOrderHandler}
                            >
                                Place order
                            </Button>
                            {isLoading && <Loader />}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrderScreen;
