import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { CustomFetch } from "../util";
import { ComplexPaginationContainer, OrderList, PaginationContainer, SectionTitle } from "../Components";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      return redirect("/login");
    }
    const queryParam = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // console.log(params)
    try {
      const response = await CustomFetch("/orders", {
        params:queryParam,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // console.log(response);
      const orders = response.data.data;
      const meta = response.data.meta;
      
      return {orders,meta };
    } catch (error) {
      console.log(error)
      if (error?.response?.status === 401 || 403) {
        store.dispatch(logoutUser());
        return redirect("/login");
      }
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle title="No orders" />;
  }
  return (
    <>
      <SectionTitle title="Your Orders" />
      <OrderList/>
      <ComplexPaginationContainer/>
    </>
  );
};

export default Orders;
