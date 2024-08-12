import React from "react";
import { ProductsCotainer, PaginationContainer, Filters } from "../Components";
import { CustomFetch } from "../util";

export const loader = async ({ request }) => {
  // console.log(request)
  // const params = new URL(request.url).searchParams;
  // const Search = params.get('search')
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  // const params2 =[...new URL(request.url).searchParams.entries()]


  // console.log(params);
  const response = await CustomFetch("/products", { params });
  // console.log(response);
  const products = response.data.data;
  const meta = response.data.meta;
  // console.log(products, meta);
  return { products, meta, params };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsCotainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
