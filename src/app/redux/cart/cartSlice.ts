import { createSlice } from "@reduxjs/toolkit";

interface ICart {
    product: string;
    quantity: number;
}

const cart: ICart[] = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart
    },
    reducers: {
        addItemCartRedux(state, { payload }) {
            return { ...state, cart: payload };
        }
    }
});

export const { addItemCartRedux } = cartSlice.actions;
export default cartSlice.reducer;
