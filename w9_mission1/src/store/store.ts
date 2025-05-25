import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

function createStore() {
    const store = configureStore({
        reducer:{
            cart: cartReducer,
        },
    });

    return store;
}

const store = createStore();

export default store;

