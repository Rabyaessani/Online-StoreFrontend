import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from "../Components";

const HomeLayout = () => {
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";
  // console.log(navigation.state);
  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-Components py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
