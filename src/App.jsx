import React from 'react'
import { lazy,Suspense } from 'react'
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import Header from './components/Header/Header'

// import the component with lazy loading so our application does not become slow
const ProductList = lazy(()=>import("./components/ProductList/ProductList"));
const ProductDetail = lazy(()=>import("./components/ProductDetail/ProductDetail"));
const NotFound = lazy(()=>import("./components/NotFound/NotFound"));
const CheckOut = lazy(()=>import("./components/CheckOut/CheckOut"));
const Cart = lazy(()=>import("./components/Cart/Cart"))

// root layout which holds the header and all component
function Rootlayout(){
  return(
    <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    </>
    

  )
}

// used for showing loader before the component mount 
function PageLoader() {
  return (
    <div className="page-loader" role="status">
      Loading ShoppyGlobe...
    </div>
  )
}
// provide the route for all the component with suspense
const router = createBrowserRouter([
  {path:"/",
  element:<Rootlayout/>,
  children:[
    {
      index:true,
      element:<Suspense fallback = {<PageLoader/>}> <ProductList/> </Suspense>
    },
    {
      path:"/product/:id",
      element:<Suspense fallback={<PageLoader/>}><ProductDetail/></Suspense>
    },
    {
      path:"/cart",
      element:<Suspense fallback={<PageLoader/>}> <Cart/></Suspense>
    },
    {
      path:"/checkout",
      element:<Suspense fallback={<PageLoader/>}><CheckOut/></Suspense>
    },
    {
      path:"*",
      element:<Suspense fallback={<PageLoader/>}><NotFound/></Suspense>
    },
  ],
  },
])



const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
