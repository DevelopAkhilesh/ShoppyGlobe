import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/CartSlice.js'


const ProductDetail = () => {
  const [product,setProduct] = useState(null); // for product storing
  const [error,setError] = useState(""); // for stoing the error
  const [loading,setLoading] = useState(true); // for loading
  const [quantity,setQuantity] = useState(1); // for quantity of the product
  // getting the id from the routing link with useParams
  const {id} = useParams();
// for dispatching the product
  const dispatch = useDispatch();
  // maaking a fetch call to get the product based on id
  useEffect(()=>{
    let isMounted = true;
    async function fetchData(){
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if(!response.ok){
          throw new Error('Unable to load this product. Please try again later.')
        }
        const data = await response.json();

        if(isMounted){
          setProduct(data);
          setError("");
          setQuantity(1);
        }
        
      } catch (error) {
        if(isMounted){
          setProduct(null);
          setError(error.message)
        }
      } finally{
        if(isMounted){
          setLoading(false)
        }
      }
    }
    fetchData();

    return ()=>{
      isMounted = false
    }
  },[id])
 // loading till we fetch the product 
 if(loading){
    return(
      <p className="detail-status">Loading product...</p>
    )
  }
  // found any error
  if (error){
    return(
       <p className="detail-status detail-status--error">{error}</p>
    )
  }
  // no product found 
  if (!product) {
    return <p className="detail-status">Product not found.</p>
  }
// to update the quantity of the product in the cart
  function handleAddToCart(){
    for(let i=0;i<quantity;i++){
      dispatch(addToCart(product))
    }
  }
// for image of the product
  const imageUrl = product?.images?.[0]|| product?.thumbnail;
// for review if have
  const reviewCount = product?.reviews?.length||0;

 
  return (
    <>
    <section  className="product-detail">
      <div className="product-detail__image-panel">
        <img src={imageUrl}
         alt={product.title}
         loading="lazy"
         className="product-detail__image" />
      </div>
      <div className="product-detail__content">
      <p className="product-detail__breadcrumb">
          <Link to="/">Home</Link> / {product.category}
        </p>
        <h1>{product.title}</h1>
         <p className="product-detail__rating">
          <span aria-label={`${product.rating} out of 5 stars`}>
            Star rating {product.rating.toFixed(1)}
          </span>
          <span>({reviewCount} reviews)</span>
        </p>
         <p className="product-detail__price">Rs {product.price.toFixed(2)}</p>
        <p className="product-detail__description">{product.description}</p>

        <div className="product-detail__quantity-row">
          <span>Quantity</span>
          <div className="product-detail__quantity">

            <button aria-label="Decrease quantity" 
            onClick={()=>setQuantity((value)=>Math.max(1,value-1))}
            type="button"
            >
             -
            </button>
            <span>{quantity}</span>
            <button aria-label='Increase quantity'
            onClick={()=>setQuantity((value)=>value+1)}
            type="button"
              >
              +
              </button>
          </div>
        </div>
        <button className="product-detail__add"
        onClick={handleAddToCart} 
        >
          Add to Cart
        </button>
      </div>
      
    </section>
      
    </>
  )
}

export default ProductDetail
