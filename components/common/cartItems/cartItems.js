import React, { useContext, useEffect } from "react";
import { cartItemsContext } from "../layout/layout";
import { totalPriceCT } from "../../../pages/cart";
import Image from "next/image";

const Cartitems = () => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const valueContext = useContext(cartItemsContext);
  const totalContext = useContext(totalPriceCT);
  const changeValueProduct = (calc, id) => {
    var index = valueContext.cartItems.findIndex((item) => item.id === id);
    if (calc === "+") {
      valueContext.cartItems[index].amount++;
    } else if (calc === "-" && valueContext.cartItems[index].amount > 1) {
      valueContext.cartItems[index].amount--;
    }
    forceUpdate();
  };

  const totalPrice = () => {
    var price = 0;
    valueContext.cartItems.forEach((item) => {
      price += item.price * item.amount;
    });
    totalContext.setTotalPrice(price);
  };

  useEffect(() => {
    totalPrice();
  });

  const deleteItem = (id) => {
    valueContext.setCartItems(
      valueContext.cartItems.filter((item) => item.id != id)
    );
    console.log(valueContext.setCartItems);
  };

  useEffect(() => {}, [forceUpdate]);
  return (
    <>
      {valueContext.cartItems.map((item, index) => (
        <tr className="table_row" key={index}>
          <td className="column-1">
            <div className="how-itemcart1" onClick={() => deleteItem(item.id)}>
              <Image src={item.img} alt="IMG" />
            </div>
          </td>
          <td className="column-2">{item.name}</td>
          <td className="column-3">${item.price}</td>
          <td className="column-4">
            <div className="wrap-num-product flex-w m-l-auto m-r-0">
              <div
                className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                onClick={() => {
                  changeValueProduct("-", item.id);
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
                  changeValueProduct("+", item.id);
                  totalPrice();
                }}
              >
                <i className="fs-16 zmdi zmdi-plus"></i>
              </div>
            </div>
          </td>
          <td className="column-5">${item.price * item.amount}</td>
        </tr>
      ))}
    </>
  );
};

export default Cartitems;
