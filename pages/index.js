import "../styles/Home.module.css";
import Slider from "../components/common/slider/slider";
import Banner from "../components/common/banner/banner";
import Product from "../components/common/product/product";
import Head from "next/head";
export default function Home() {

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
