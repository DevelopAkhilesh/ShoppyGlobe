import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { selectCartCount } from '../../store/CartSlice.js'
import { setSearchQuery } from '../../store/SearchSlice.js'


const Header = () => {
  const dispatch = useDispatch()// for dispatching the action /
  const query = useSelector((state)=>state.search.query) // intitial state of the search query;
  const cartCount = useSelector(selectCartCount); // count of the item in the cart
  return (
    <>
     <header className="site-header">
       <div className="site-header__inner">
         <div className="site-header__logo">ShoppyGlobe</div>
         <div className="site-header__actions">
           <input
            aria-label="Search products"
            className="site-header__search"
            onChange={(event) => dispatch(setSearchQuery(event.target.value))}
            placeholder="Search products..."
            type="search"
            value={query}
          />
           <Link
            aria-label={`Shopping cart with ${cartCount} items`}
            className="site-header__cart"
            to="/cart"
          >
            <svg
              aria-hidden="true"
              className="site-header__cart-icon"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M6.2 6h15l-1.8 8.2a2 2 0 0 1-2 1.6H9.3a2 2 0 0 1-2-1.6L5.8 3.5H3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                d="M9.2 20.5h.1M17.4 20.5h.1"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
              />
              </svg>
            <span className="site-header__badge">{cartCount}</span>
          </Link>
         </div>
       </div>
     </header>
      
    </>
  )
}

export default Header
