import { createSlice } from "@reduxjs/toolkit";

// created the search slice with create slice
const searchSlice = createSlice({
    name:"search",
    initialState:{
        query:"" // initial state of the search slice
    },
    reducers:{
        setSearchQuery:(state,action)=>{
            state.query = action.payload
        },
    },
})
// this function execute an action which update the state ;
export const {setSearchQuery} = searchSlice.actions;

 export default searchSlice.reducer;