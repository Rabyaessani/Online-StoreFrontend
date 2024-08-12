import React, { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useLoaderData } from "react-router-dom";

const ProductsContainer = () => {
  const { meta } = useLoaderData();

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${pattern===layout ? 'btn-primary text-primary-content':'btn-ghost text-based-content'}`;
  };

  const [layout, setLayout] = useState("grid");
  const totalProducts = meta.pagination.total;

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b-2 border-base-300 pb-5">
        <h3 className="text-md font-medium tracking-wider">
          {totalProducts} product{totalProducts > 1 && "s"}
        </h3>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => {
              setLayout("grid");
            }}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>

          <button
            type="button"
            onClick={() => {
              setLayout("list");
            }}
            className={setActiveStyles("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">Sorry, no Products matched your Search...</h5>
        ) : (
          <ProductsGrid layout={layout} />
        )}
      </div>
      
    </>
  );
};

export default ProductsContainer;
