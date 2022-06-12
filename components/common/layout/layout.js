import { React, createContext, useState, useEffect } from "react";
import Backtotop from "../backtotop/backtotop";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useRouter } from "next/router";
export const cartItemsContext = createContext();

export default function Layout({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showQV, setShowQV] = useState(false);
  const [itemQV, setItemQV] = useState();
  const asPath = useRouter();

  const addToCart = (product) => {
    var index = cartItems.findIndex((item) => item.id === product.id);
    if (localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      console.log("Chua Co Token")
      localStorage.setItem("token", "");
      asPath.push("/login");
    }
    console.log(localStorage.getItem("token"));
    if (index != -1) {
      cartItems[index].amount++;
    } else {
      product.amount++;
      setCartItems((prev) => [...prev, product]);
    }
  };
  const value = {
    cartItems,
    setCartItems,
    addToCart,
    showQV,
    setShowQV,
    itemQV,
    setItemQV,
  };

  if (asPath.pathname === "/login" || asPath.pathname === "/register") {
    return <>{children}</>;
  } else {
    return (
      <cartItemsContext.Provider value={value}>
        <Header />
        {children}
        <Backtotop />
        <Footer />
      </cartItemsContext.Provider>
    );
  }
}
