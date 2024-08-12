import React from "react";
import { useSelector } from "react-redux";
import { SectionTitle, CartItemList, CartTotals } from "../Components";
import {Link} from 'react-router-dom'

const Cart = () => {
  const user = useSelector((state)=>state.userState.user)
  const num_of_ItemsinCart = useSelector(
    (state) => state.carts.num_of_ItemsinCart
  );

  // console.log(num_of_ItemsinCart);

  if (num_of_ItemsinCart === 0) {
    return <SectionTitle title="Your Cart is Empty" />;
  }
  return (
    <>
      <SectionTitle title="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to Checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
