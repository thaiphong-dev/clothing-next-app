import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { Menu, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import orderApi from "../../public/api/orderApi";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  const [detailOrder, setDetailOrder] = useState();
  const [totalPriceOrder, setTotalPriceOrder] = useState(0);
  const [statusOrder, setStatusOrder] = useState();

  function format2(n, currency) {
    return n?.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + " " + currency;
  }

  const fetchDetailOrder = async (param) => {
    try {
      setTotalPriceOrder(0);
      const response = await orderApi.getOrderByID(param);
      setDetailOrder(response.detail);
      setStatusOrder(response.status + 1);
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

  const updateOrder = async () => {
    const payload = {
      status: statusOrder,
    };
    const response = await orderApi.updateOrderByID(props.idorder, payload);
    props.onHide();
  };

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
        <Button onClick={updateOrder}>Update Order</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const CustomerDetailListOders = ({ products, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [listOrder, setListOrder] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [orderID, setOrderID] = useState();
  const fetchListOrder = async () => {
    const payload = {
      pageNumber: "", //page
      pageSize: "", //limit
    };
    const response = await orderApi.getAllOrder(payload);
    setListOrder(response);
    console.log(listOrder);
  };

  useEffect(() => {
    fetchListOrder();
  }, [limit, page, modalShow]);

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "Edit",
          key: "1",
          icon: <EditOutlined />,
        },
        {
          label: "Delete",
          key: "2",
          icon: <DeleteOutlined />,
          style: { color: "red" },
        },
      ]}
    />
  );
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const getTotalPriceOrder = (response) => {
    let sum = response.reduce(function (prev, current) {
      return prev + +current.totalPrice;
    }, 0);

    return sum;
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount Product</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrder?.order.map((product) => (
                <TableRow hover key={product?._id}>
                  <TableCell>{product?._id}</TableCell>
                  <TableCell>{product?.detail?.length}</TableCell>
                  <TableCell>{getTotalPriceOrder(product?.detail)}</TableCell>
                  <TableCell>{getStatus(product.status)}</TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      variant="info"
                      style={{ backgroundColor: "#0dcaf0" }}
                      onClick={() => {
                        setModalShow(true);
                        setOrderID(product._id);
                        console.log(orderID);
                      }}
                    >
                      Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={Math.ceil(listOrder?.total / limit)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        idorder={orderID}
      />
    </Card>
  );
};

CustomerDetailListOders.propTypes = {
  products: PropTypes.array.isRequired,
};
