import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import orderApi from "../../public/api/orderApi";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Head from "next/head";
import Modal from "react-bootstrap/Modal";
import ProductsApi from "./../../public/api/productsApi";
import Select from "react-select";
import Alert from "react-bootstrap/Alert";

function MyVerticallyCenteredModal(props) {
  const [detailOrder, setDetailOrder] = useState();
  const [totalPriceOrder, setTotalPriceOrder] = useState(0);

  function format2(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + " " + currency;
  }

  const fetchDetailOrder = async (param) => {
    try {
      setTotalPriceOrder(0);
      const response = await orderApi.getOrderByID(param);
      setDetailOrder(response.detail);
      setTotalPriceOrder(
        response.detail.reduce(function (prev, current) {
          return prev + +current.totalPrice;
        }, 0)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getProductByID = async (param) => {
    try {
      const response = await ProductsApi.getProductById(param);
      return response[0].productname;
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
              <th>Image</th>
              <th>Name Product</th>
              <th>Size</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {detailOrder?.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>image</td>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{format2(item.price, "vnd")}</td>
                <td>{item.amount}</td>
                <td>{format2(item.totalPrice, "vnd")}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={6} style={{ color: "red" }}>
                Total + Shipping (23.000VND):
              </td>
              <td>{format2(totalPriceOrder + 23000, "vnd")}</td>
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
  const [statusFilter, setStatusFilter] = useState({
    value: "Pending",
    label: "Pending",
    id: 0,
  });

  const options = [
    { value: "Pending", label: "Pending", id: 0 },
    { value: "Shipping", label: "Shipping", id: 1 },
    { value: "Received", label: "Received", id: 2 },
  ];

  const fetchListProduct = async (param) => {
    try {
      setListOrder([]);
      const response = await orderApi.getOrderByUserID(param);
      setListOrder(response);
      console.log(listOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const sliceDay = (day) => {
    return day?.slice(0, 10);
  };

  const sumPrice = (item) => {
    let sum = item.detail?.reduce(function (prev, current) {
      return (prev += current.totalPrice);
    }, 0);
    return sum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + " " + "VND";
  };

  const getStatus = (status) => {
    if (status === 0) {
      return (
        <Alert key={"dark"} variant={"dark"} style={{ width: "fit-content" }}>
          Pending
        </Alert>
      );
    } else if (status === 1) {
      return (
        <Alert key={"info"} variant={"info"} style={{ width: "fit-content" }}>
          Shipping
        </Alert>
      );
    } else {
      return (
        <Alert
          key={"danger"}
          variant={"danger"}
          style={{ width: "fit-content" }}
        >
          Received
        </Alert>
      );
    }
  };

  useEffect(() => {
    fetchListProduct(localStorage.getItem("userId"));
    console.log(statusFilter);
  }, [statusFilter]);

  return (
    <>
      <Head>
        <title>COZA STORE | Your Order</title>
      </Head>
      <Container fluid>
        <h1>Your Order</h1>
        <Select
          id="selectbox"
          instanceId="selectbox"
          options={options}
          defaultValue={options[0]}
          onChange={setStatusFilter}
        />
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
            {listOrder?.map((item, index) => {
              if (item.status === statusFilter.id) {
                return (
                  <tr key={index} style={{ padding: "3px 0" }}>
                    <td>{sliceDay(item.paymentDate)}</td>
                    <td>{item.detail?.length}</td>
                    <td>{getStatus(item.status)}</td>
                    <td>{sumPrice(item)}</td>
                    <td>
                      <Button
                        variant="info"
                        style={{ backgroundColor: "#0dcaf0" }}
                        onClick={() => {
                          setModalShow(true);
                          setOrderID(item._id);
                          console.log(orderID);
                        }}
                      >
                        Info
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
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
