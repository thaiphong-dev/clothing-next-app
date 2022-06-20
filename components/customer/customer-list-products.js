import { useEffect, useState } from "react";
import NextLink from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { Menu, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  Avatar,
  Box,
  Button,
  Card,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { useRouter } from "next/router";
import { useFormik } from "formik";
// import Modal from "react-modal";
import ProductsApi from "src/api/productsApi";
export const CustomerListProducts = ({ products, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleOpen = (e) => {
    console.log("click", e.key);
    console.log("producs", products);
    let selected = products?.filter((x) => x.id == e.key);
    formik.setFieldValue("code", selected[0].id);
    formik.setFieldValue("name", selected[0].name);
    formik.setFieldValue("price", selected[0].price);
    formik.setFieldValue("detailDescription", selected[0].detailDescription);
    setOpen(true);
  };
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "user3",
      password: "123",
    },

    onSubmit: async (e) => {
      const payload = {
        id: e?.code,
        code: e?.name,
        name: e?.name,
        shortDescription: e?.detailDescription,
        detailDescription: e?.detailDescription,
        price: e?.price,
        gender: 1,
        activeFlag: true,
        competitivePrice: e?.price,
        sizes: ["S", "L", "XL", "XXL"],
        colors: ["white", "black", "blue"],
      };

      console.log(payload);

      try {
        const response = await ProductsApi.updateProduct(payload);

        console.log(response);
      } catch (error) {
        console.log("Loi : " + error);
      }
      // login(e);
    },
  });
  function handleMenuClick(e) {
    // message.info("Click on menu item.");
    setModalIsOpen(true);
  }

  const menu = (
    <Menu
      items={[
        {
          label: "Edit",
          key: "1",
          icon: <EditOutlined />,
          onClick: handleOpen,
        },
        {
          label: "Delete",
          key: "2",
          icon: <DeleteOutlined />,
          style: { color: "red" },
          onClick: { handleMenuClick },
        },
      ]}
    />
  );

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => (
                  <TableRow
                    hover
                    key={product?.id}
                    selected={selectedCustomerIds.indexOf(product?.id) !== -1}
                  >
                    <TableCell>
                      <Avatar src={product?.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(product?.name)}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {product?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{product?.price}</TableCell>
                    <TableCell>{product?.detailDescription}</TableCell>
                    <TableCell>
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("value", e);
                          }}
                        >
                          <MoreOutlined
                            style={{
                              border: "1px solid #d9d9d9",
                              color: "black",
                              padding: "7px",
                              marginLeft: "10px",
                              fontSize: "18px",
                            }}
                          />
                        </a>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={products?.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Update product
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.code && formik.errors.code)}
              fullWidth
              helperText={formik.touched.code && formik.errors.code}
              label="Code"
              margin="normal"
              name="code"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.code}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              helperText={formik.touched.price && formik.errors.price}
              label="Price"
              margin="normal"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.price}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.detailDescription && formik.errors.detailDescription)}
              fullWidth
              helperText={formik.touched.detailDescription && formik.errors.detailDescription}
              label="Detail description"
              margin="normal"
              name="detailDescription"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.detailDescription}
              variant="outlined"
            />
            <Box sx={{ py: 2, ml: 16 }}>
              <Button sx={{ mr: 2 }} color="primary" size="large" type="submit" variant="contained">
                Update
              </Button>
              <Button color="primary" size="large" variant="contained" onClick={handleClose}>
                close
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

CustomerListProducts.propTypes = {
  products: PropTypes.array.isRequired,
};
