import { useState,useEffect } from "react";

// dummy api for products
const PRODUCTS_URL ='https://dummyjson.com/products'


const useFetchProduct = ()=>{
const [product,setProduct] = useState([]);
const [error,setError] = useState("");
const [loading,setLoading]=useState(true);


// fetching the data from the api with the help of the useeffect;

useEffect(()=>{
    let isMounted = true;
    async function fetchProduct(){
        try {
            const response = await fetch(PRODUCTS_URL);
            // throw error if the response is not okk
            if(!response.ok){
                throw new Error('Unable to load products. Please try again later.');
            }
            // convert the data into json format so you can read it.
            const data =  await response.json();
            // if the component is mounted then put the data in the setProduct and seterror empty;
            if(isMounted){
                setProduct(data.products||[]);
                setError("");
            }



        } catch (error) {
            // if you catch any error then put the error msg in the setError
            if(isMounted){
                setError(error.message);
            }
            
        }finally{
            // make the loading state false;
            if(isMounted){
                setLoading(false)
            }
           
        }
    }
    // callling the fetch product
    fetchProduct();

    return ()=>{
        isMounted = false;
    }

},[])
return {product,error,loading};
}
export default useFetchProduct;