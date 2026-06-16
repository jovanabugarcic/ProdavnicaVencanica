import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, Card, Button, Badge } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className='product-detail-screen'>
      <Link className='btn btn-outline-secondary back-btn' to='/'>
        ← Back to collection
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row className='g-4 align-items-start'>
            <Col lg={7}>
              <Card className='product-detail-gallery-card border-0'>
                <div className='product-detail-image-wrap'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className='product-detail-image'
                  />
                </div>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className='product-detail-panel border-0'>
                <Card.Body>
                  <div className='product-detail-label'>Bridal Collection</div>
                  <h1 className='product-detail-title'>{product.name}</h1>

                  <div className='product-detail-meta'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    <Badge bg='light' text='dark' className='product-detail-badge'>
                      {product.category}
                    </Badge>
                  </div>

                  <div className='product-detail-price'>
                    €{product.price.toFixed(2)}
                  </div>

                  <p className='product-detail-summary'>{product.description}</p>

                  <div className='product-detail-info-grid'>
                    <div>
                      <span>Status</span>
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>Available</Badge>
                      ) : (
                        <Badge bg='danger'>Out of stock</Badge>
                      )}
                    </div>
                    <div>
                      <span>Shipping</span>
                      <strong>Free worldwide</strong>
                    </div>
                  </div>

                  {product.countInStock > 0 && (
                    <div className='product-detail-qty-row'>
                      <span>Quantity</span>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className='product-detail-select'
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  )}

                  <Button
                    className='lux-add-to-cart-btn'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className='product-detail-description-card border-0'>
            <Card.Body>
              <h3>About this dress</h3>
              <p>{product.description}</p>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProductScreen;