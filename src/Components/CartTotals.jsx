import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../util";

const CartTotals = () => {
  const { CartTotal, shipping, Tax, OrderTotal } = useSelector(
    (state) => state.carts
  );
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b-2 border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(CartTotal)}</span>
        </p>

        {/* SHIPPING */}
        <p className="flex justify-between text-xs border-b-2 border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>

        {/* Tax */}
        <p className="flex justify-between text-xs border-b-2 border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPrice(Tax)}</span>
        </p>

        {/* Order Total */}
        <p className="flex justify-between text-sm mt-4  pb-2">
          <span>Order Total</span>
          <span className="font-medium">{formatPrice(OrderTotal)}</span>
        </p>


      </div>
    </div>
  );
};

export default CartTotals;
