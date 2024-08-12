import React from "react";
import SectionTitle from "./SectionTitle";
import ProductsGrid from "./ProductsGrid";

const FeaturedProducts = () => {
  return (
    <div className="pt-24">
      <SectionTitle title="Featured Products" />
      <ProductsGrid layout='grid' />
    </div>
  );
};

export default FeaturedProducts;
