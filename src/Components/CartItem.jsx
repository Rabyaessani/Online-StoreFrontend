import React from "react";
import { formatPrice, generateAmountOptions } from "../util";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../features/Cart/CartSlice";

const CartItem = ({ CartItem }) => {
  const dispatch = useDispatch();

  const removeItemFromtheCart = () => {
    dispatch(removeItem({ CartID }));
  };

  const handleAmount = (e) => {
    dispatch(editItem({ CartID, amount: parseInt(e.target.value) }));
  };

  const { CartID, title, price, image, company, amount, ProductColor,CartLimit } =
    CartItem;
  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b-2  border-base-300 pb-6 last:border-b-0">
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />

      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{title}</h3>
        {/* COMPANY */}
        <h3 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h3>
        {/* COLOR */}
        <p className="mt-2 text-sm capitalize flex items-center gap-x-2">
          Color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: ProductColor }}
          ></span>
        </p>
      </div>

      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label P-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(CartLimit)}
          </select>
        </div>

        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromtheCart}
        >
          Remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
