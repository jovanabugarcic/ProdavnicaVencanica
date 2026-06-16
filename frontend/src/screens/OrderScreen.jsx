import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useDeliverOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => { 
    const { id: orderId } = useParams(); 
    const { data: order, refetch, isLoading, isError } = 
useGetOrderDetailsQuery(orderId); 
 
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation(); 
    const [deliverOrder, { isLoading: loadingDeliver }] = 
useDeliverOrderMutation(); 
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer(); 
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = 
useGetPaypalClientIdQuery(); 
    const { userInfo } = useSelector((state) => state.auth); 
 
    useEffect(() => { 
        if (!errorPayPal && !loadingPayPal && paypal?.clientId) { 
            const loadPaypalScript = async () => { 
                paypalDispatch({ 
                    type: 'resetOptions', 
                    value: { 
                        'client-id': paypal.clientId, 
                        currency: 'EUR', 
                    }, 
                }); 
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' }); 
            } 
            if (order && !order.isPaid) { 
                if (!window.paypal) { 
                    loadPaypalScript(); 
                } else { 
                    paypalDispatch({ type: 'setLoadingStatus', value: 'pending' }); 
                } 
            } 
        } 
    }, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch]); 
 
    function onApprove(data, actions) { 
        return actions.order.capture().then(async function (details) { 
            try { 
                await payOrder({ orderId, details }).unwrap(); 
                refetch(); 
                toast.success('Porudžbina je uspešno plaćena'); 
            } 
            catch (err) { 
                toast.error(err?.data?.message || err.message || 'Greška prilikom plaćanja porudžbine'); 
            } 
        }); 
    } 
 
    async function onApproveTest() { 
        await payOrder({ orderId, details: { payer: { name: 'Test User' } } 
}).unwrap(); 
        refetch(); 
        toast.success('Porudžbina je uspešno plaćena (test)'); 
    } 
 
    function onError(err) { 
        toast.error(err?.data?.message || err.message || 'Greška prilikom plaćanja porudžbine'); 
    } 
 
    function createOrder(data, actions) { 
        const totalInEur = (order.totalPrice / 117.2).toFixed(2); 
        return actions.order.create({ 
            purchase_units: [ 
                { 
                    amount: { 
                        value: totalInEur, 
                    }, 
                }, 
            ], 
        }).then((orderID) => { 
            return orderID; 
        }); 
    } 
 
    const deliverOrderHandler = async () => { 
        try { 
            await deliverOrder(orderId).unwrap(); 
            refetch(); 
            toast.success('Porudžbina je označena kao dostavljena'); 
        } 
        catch (err) { 
            toast.error(err?.data?.message || err.message || 'Greška prilikom označavanja porudžbine kao dostavljene'); 
        } 
    } 
 
    return isLoading ? (
        <Loader />
    ) : isError ? (
        <Message variant='danger'>Error loading order</Message>
    ) : (
        <div className='lux-screen-shell'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div>
                    <p className='lux-subtitle mb-1'>Order details</p>
                    <h1 className='lux-section-title mb-0'>Order #{order._id}</h1>
                </div>
                <Badge bg={order.isPaid ? 'success' : 'warning'} className='lux-pill'>
                    {order.isPaid ? 'Paid' : 'Pending payment'}
                </Badge>
            </div>

            <Row className='g-4'>
                <Col lg={8}>
                    <Card className='lux-panel'>
                        <Card.Body>
                            <h3 className='h4 mb-3'>Shipping information</h3>
                            <div className='mb-4'>
                                <p className='mb-1'><strong>Name:</strong> {order.user.name}</p>
                                <p className='mb-1'><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p className='mb-0'><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                            </div>

                            <div className='mb-3'>
                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not delivered yet</Message>
                                )}
                            </div>

                            <div className='mb-3'>
                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='warning'>Payment is still pending</Message>
                                )}
                            </div>

                            <h3 className='h4 mb-3'>Payment method</h3>
                            <p className='mb-0'><strong>Method:</strong> {order.paymentMethod}</p>
                        </Card.Body>
                    </Card>

                    <Card className='lux-panel mt-4'>
                        <Card.Body>
                            <h3 className='h4 mb-3'>Products</h3>
                            {order.orderItems.length === 0 ? (
                                <Message>Your order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                                    {item.qty} × {item.price.toFixed(2)} EUR
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
                    <Card className='lux-panel lux-summary-card' style={{ position: 'sticky', top: '90px' }}>
                        <Card.Body>
                            <p className='lux-subtitle mb-1'>Summary</p>
                            <h2 className='lux-section-title mb-3' style={{ fontSize: '2rem' }}>Total</h2>
                            <div className='lux-summary-row'><span>Items</span><strong>{order.itemsPrice.toFixed(2)} EUR</strong></div>
                            <div className='lux-summary-row'><span>Shipping</span><strong>{order.shippingPrice.toFixed(2)} EUR</strong></div>
                            <div className='lux-summary-row'><span>Tax</span><strong>{order.taxPrice.toFixed(2)} EUR</strong></div>
                            <div className='lux-summary-row'><span>Total</span><strong>{order.totalPrice.toFixed(2)} EUR</strong></div>

                            {!order.isPaid && (
                                <div className='mt-3'>
                                    {loadingPay && <Loader />}
                                    {isPending ? <Loader /> : (
                                        <>
                                            <Button onClick={onApproveTest} className='lux-btn-primary w-100 mb-2'>
                                                Pay now
                                            </Button>
                                            <PayPalButtons
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                            />
                                        </>
                                    )}
                                </div>
                            )}

                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <Button type='button' className='lux-btn-primary w-100 mt-3' onClick={deliverOrderHandler}>
                                    Mark as delivered
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderScreen;