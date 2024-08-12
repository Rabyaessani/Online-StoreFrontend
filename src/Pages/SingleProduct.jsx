import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice, CustomFetch, generateAmountOptions } from "../util";
import { useDispatch } from "react-redux";
import { addItem } from "../features/Cart/CartSlice";

const url = "/products/";

const CartLimit = 5;

export const loader = async ({ params }) => {
  const response = await CustomFetch(`/products/${params.id}`);
  // console.log(response.data.data)
  const product = response.data.data;
  return { product };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { title, image, price, colors, description, company } =
    product.attributes;
  // console.log(product);
  const [ProductColor, SetProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    CartID: product.id + ProductColor,
    ProductID: product.id,
    image,
    price,
    company,
    title,
    ProductColor,
    description,
    amount,
    CartLimit,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

 
  return (
    <section>
      <div className="breadcrumbs text-md">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* Product */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* Product */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              Colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === ProductColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => SetProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <div className="label" htmlFor="amount">
              <h4 className="text-md tracking-wider font-medium capitalize">
                amount
              </h4>
            </div>
            <select
              className="select select-secondary select-bordered select-md"
              id={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(CartLimit)}
            </select>
          </div>
          {/* Button */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
