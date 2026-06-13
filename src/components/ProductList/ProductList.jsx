import React from 'react'
import { useSelector } from 'react-redux'
import useFetchProduct from '../../hooks/useFetchProduct.js'
import ProductItem from '../ProductItem/ProductItem.jsx'
import "./ProductList.css"

const ProductList = () => {
  const query = useSelector((state)=>state.search.query); // geting the search query
  const {product,error,loading} = useFetchProduct();// custom hook for fetching the data
  
  const filteredQuery = query.trim().toLowerCase(); // trim and lowercase the query
  const filteredProduct = product.filter((p)=>p.title.toLowerCase().includes(filteredQuery)) // filter the product based on search query
 // function when you click on the shop now button this automatically scroll to all product
  function handleShopNow(){
    document.getElementById("products-heading")?.scrollIntoView({
      behavior:'smooth',
      block:"start"
    })
  }
  return (
    <div className="product-list-page">
      <section className="home-banner">
        <h1>Everything you need, all in one place</h1>
        <p>Browse our full catalog of quality products at great prices.</p>
        <button onClick={handleShopNow} type="button">
          Shop now
        </button>
      </section>

      <section className="product-list"> 
      <h2 id="products-heading">All Products</h2>
      {loading && <p className="product-list__status">Loading products...</p>}
      {error && <p className="product-list__error">{error}</p>}
      {!loading && !error&& filteredProduct.length===0 && (
          <p className="product-list__status">No products match</p>
        )}
      {!loading && !error && filteredProduct.length>0 && (
        <div className="product-list__grid">{
          filteredProduct.map((product)=> <ProductItem key={product.id} product={product}/>)
        }</div>
      )}
      </section>
      
    </div>
  )
}

export default ProductList
