import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
