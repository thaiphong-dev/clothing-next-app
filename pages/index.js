import "../styles/Home.module.css";
import Slider from "../components/common/slider/slider";
import Banner from "../components/common/banner/banner";
import Product from "../components/common/product/product";
export default function Home() {
  return (
    <div>
      <Slider />
      <Banner />
      <Product title="Product Overview" />
    </div>
  );
}
