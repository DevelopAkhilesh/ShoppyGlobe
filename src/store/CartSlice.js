import { createSlice } from "@reduxjs/toolkit";
// creating slice with the create slice for the cart
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[] // initial state of the cart
    },
    reducers:{
        // reducer which help us to add the item to the cart
        addToCart:(state,action)=>{
            let product = action.payload // getting the product from action.payload.
           let exsistingItems =  state.items.find((i)=>i.id===product.id) // find id the items that already exist
           if(exsistingItems){
            exsistingItems.quatity +=1; // if exist increase the quantity by 1
            return
           }

           state.items.push({...product,quatity:1}); // push the product with quantity 1

        },
        // reducer which help us to remove the item from cart
        removeFromCart:(state,action)=>{
           state.items= state.items.filter((item)=>item.id!==action.payload) // filter the item based on id and s
        },
        updateQuantity:(state,action)=>{
            const {id,amount} = action.payload; // collect the id and the amount from action.payload;
            const item = state.items.find((i)=>i.id===id); // find the item based on id

            if(item){
                item.quatity = Math.max(1,item.quatity+amount); // increase the quantity by adding ammount to the quantity

            }

        },
        // reducer which help us to clear the cart 
        clearCart:(state,action)=>{
            state.items = []
        },
    },
})
// export all the cart actions
export const {addToCart,removeFromCart,updateQuantity,clearCart} = cartSlice.actions;

// it gives us the state of the items
export const selectCartItem = (state)=> state.cart.items;
// it gvies us the total count of the items based on quantity;
export const selectCartCount = (state)=> state.cart.items.reduce((total,item)=> total+item.quatity,0);
// it gives us the total of price based on the item price
export const selectCartTotal = (state)=> state.cart.items.reduce((total,item)=> total+(item.quatity*item.price),0);
// exporting the reducer
export default cartSlice.reducer;

