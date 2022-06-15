import "../styles/Home.module.css";
import Slider from "../components/common/slider/slider";
import Banner from "../components/common/banner/banner";
import Product from "../components/common/product/product";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { cartItemsContext } from "../components/common/layout/layout";
import cartApi from "../public/api/cartApi";
export default function Home() {
  const getUserId = () => localStorage.getItem("userId")

  const cartContext = useContext(cartItemsContext);
  const getListCart = async () => {
    try {
      const response = await cartApi.getCartByUserID(getUserId() || "")
      console.log("response", response);
      let detail = response?.detail
      detail.forEach(item => cartContext.addToCart(item))
      // setListCart(response?.cart?.[0]?.detail)

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getListCart()
  }, []);

  
  return (
    <>
    <Head>
        <title>COZA STORE | Shop</title>
      </Head>
      <Slider />
      <Banner />
      <Product title="Product Overview" />
    </>
  );
}
