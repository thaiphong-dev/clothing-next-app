import React, { useState, createContext, useEffect, useContext } from "react";
import Select from "react-select";
import Cartitems from "../../components/common/cartItems/cartItems";
import { cartItemsContext } from "../../components/common/layout/layout";
import { useRouter } from "next/router";
import Head from "next/head";
import cartApi from "../../public/api/cartApi";
import userApi from "../../public/api/usersApi";
import Alert from "react-bootstrap/Alert";
import orderApi from "../../public/api/orderApi";

export const totalPriceCT = createContext();

const Index = () => {
  const router = useRouter();
  const cartContext = useContext(cartItemsContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [infoUser, setInfouser] = useState();
  const value = { totalPrice, setTotalPrice };
  const options = [
    { value: "Hồ Chí Minh", label: "Hồ Chí Minh", id: "01" },
    { value: "Hà Nội", label: "Hà Nội", id: "02" },
  ];
  const fetchInfoUser = async () => {
    const response = await userApi.getUserById(localStorage.getItem("userId"));
    setInfouser(response);
  };

  const checkOut = async () => {
    if (city !== "" && address !== "") {
      const payload = {
        userId: infoUser[0]?._id,
        username: infoUser[0]?.username,
        fullname: infoUser[0]?.fullname,
        email: infoUser[0]?.email,
        country: city[0]?.value,
        address: address,
        contact: infoUser[0]?.contact,
        detail: cartContext.cartItems,
        paymentAddress: city?.value + " " + address,
        paymentType: "Cash",
        status: 0,
      };
      const response = await orderApi.createOrder(payload);
      console.log(response);
      if (response === "order was added successfully!") {
        const payloadCart = {
          detail: [],
          status: 0,
        };
        const response = await cartApi.updateCartByID(
          localStorage.getItem("cartId"),
          payloadCart
        );
        console.log("payload", payload);
        cartContext.getListCart();
        router.push("/yourorder");
      }
    }
    console.log(city);
    console.log(address);
  };

  useEffect(() => {
    if (infoUser === undefined) fetchInfoUser();
    console.log(infoUser);
  }, [infoUser]);

  return (
    <totalPriceCT.Provider value={value}>
      <Head>
        <title>COZA STORE | Shop</title>
      </Head>
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i
              className="fa fa-angle-right m-l-9 m-r-10"
              aria-hidden="true"
            ></i>
          </a>
          <span className="stext-109 cl4">Shoping Cart</span>
        </div>
      </div>
      <form className="bg0 p-t-75 p-b-85">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tbody>
                      <tr className="table_head">
                        <th className="column-1"></th>
                        <th className="column-2">Product</th>
                        <th className="column-3">Price</th>
                        <th className="column-3">size</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-4">Total</th>
                      </tr>
                    </tbody>
                    <Cartitems />
                  </table>
                </div>
                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  <div className="flex-w flex-m m-r-20 m-tb-5"></div>
                  <div
                    className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10"
                    onClick={async () => {
                      const payload = {
                        detail: cartContext.cartItems,
                        status: 0,
                      };
                      const response = await cartApi.updateCartByID(
                        localStorage.getItem("cartId"),
                        payload
                      );
                      console.log("update cart ok", payload);
                    }}
                  >
                    Update Cart
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>
                <div className="flex-w flex-t bor12 p-b-13">
                  <div className="size-208">
                    <span className="stext-110 cl2">Subtotal:</span>
                  </div>
                  <div className="size-209">
                    <span className="mtext-110 cl2">${totalPrice}</span>
                  </div>
                </div>
                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                  <div className="size-208 w-full-ssm">
                    <span className="stext-110 cl2">Shipping:</span>
                  </div>
                  <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                    <p className="stext-111 cl6 p-t-2">
                      There are no shipping methods available. Please double
                      check your address, or contact us if you need any help.
                    </p>
                    <div className="p-t-15">
                      <span className="stext-112 cl8">Calculate Shipping</span>
                      <div className="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9">
                        <Select
                          id="selectbox"
                          instanceId="selectbox"
                          options={options}
                          onChange={setCity}
                        />
                        <div className="dropDownSelect2"></div>
                      </div>
                      <div className="bor8 bg0 m-b-12">
                        <input
                          className="stext-111 cl8 plh3 size-111 p-lr-15"
                          type="text"
                          name="state"
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="No /  Street / District"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {city === "" ? (
                  <Alert variant="danger">Please Chose City !!!</Alert>
                ) : null}
                {address === "" ? (
                  <Alert variant="danger">Please Input Your Address !!!</Alert>
                ) : null}
                <div className="flex-w flex-t p-t-27 p-b-33">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Total:</span>
                  </div>
                  <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2">${totalPrice}</span>
                  </div>
                </div>
                <div
                  className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                  onClick={checkOut}
                >
                  Proceed to Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </totalPriceCT.Provider>
  );
};
export default Index;
