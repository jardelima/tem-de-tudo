import cartReducer from "./cart/cartSlice";

import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        cart: cartReducer
    }
});
