import { Router } from "next/dist/client/router";
import { useState, useEffect } from "react";
import EmptyHome from "../components/EmptyHome";
import FAQList from "../components/FAQList";

const Index = (props) => {
  // useEffect(() => {
  //   props.authAxios
  //     .get(`/faq`)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       Router.push(`/`)
  //     });
  // }, []);

  return (
    <>
      <EmptyHome />
      <FAQList />
    </>
  );
};

export default Index;
