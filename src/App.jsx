import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./Pages";

import { ErrorElement } from "./Components";
import { loader as LandingLoader } from "./Pages/Landing";
import { loader as SingleProductLoader } from "./Pages/SingleProduct";
import { loader as ProductsLoader } from "./Pages/Products";
import { loader as Checkoutloader } from "./Pages/Checkout";
import { loader as OrdersLoader } from "./Pages/Orders";


// Actions
import {action as Registeraction} from './Pages/Register'
import {action as Loginaction} from './Pages/Login'
import {action as Checkoutaction} from './Components/CheckoutForm'
import { store } from "./store";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing></Landing>,
        errorElement: <ErrorElement></ErrorElement>,
        loader: LandingLoader
      },
      {
        path: 'products',
        element: <Products></Products>,
        errorElement:<ErrorElement></ErrorElement>,
        loader:ProductsLoader
      },
      {
        path: 'products/:id',
        element: <SingleProduct></SingleProduct>,
        errorElement:<ErrorElement></ErrorElement>,
        loader:SingleProductLoader
      },
      {
        path: 'cart',
        element: <Cart></Cart>,
      },
      {
        path: 'About',
        element: <About></About>,
      },
      {
        path: 'Checkout',
        element: <Checkout></Checkout>,
        loader:Checkoutloader(store),
        action:Checkoutaction(store)
      },
      {
        path: 'Orders',
        element: <Orders></Orders>,
        loader:OrdersLoader(store)
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error></Error>,
    action:Loginaction(store)
  },
  {
    path: "/Register",
    element: <Register></Register>,
    errorElement: <Error></Error>,
    action: Registeraction
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
