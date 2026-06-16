import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='product-card h-100 border-0'>
      <div className='product-image-wrapper'>
        <Link to={`/product/${product._id}`} className='product-image-link'>
          <Card.Img
            src={product.image}
            alt={product.name}
            className='product-image'
          />
          <div className='product-image-overlay'>
            <span>View details</span>
          </div>
        </Link>

        <Badge pill bg='light' text='dark' className='product-category-badge'>
          {product.category}
        </Badge>
      </div>

      <Card.Body className='product-body'>
        <Link to={`/product/${product._id}`} className='product-link'>
          <Card.Title as='div' className='product-title'>
            {product.name}
          </Card.Title>
        </Link>

        <div className='product-rating-row'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <div className='product-footer'>
          <span className='product-price'>€{product.price}</span>
          <Link to={`/product/${product._id}`} className='product-details-btn'>
            Explore
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;