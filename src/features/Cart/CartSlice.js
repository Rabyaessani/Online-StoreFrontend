import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  num_of_ItemsinCart: 0,
  CartTotal: 0,
  shipping: 500,
  Tax: 0,
  OrderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const CartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      // console.log(action);
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.CartID === product.CartID);

      if (item) {
        if (
          item.amount == product.CartLimit ||
          product.amount + item.amount > product.CartLimit
        ) {
          toast.error("Cart Limit exceeded for this Item");
          return getCartFromLocalStorage();
        }

        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.num_of_ItemsinCart += product.amount;
      state.CartTotal += product.amount * product.price;
      CartSlice.caseReducers.CalculateTotals(state);
      toast.success("Item added to the cart");
    },

    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const { CartID } = action.payload;
      // console.log(CartID)
      const product = state.cartItems.find((i) => i.CartID === CartID);
      state.cartItems = state.cartItems.filter((i) => i.CartID !== CartID);

      state.num_of_ItemsinCart -= product.amount;
      state.CartTotal -= product.amount * product.price;
      CartSlice.caseReducers.CalculateTotals(state);
      toast.error("Item removed from the cart");
    },

    editItem: (state, action) => {
      const { CartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.CartID === CartID);
      // console.log(state.num_of_ItemsinCart += amount - item.amount)
     
      state.num_of_ItemsinCart += amount - item.amount;
      state.CartTotal += item.price * (amount-item.amount);
      item.amount = amount;
      CartSlice.caseReducers.CalculateTotals(state);
      toast.success("Cart Updated");
    },

    CalculateTotals: (state) => {
      state.Tax = 0.1 * state.CartTotal;
      state.OrderTotal = state.CartTotal + state.shipping + state.Tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// console.log("gygg", CartSlice.actions);

export const { addItem, clearCart, removeItem, editItem } = CartSlice.actions;

export default CartSlice.reducer;
