import { React, createContext, useState, useEffect } from "react";
import Backtotop from "../backtotop/backtotop";
import Footer from "../footer/footer";
import Header from "../header/header";
import { useRouter } from "next/router";
import cartApi from "../../../public/api/cartApi";
export const cartItemsContext = createContext();
import DashboardLayout from "../../dashboard-layout";

export default function Layout({ children }) {
  const getUserId = () => localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [showQV, setShowQV] = useState(false);
  const [itemQV, setItemQV] = useState();
  const asPath = useRouter();

  const getListCart = async () => {
    try {
      const response = await cartApi.getCartByUserID(getUserId() || "");
      // if (response._id === undefined) {
      //   const payload = {
      //     userId: getUserId(),
      //     detail: [],
      //     status: 0,
      //   };
      //   const createCart = await cartApi.createCart(payload);
      //   console.log(createCart);
      // }
      let detail = response?.detail;
      detail?.forEach((item) =>
        setCartItems((prev) => [
          ...prev,
          {
            productId: item?.productId,
            name: item?.name,
            size: item?.size,
            price: item?.price,
            amount: item?.amount,
            totalPrice: item?.totalPrice,
          },
        ])
      );
      localStorage.setItem("cartId", response._id);
      // setListCart(response?.cart?.[0]?.detail)
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    if (
      localStorage.getItem("token") == "undefined" ||
      localStorage.getItem("token") == "" ||
      localStorage.getItem("token") == null
    ) {
      console.log("Chua Co Token");
      localStorage.setItem("token", "");
      asPath.push("/login");
    }
    var index = cartItems.findIndex(
      (item) =>
        item.productId === product.productId && item.size === product.size
    );
    if (index !== -1) {
      cartItems[index].amount += product.amount;
    } else {
      if (cartItems.length === 0) {
        console.log(product);
        setCartItems([product]);
      } else {
        setCartItems((prev) => [...prev, product]);
      }
    }
    console.log(cartItems);

    const payload = {
      detail: cartItems,
      status: 0,
    };
    const response = await cartApi.updateCartByID(
      localStorage.getItem("cartId"),
      payload
    );
    console.log("payload", payload);
  };

  const value = {
    cartItems: cartItems,
    setCartItems: setCartItems,
    addToCart,
    showQV,
    setShowQV,
    itemQV,
    setItemQV,
    getListCart,
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      getListCart();
    }
  }, []);

  if (
    asPath.pathname === "/shop" ||
    asPath.pathname === "/about" ||
    asPath.pathname === "/yourorder" ||
    asPath.pathname === "/cart" ||
    asPath.pathname === "/account" ||
    asPath.pathname === "/"
  ) {
    return (
      <cartItemsContext.Provider value={value}>
        <Header />
        {children}
        <Backtotop />
        <Footer />
      </cartItemsContext.Provider>
    );
  } else if (asPath.pathname === "/login") {
    return <>{children}</>;
  } else {
    return (
      <div>
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    );
  }
}
