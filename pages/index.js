import "../styles/Home.module.css";
import Slider from "../components/common/slider/slider";
import Banner from "../components/common/banner/banner";
import Product from "../components/common/product/product";
import Modal from "../components/common/product/modal";
export default function Home() {
  return (
    <div>
      <Slider />
      <Banner />
      <Product title="Product Overview" />
      {/* <Modal /> */}
    </div>
  );
}
