import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cartItemsContext } from "../layout/layout";
import image from "../../../public/images/product-01.jpg";
import Modal from "./modal";
import ProductsApi from "../../../public/api/productsApi";

const Product = (props) => {
  const cartContext = useContext(cartItemsContext);
  const [indexhv, setindehv] = useState("");
  const [ishover, setishover] = useState(false);
  const [isfilter, setisfilter] = useState(false);
  const [isSearch, setisSearch] = useState(false);
  const [indexTagFilter, setIndexTagFilter] = useState(0);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [productItems, setProductItems] = useState();
  const [idQV, setIdQV] = useState("");
  const [detailProduct, setDetailProduct] = useState()

  const hoverImg = (index) => {
    setishover(true);
    setindehv(index);
  };
  const unhoverImg = (index) => {
    setishover(false);
    setindehv(index);
  };

  const filter = () => {
    if (isSearch && !isfilter) {
      setisSearch(!isSearch);
      setisfilter(!isfilter);
    } else {
      setisfilter(!isfilter);
    }
    openFilter();
  };

  const search = () => {
    if (isfilter && !isSearch) {
      setisfilter(!isfilter);
      setisSearch(!isSearch);
    } else {
      setisSearch(!isSearch);
    }
    openSearch();
  };

  var classFilter = () => {
    return `flex-c-m
      stext-106
      cl6
      size-104
      bor4
      pointer
      hov-btn3
      trans-04
      m-r-8 m-tb-4
      js-show-filter ${isfilter ? "show-filter" : ""}`;
  };

  var classSearch = () => {
    return `
    flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search
      ${isSearch ? "show-search" : ""}
    `;
  };

  const openFilter = () => {
    isOpenSearch ? setIsOpenSearch(!isOpenSearch) : null;
    setIsOpenFilter(!isOpenFilter);
  };

  const openSearch = () => {
    isOpenFilter ? setIsOpenFilter(!isOpenFilter) : null;
    setIsOpenSearch(!isOpenSearch);
  };

  const fetchProduct = async () => {
    const response = await ProductsApi.getAllProduct();
    setProductItems(response.product);
    console.log("product Item:", productItems);
  };

  useEffect(() => {
    fetchProduct();
    console.log("product Item:", productItems);
  }, []);

  const tagsFilter = [
    { tag: "All Products", datafilter: "*" },
    { tag: "Women", datafilter: "women" },
    { tag: "Men", datafilter: "men" },
  ];

  return (
    <>
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">{props.title}</h3>
          </div>
          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              {tagsFilter.map((item, index) => (
                <button
                  className={
                    indexTagFilter == index
                      ? "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                      : "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                  }
                  data-filter={item.datafilter}
                  key={index}
                  onClick={() => {
                    setIndexTagFilter(index);
                  }}
                >
                  {item.tag}
                </button>
              ))}
            </div>
            <div className="flex-w flex-c-m m-tb-10">
              <div className={classFilter()} onClick={filter}>
                <i
                  className="
                  icon-filter
                  cl2
                  m-r-6
                  fs-15
                  trans-04
                  zmdi zmdi-filter-list
                "
                ></i>
                <i
                  className="icon-close-filter
                  cl2
                  m-r-6
                  fs-15
                  trans-04
                  zmdi zmdi-close
                  dis-none"
                ></i>
                Filter
              </div>
              <div className={classSearch()} onClick={search}>
                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                <i
                  className="
                  icon-close-search
                  cl2
                  m-r-6
                  fs-15
                  trans-04
                  zmdi zmdi-close
                  dis-none
                "
                ></i>
                Search
              </div>
            </div>
            {/* <!-- Search product --> */}
            <div
              className={`dis-none panel-search w-full p-t-10 p-b-15  ${
                isOpenSearch ? "active" : ""
              }`}
            >
              <div className="bor8 dis-flex p-l-15">
                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                  <i className="zmdi zmdi-search"></i>
                </button>
                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15"
                  type="text"
                  name="search-product"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* <!-- Filter --> */}
            <div
              className={`dis-none panel-filter w-full p-t-10  ${
                isOpenFilter ? "active" : ""
              }`}
            >
              <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                <div className="filter-col1 p-r-15 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">Sort By</div>
                  <ul>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        Default
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        Popularity
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        Average rating
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a
                        href="#"
                        className="filter-link stext-106 trans-04 filter-link-active"
                      >
                        Newness
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        Price: Low to High
                      </a>
                    </li>

                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        Price: High to Low
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="filter-col2 p-r-15 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">Price</div>
                  <ul>
                    <li className="p-b-6">
                      <a
                        href="#"
                        className="filter-link stext-106 trans-04 filter-link-active"
                      >
                        All
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        $0.00 - $50.00
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        $50.00 - $100.00
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        $100.00 - $150.00
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        $150.00 - $200.00
                      </a>
                    </li>
                    <li className="p-b-6">
                      <a href="#" className="filter-link stext-106 trans-04">
                        $200.00+
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="filter-col4 p-b-27">
                  <div className="mtext-102 cl2 p-b-15">Tags</div>
                  <div className="flex-w p-t-4 m-r--5">
                    <a
                      href="#"
                      className="
                      flex-c-m
                      stext-107
                      cl6
                      size-301
                      bor7
                      p-lr-15
                      hov-tag1
                      trans-04
                      m-r-5 m-b-5
                    "
                    >
                      Fashion
                    </a>
                    <a
                      href="#"
                      className="
                      flex-c-m
                      stext-107
                      cl6
                      size-301
                      bor7
                      p-lr-15
                      hov-tag1
                      trans-04
                      m-r-5 m-b-5
                    "
                    >
                      Lifestyle
                    </a>
                    <a
                      href="#"
                      className="
                      flex-c-m
                      stext-107
                      cl6
                      size-301
                      bor7
                      p-lr-15
                      hov-tag1
                      trans-04
                      m-r-5 m-b-5
                    "
                    >
                      Denim
                    </a>
                    <a
                      href="#"
                      className="
                      flex-c-m
                      stext-107
                      cl6
                      size-301
                      bor7
                      p-lr-15
                      hov-tag1
                      trans-04
                      m-r-5 m-b-5
                    "
                    >
                      Streetstyle
                    </a>
                    <a
                      href="#"
                      className="
                      flex-c-m
                      stext-107
                      cl6
                      size-301
                      bor7
                      p-lr-15
                      hov-tag1
                      trans-04
                      m-r-5 m-b-5
                    "
                    >
                      Crafts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product */}
          <div className="row isotope-grid">
            {productItems?.map((item, index) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
                key={index}
              >
                {/* <!-- Block2 --> */}
                <div className="block2">
                  <div className="block2-pic hov-Image0">
                    <Image
                      key={index}
                      onMouseEnter={() => hoverImg(index)}
                      onMouseLeave={() => unhoverImg(index)}
                      className={index === indexhv && ishover ? "ishover" : ""}
                      src={image}
                      alt="Image-PRODUCT"
                    />
                    <Link href="#" passHref>
                      <div
                        className="
                        block2-btn
                        flex-c-m
                        stext-103
                        cl2
                        size-102
                        bg0
                        bor2
                        hov-btn1
                        p-lr-15
                        trans-04
                        js-show-modal1
                      "
                        onClick={() => {
                          cartContext.setShowQV(true);
                          cartContext.setItemQV(item);
                          setIdQV(item._id);
                          setDetailProduct(item)
                        }}
                      >
                        Quick View
                      </div>
                    </Link>
                  </div>
                  <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l">
                      <a
                        href="product-detail.html"
                        className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                      >
                        {item.productname}
                      </a>
                      <span className="stext-105 cl3"> {item.price} Vnd </span>
                    </div>
                    <div className="block2-txt-child2 flex-r p-t-3">
                      <a
                        href="#"
                        className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- Load more --> */}
          <div className="flex-c-m flex-w w-full p-t-45">
            <Link href="/shop" passHref>
              <div
                className="
              flex-c-m
              stext-101
              cl5
              size-103
              bg2
              bor1
              hov-btn1
              p-lr-15
              trans-04
            "
              >
                Load More
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Modal idQV={idQV} />
    </>
  );
};

export default Product;
