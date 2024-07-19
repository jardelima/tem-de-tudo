import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addItemCartRedux(state, { payload }) {
            return { ...state, cart: payload };
        }
    }
});

export const { addItemCartRedux } = cartSlice.actions;

export const selectCart = (state: { cart: [] }) => state.cart;

export default cartSlice.reducer;
