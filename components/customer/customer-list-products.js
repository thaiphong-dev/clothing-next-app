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
import { getInitials } from "../utils/get-initials";
import { useRouter } from "next/router";
import { useFormik } from "formik";
// import Modal from "react-modal";
import ProductsApi from "../../public/api/productsApi";
export const CustomerListProducts = ({ products, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [listproduct, setListproduct] = useState([]);
  const [idProduct, setIdProduct] = useState();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [preview, setPreview] = useState();
  const [detailProduct, setDetailproduct] = useState();
  const fetchProductList = async () => {
    try {
      const param = {
        page: "",
        size: "",
      };
      const response = await ProductsApi.getAllProduct(param);
      setListproduct(response.product);
      console.log(response.product);
    } catch (error) {
      console.log("Loi : " + error);
    }
  };
  useEffect(() => {
    fetchProductList();
  }, []);

  const handleOpen = (e) => {
    let selected = listproduct?.filter((x) => x._id == idProduct);
    setDetailproduct(selected[0].productInfo);
    setName(selected[0]?.productname);
    setPrice(selected[0]?.price);
    setPreview(selected[0]?.preview);
    setAvatar(selected[0]?.image);
    setOpen(true);
  };
  const imageUpload = async (e) => {
    console.log("called");
    var fileIn = e.target;
    var file = fileIn.files[0];
    if (file && file.size < 5e6) {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "thaiphong");

      try {
        let res = await fetch(
          "https://api.cloudinary.com/v1_1/dxsta80ho/image/upload",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((response) => {
            e.preventDefault();
            console.log(response.secure_url);
            setAvatar(response.secure_url);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("oversized file");
    }
  };

  const updateProductfunction = async () => {
    const payload = {
      productname: name,
      price: price,
      preview: preview,
      image: avatar,
      productType: "",
      gender: 0,
      productInfo: detailProduct,
      status: 0,
    };
    console.log(payload);

    try {
      const response = await ProductsApi.updateProductById(idProduct, payload);
      console.log("update", response);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
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
  const handleMenuClick = async (e) => {
    const response = await ProductsApi.deleteProductById(idProduct);
    fetchProductList();
  };

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
          onClick: handleMenuClick,
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
                {listproduct?.map((product, index) => (
                  <TableRow
                    hover
                    key={index}
                    selected={selectedCustomerIds.indexOf(product?.id) !== -1}
                  >
                    <TableCell>
                      <Avatar src={product?.image} sx={{ mr: 2 }}>
                        {getInitials(product?.productname)}
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
                          {product?.productname}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{product?.price}</TableCell>
                    <TableCell>{product?.preview}</TableCell>
                    <TableCell>
                      <Dropdown
                        overlay={menu}
                        trigger={["click"]}
                        onClick={(e) => {
                          setIdProduct(product?._id);
                        }}
                      >
                        <a>
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
            <img
              src={avatar}
              alt="Avatar"
              width={100}
              height={100}
              style={{ borderRadius: "50%", marginLeft: "35%" }}
            ></img>
            <input
              type="file"
              accept="image/*"
              onChange={imageUpload}
              style={{ fontSize: "15px" }}
            ></input>

            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Price"
              margin="normal"
              name="price"
              onBlur={formik.handleBlur}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              value={price}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Detail description"
              margin="normal"
              name="detailDescription"
              onBlur={formik.handleBlur}
              onChange={(e) => setPreview(e.target.value)}
              type="text"
              value={preview}
              variant="outlined"
            />
            <Box sx={{ py: 2, ml: 16 }}>
              <Button
                sx={{ mr: 2 }}
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={updateProductfunction}
              >
                Update
              </Button>
              <Button
                color="primary"
                size="large"
                variant="contained"
                onClick={handleClose}
              >
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
