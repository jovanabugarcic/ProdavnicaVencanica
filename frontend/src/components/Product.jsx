import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='product-card'>
      <div className='product-image-wrapper'>
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant='top'
            className='product-image'
          />
        </Link>

        
      </div>

      <Card.Body className='text-center'>
        <Link
          to={`/product/${product._id}`}
          className='product-link'
        >
          <Card.Title as='div' className='product-title'>
            {product.name}
          </Card.Title>
        </Link>

        <div className='product-rating'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <Card.Text className='product-price'>
          €{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;