import React from "react";
import { FormInput, SubmitBtn } from "../Components";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { CustomFetch } from "../util";
import { toast } from "react-toastify";
import { loginUser } from "../features/User/UserSlice";
import { useDispatch } from "react-redux";
import { data } from "autoprefixer";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await CustomFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("Successfully Logged in");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || "Some error occured";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const LoginAsGuest = async () => {
    try {
      const response = await CustomFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("Welcome Guest User");
      navigate('/')
    } catch (error) {
      toast.error('Error Occured')
      
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="Email" name="identifier" />
        <FormInput type="password" label="Password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Login" />{" "}
        </div>
        <button type="button" className="btn btn-secondary btn-block" onClick={LoginAsGuest}>
          Guest User
        </button>
        <p className="text-center">
          Not a Member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Register
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};

export default Login;
