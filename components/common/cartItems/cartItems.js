import React, { useContext, useEffect } from "react";
import { cartItemsContext } from "../layout/layout";
import { totalPriceCT } from "../../../pages/cart";
import Image from "next/image";

const Cartitems = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const cartContext = useContext(cartItemsContext);
  const totalContext = useContext(totalPriceCT);

  const changeValueProduct = (calc, productId) => {
    var index = cartContext.cartItems.findIndex(
      (item) => item.productId === productId
    );
    if (calc === "+") {
      cartContext.cartItems[index].amount++;
    } else if (calc === "-" && cartContext.cartItems[index].amount > 1) {
      cartContext.cartItems[index].amount--;
    }
    forceUpdate();
  };

  const totalPrice = () => {
    var price = 0;
    cartContext.cartItems.forEach((item) => {
      price += item.price * item.amount;
    });
    totalContext.setTotalPrice(price);
  };

  useEffect(() => {
    totalPrice();
  });

  const deleteItem = (productId) => {
    cartContext.setCartItems(
      cartContext.cartItems.filter((item) => item.productId != productId)
    );
    console.log(cartContext.setCartItems);
  };

  useEffect(() => {}, [forceUpdate]);

  return (
    <tbody>
      {cartContext.cartItems.map((item, index) => (
        <tr className="table_row" key={index}>
          <td className="column-1">
            <div
              className="how-itemcart1"
              onClick={() => deleteItem(item.productId)}
            >
              {/* <Image src={item.img} alt="IMG" /> */}
              {/* delete */}
            </div>
          </td>
          <td className="column-2">{item.name}</td>
          <td className="column-2">{item.price} VND</td>
          <td className="column-2">{item.size}</td>
          <td className="column-4">
            <div className="wrap-num-product flex-w m-l-auto m-r-0">
              <div
                className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                onClick={() => {
                  changeValueProduct("-", item.productId);
                  totalPrice();
                }}
              >
                <i className="fs-16 zmdi zmdi-minus"></i>
              </div>
              <div
                className="mtext-104 cl3 txt-center num-product"
                style={{ paddingTop: "9px" }}
              >
                {item.amount}
              </div>
              <div
                className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                onClick={() => {
                  changeValueProduct("+", item.productId);
                  totalPrice();
                }}
              >
                <i className="fs-16 zmdi zmdi-plus"></i>
              </div>
            </div>
          </td>
          <td className="column-4">{item.price * item.amount} VND</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Cartitems;
