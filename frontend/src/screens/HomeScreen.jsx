import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      
      <section className='hero-section'>
        <div className='hero-overlay'>
          <Container>
            <div className='hero-content'>
              <h1 style={{ color: '#b5e0e2' }}>Dream Wedding Dresses</h1>
              <p>
                Discover elegance, luxury and timeless bridal fashion crafted
                for your perfect day.
              </p>

              <a href='#products-section'>
                <Button className='hero-btn'>
                   Explore Collection
                </Button>
                </a>
            </div>
          </Container>
        </div>
      </section>

       
      <Container className='mt-5' id='products-section'>
        <div className='section-title'>
          <span>NEW COLLECTION</span>
          <h2>Newest Dresses</h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className='mb-4'
              >
                <div className='product-animation'>
                  <Product product={product} />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;