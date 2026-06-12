import { configureStore} from "@reduxjs/toolkit";
import searchReducer from "./SearchSlice.js";

// making the redux store with configure store
const store = configureStore({
    reducer:{
        search:searchReducer
    }
})