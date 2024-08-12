import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../util";

const ProductsGrid = ({ layout }) => {
  const { products } = useLoaderData();
  // console.log(products);
  return (
    <div
      className={`${
        layout === "grid"
          ? "pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          : "mt-12 grid gap-y-8"
      }`}
    >
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className={`${
              layout === "grid"
                ? "card w-full shadow-xl hover:shadow-2xl duration-300 transition"
                : "p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 shadow-xl hover:shadow-2xl duration-300 flex-wrap bg-base-100 group"
            }`}
          >
            <figure className="pt-4 px-4">
              <img
                src={image}
                alt={title}
                className={`${
                  layout === "grid"
                    ? "rounded-xl h-64 md:h-48 w-full object-cover"
                    : "h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
                }`}
              />
            </figure>
            <div
              className={`${
                layout === "grid"
                  ? "card-body items-center text-center"
                  : "ml-0 sm:ml-16"
              }`}
            >
              <h2
                className={`${
                  layout === "grid"
                    ? "card-title tracking-wider capitalize"
                    : "capitalize font-medium text-lg"
                }`}
              >
                {title}
              </h2>
              {layout === "grid" ? (
                <span className="text-secondary">{formatPrice(price)}</span>
              ) : (
                <h2 className="capitalize text-md text-neutral-content">
                  {company}
                </h2>
              )}
            </div>
            {layout !== "grid" ? (
              <p className="font-medium ml-0 sm:ml-auto text-lg">
                {formatPrice(price)}
              </p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
