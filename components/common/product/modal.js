import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import productDetail1 from "../../../public/images/product-detail-01.jpg";
import productDetail2 from "../../../public/images/product-detail-02.jpg";
import productDetail3 from "../../../public/images/product-detail-03.jpg";
import Carousel from "react-bootstrap/Carousel";
import { cartItemsContext } from "../layout/layout";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";
import ProductsApi from "./../../../public/api/productsApi";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const Modal = (props) => {
  const valueContext = useContext(cartItemsContext);
  const [valueProduct, setValueProduct] = useState(1);
  const [isalert, setIsalert] = useState(false);
  const [product, setProduct] = useState();
  const [detailProduct, setDetailProduct] = useState([]);
  const [listSize, setListSize] = useState([{}]);

  const fetchProduct = async (id) => {
    const response = await ProductsApi.getAllProduct();
    setDetailProduct(response.product);
    console.log(detailProduct);
    getSizeProduct();
  };

  const getSizeProduct = () => {
    if (detailProduct !== undefined) {
      const temp = detailProduct?.find((item) => item._id === props.idQV);
      console.log("temp:", temp?.productInfo);
      setProduct(temp);
      const temp2 = temp?.productInfo?.map((item) => {
        return {
          id: item._id,
          value: item.size,
          lable: "Size " + item.size,
        };
      });

      console.log("temp2:", temp2);
      setListSize(temp2);
    }
  };

  useEffect(() => {
    fetchProduct(props.idQV);
    console.log("list Size", listSize);
  }, [props.idQV, valueProduct]);

  return (
    <>
      <div
        className={
          valueContext.showQV
            ? "wrap-modal1 js-modal1 show-modal1"
            : "wrap-modal1 js-modal1"
        }
      >
        <div className="overlay-modal1 js-hide-modal1"></div>
        <div className="container" style={{ maxWidth: "1085px" }}>
          <div className="bg0 p-lr-15-lg how-pos3-parent">
            <button className="how-pos3 hov3 trans-04 js-hide-modal1">
              <CloseOutlined
                style={{
                  fontSize: "25px",
                  color: "white",
                  marginTop: "40px",
                  marginRight: "-35px",
                  padding: "5px",
                }}
                onClick={() => valueContext.setShowQV(false)}
              />
            </button>
            <div className="row">
              <div className="col-md-6 col-lg-7 p-b-30">
                <div className="p-l-25 p-r-30 p-lr-0-lg">
                  <div className="wrap-slick3 flex-sb flex-w">
                    <div className="wrap-slick3-dots"></div>
                    <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>
                    <Carousel fade>
                      <Carousel.Item>
                        <Image
                          className="d-block w-100"
                          src={productDetail1}
                          alt="First slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <Image
                          className="d-block w-100"
                          src={productDetail2}
                          alt="Second slide"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <Image
                          className="d-block w-100"
                          src={productDetail3}
                          alt="Third slide"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-5 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                  <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                    {product?.productname}
                  </h4>
                  <span className="mtext-106 cl2">
                    {product?.price}{" "}
                  </span>
                  <p className="stext-102 cl3 p-t-23">
                    {product?.preview}
                  </p>
                  <div className="p-t-33">
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Size</div>
                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          <ButtonGroup aria-label="Basic example">
                            {listSize?.map((item) => (
                              <Button variant="secondary" key={item._id}>
                                {item.lable}
                              </Button>
                            ))}
                          </ButtonGroup>
                          <div className="dropDownSelect2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-204 flex-w flex-m respon6-next">
                        <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                          <div
                            className="
                          btn-num-product-down
                          cl8
                          hov-btn3
                          trans-04
                          flex-c-m
                        "
                          >
                            <i
                              className="fs-16 zmdi zmdi-minus"
                              onClick={() => {
                                if (valueProduct > 1) {
                                  setValueProduct(valueProduct - 1);
                                }
                              }}
                            ></i>
                          </div>
                          <div className="mtext-104 cl3 txt-center num-product" style={{ paddingTop: "9px" }}>{valueProduct}</div>
                          <div
                            className="
                          btn-num-product-up
                          cl8
                          hov-btn3
                          trans-04
                          flex-c-m
                        "
                          >
                            <i
                              className="fs-16 zmdi zmdi-plus"
                              onClick={() =>
                                setValueProduct(valueProduct + 1)
                              }
                            ></i>
                          </div>
                        </div>
                        <button
                          className="
                        flex-c-m
                        stext-101
                        cl0
                        size-101
                        bg1
                        bor1
                        hov-btn1
                        p-lr-15
                        trans-04
                        js-addcart-detail
                      "
                          onClick={() => {
                            valueContext.addToCart(valueContext.itemQV);
                            setIsalert(true);
                            setTimeout(() => {
                              setIsalert(false);
                              valueContext.setShowQV(false);
                            }, 2000);
                          }}
                        >
                          Add to cart
                        </button>
                        {isalert ? (
                          <Alert variant="success">
                            success Add To Cart !!!
                          </Alert>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
