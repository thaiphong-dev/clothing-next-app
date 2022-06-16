import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import orderApi from "../../public/api/orderApi";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Head from "next/head";
import Modal from "react-bootstrap/Modal";
import ProductsApi from "./../../public/api/productsApi";

function MyVerticallyCenteredModal(props) {
  const [detailOrder, setDetailOrder] = useState();
  const [totalPriceOrder, setTotalPriceOrder] = useState(0);

  function format2(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " " +currency;
  }

  const fetchDetailOrder = async (param) => {
    try {
        setTotalPriceOrder(0);
      const response = await orderApi.getOrderByID(param);
      setDetailOrder(response[0].detail);
      console.log(response[0].detail)
      setTotalPriceOrder(response[0].detail.reduce(function(prev, current) {
        return prev + +current.totalPrice
      }, 0));
    } catch (error) {
      console.log(error);
    }
  };
  const getProductByID = async (param) => {
    try {
      const response = await ProductsApi.getProductById(param);
      return (response[0].productname);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailOrder(props.idorder);
  }, [props.idorder]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order ID: {props.idorder}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name Product</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {detailOrder?.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.productId}</td>
                <td>{format2(item.price, "vnd")}</td>
                <td>{item.amount}</td>
                <td>{format2(item.totalPrice, "vnd")}</td>
              </tr>
            ))}
            <tr>
            <td colSpan={4} style={{color:"red"}}>Total:</td>
            <td>{format2(totalPriceOrder, "vnd")}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Yourorder() {
  const [listOrder, setListOrder] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [orderID, setOrderID] = useState();
  const fetchListProduct = async (param) => {
    try {
      setListOrder([]);
      const response = await orderApi.getOrderByUserID(param);
      setListOrder((prev) => [...prev, response]);
    } catch (error) {
      console.log(error);
    }
  };

  const sliceDay = (day) => {
    return day?.slice(0, 10);
  };

  useEffect(() => {
    fetchListProduct(localStorage.getItem("userId"));
  }, []);

  return (
    <>
      <Head>
        <title>COZA STORE | Your Order</title>
      </Head>
      <Container fluid>
        <h1>Your Order</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Amout Product</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listOrder?.map((item, index) => (
              <tr key={index} style={{ padding: "3px 0" }}>
                <td>{sliceDay(item.paymentDate)}</td>
                <td>{item.detail.length}</td>
                <td>{item.status}</td>
                <td>{item.detail[0].amount}</td>
                <td>
                  <Button
                    variant="info"
                    style={{ backgroundColor: "#0dcaf0" }}
                    onClick={() => {
                      setModalShow(true);
                      setOrderID(item._id);
                    }}
                  >
                    Info
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        idorder={orderID}
      />
    </>
  );
}
