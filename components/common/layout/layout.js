import { React, createContext, useState } from "react";
import Backtotop from "../backtotop/backtotop";
import Footer from "../footer/footer";
import Header from "../header/header";

export const cartItemsContext = createContext();

export default function Layout({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };
  const value = {
    cartItems,
    addToCart,
  };
  return (
    <cartItemsContext.Provider value={value}>
      <Header />
      {children}
      <Backtotop />
      <Footer />
    </cartItemsContext.Provider>
  );
}
