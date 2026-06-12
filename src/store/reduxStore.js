import { configureStore} from "@reduxjs/toolkit";
import searchReducer from "./SearchSlice.js";
import cartReducer from "./CartSlice.js"

// making the redux store with configure store
const store = configureStore({
    reducer:{
        search:searchReducer,
        cart:cartReducer
    }
})

export default store