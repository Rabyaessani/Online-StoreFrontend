import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { meta,params } = useLoaderData();
  const {search,company,category,shipping,order,price} =params
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        name="search"
        size="input-sm"
        label="Search Product"
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="Select Category"
        name="category"
        list={meta.categories}
        size="select-sm"
        defaultValue={category}
      />
      {/* COMPANIES */}
      <FormSelect
        label="Select Company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={company}
      />
      {/* ORDER */}
      <FormSelect
        label="Sort by"
        name="order"
        list={['a-z','z-a','high','low']}
        size="select-sm"
        defaultValue={order}
      />
      {/* PRICE RANGE */}
      <FormRange name='price' label='Select Price' size='range-sm' price={price}/>

      {/* SHIPPING CHECKBOX */}
      <FormCheckbox name='shipping' label='Free Shipping'  size='checkbox-sm' defaultValue={shipping}/>


      {/* BUTTON */}
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};

export default Filters;
