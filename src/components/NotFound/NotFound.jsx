import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteError,useLocation } from 'react-router-dom'
import "./NotFound.css"

const NotFound = () => {
  const error= useRouteError(); // used for error messsage
  const location = useLocation(); // used so we can get the path from the route
  const errorMessage = error?.statusText||error?.message||`No route matches ${location.pathname}`
  
  return (
    <>
     <section className='not-found'>
      <p className="not-found__code">404</p>
      <h1>Page Not Found</h1>
      <p className="not-found__description">
        The page you are looking for is unavailable or may have moved.
      </p>
      <p className="not-found__details">{errorMessage}</p>
      <Link className="not-found__button" to="/">
        Back to Home
      </Link>
      </section> 
    </>
  )
}

export default NotFound
