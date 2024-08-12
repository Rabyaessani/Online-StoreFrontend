import React from "react";
import { CartTotals, SectionTitle } from "../Components";
import {CheckoutForm} from "../Components";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  const CartItems = store.getState().carts.num_of_ItemsinCart;
  if (!user) {
    return redirect("/login");
  }

  if (CartItems == 0) {
    return redirect("/cart");
  }
  
  return null;
};

const Checkout = () => {
  return (
    <>
      <SectionTitle title="Place Your Order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
