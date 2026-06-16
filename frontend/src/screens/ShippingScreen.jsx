import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className='lux-screen-shell'>
            <FormContainer>
                <Card className='lux-panel'>
                    <Card.Body>
                        <CheckoutSteps step1 step2 />
                        <p className='lux-subtitle mb-1'>Delivery details</p>
                        <h1 className='lux-section-title mb-4'>Podaci o dostavi</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='address' className='mb-3'>
                                <Form.Label className='lux-form-label'>Adresa</Form.Label>
                                <Form.Control className='lux-form-control' type='text' placeholder='Unesite adresu' value={address} required onChange={(e) => setAddress(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='city' className='mb-3'>
                                <Form.Label className='lux-form-label'>Grad</Form.Label>
                                <Form.Control className='lux-form-control' type='text' placeholder='Unesite grad' value={city} required onChange={(e) => setCity(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='postalCode' className='mb-3'>
                                <Form.Label className='lux-form-label'>Poštanski broj</Form.Label>
                                <Form.Control className='lux-form-control' type='text' placeholder='Unesite poštanski broj' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId='country' className='mb-3'>
                                <Form.Label className='lux-form-label'>Država</Form.Label>
                                <Form.Control className='lux-form-control' type='text' placeholder='Unesite državu' value={country} required onChange={(e) => setCountry(e.target.value)} />
                            </Form.Group>

                            <Button type='submit' className='lux-btn-primary w-100 mt-2'>
                                Nastavi
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </FormContainer>
        </div>
    );
};

export default ShippingScreen;