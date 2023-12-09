import accountReducer from "./reducer/accountSlice"
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        myState: accountReducer
    }
})
