import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/CartSlice.js'
import { Link } from 'react-router-dom'
import "./ProductItem.css"

const ProductItem = ({product}) => {
  console.log(product)
 const dispatch = useDispatch();
  return (
    <article  className="product-card">
      <div className="product-card__image-wrap">
      <img
          alt={product.title}
          className="product-card__image"
          loading="lazy"
          src={product.thumbnail}
        />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__category">{product.category}</p>
        <p className='product-card__price'>{product.rating}/5</p>
        <p className="product-card__price">Rs {product.price.toFixed(2)}</p>

        <div className="product-card__actions">
          <Link to={`product/${product.id}`}
            className  ="product-card__button product-card__button--outline">
              View Product</Link>
          <button
            className="product-card__button product-card__button--solid"
            onClick={() => dispatch(addToCart(product))}
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductItem
