import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItmes } from "../types/Cart";

export interface CartState {
    cartItems: CartItmes;
    amount: number;
    total: number;
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increase: (state, action: PayloadAction<{id:string}>) => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId)
            
            if (item) {
                item.amount += 1;
            }
        }, //increase

        decrease: (state, action: PayloadAction<{id:string}>) => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId)
            
            if (item) {
                item.amount -= 1;
            }
        }, //decrease

        removeItem: (state, action: PayloadAction<{id:string}>) => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== itemId
            );
        }, //remove

        clearCart: (state) => {
            state.cartItems = [];
        }, //clear All

        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            })

            state.amount = amount;
            state.total = total;
        }, //totalPrice


    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotal } = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;