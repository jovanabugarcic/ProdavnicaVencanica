import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <div className='lux-screen-shell'>
            <Row className='g-4'>
                <Col lg={8}>
                    <Card className='lux-panel'>
                        <Card.Body>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <div>
                                    <p className='lux-subtitle mb-1'>Your bag</p>
                                    <h1 className='lux-section-title mb-0'>Korpa</h1>
                                </div>
                                <span className='lux-pill lux-pill-success'>
                                    {cartItems.length} item(s)
                                </span>
                            </div>

                            {cartItems.length === 0 ? (
                                <Message>
                                    Korpa je prazna <Link to='/'>Vrati se nazad</Link>
                                </Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item._id} className='lux-list-item'>
                                            <Row className='align-items-center g-3'>
                                                <Col xs={4} md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded className='w-100' style={{ maxHeight: '140px', objectFit: 'cover' }} />
                                                </Col>
                                                <Col xs={8} md={4}>
                                                    <Link to={`/product/${item._id}`} className='text-decoration-none fw-semibold' style={{ color: '#3a2a18' }}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col xs={6} md={2} className='text-muted'>
                                                    {item.price.toFixed(2)} RSD
                                                </Col>
                                                <Col xs={6} md={3}>
                                                    <Form.Select
                                                        value={item.qty}
                                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                                        className='lux-form-control'
                                                    >
                                                        {[...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col xs={12} md={1} className='text-end'>
                                                    <Button variant='light' onClick={() => removeFromCartHandler(item._id)} className='lux-btn-outline'>
                                                        <FaTrash />
                                                    </Button>
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
                            <h2 className='lux-section-title mb-3' style={{ fontSize: '2rem' }}>Ukupno</h2>
                            <div className='lux-summary-row'>
                                <span>Proizvodi</span>
                                <strong>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</strong>
                            </div>
                            <div className='lux-summary-row'>
                                <span>Subtotal</span>
                                <strong>{subtotal.toFixed(2)} EUR</strong>
                            </div>
                            <Button
                                type='button'
                                className='lux-btn-primary w-100 mt-3'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Nastavi kupovinu
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CartScreen;