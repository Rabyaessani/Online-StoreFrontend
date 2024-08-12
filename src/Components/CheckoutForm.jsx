import React from "react";
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { CustomFetch, formatPrice } from "../util";
import { toast } from "react-toastify";
import { logoutUser } from "../features/User/UserSlice";
import {clearCart} from '../features/Cart/CartSlice'

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    const { cartItems, num_of_ItemsinCart, OrderTotal } =
      store.getState().carts;

    const info = {
      name,
      address,
      cartItems,
      numItemsInCart: num_of_ItemsinCart,
      chargeTotal: OrderTotal,
      orderTotal: formatPrice(OrderTotal),
    };

    // console.log(info)

    try {
      const response = await CustomFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      store.dispatch(clearCart());
      toast.success("Order Placed Sucessfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message || "Try again !";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) {
        store.dispatch(logoutUser());
        return redirect("/login");
      }

      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium capitalize text-xl">Shipping Information</h4>
      <FormInput label="First Name" name="name" type="text" />
      <FormInput label="Address" name="address" type="text" />

      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
