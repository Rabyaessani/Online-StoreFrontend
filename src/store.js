import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Cart/CartSlice";
import UserReducer from "./features/User/UserSlice";

export const store = configureStore({
  reducer: {
    carts: cartReducer,
    userState: UserReducer
  },
});
