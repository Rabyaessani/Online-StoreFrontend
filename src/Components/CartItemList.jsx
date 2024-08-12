import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItemList = () => {
  const cartItems = useSelector((state) => state.carts.cartItems);
  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.CartID} CartItem={item} />;
      })}
    </>
  );
};

export default CartItemList;
