import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Menu, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  Modal,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import userApi from "src/api/usersApi";
import axios from "axios";

export const CustomerListResults = ({ listUser, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoUser, setInfoUser] = useState();
  const [open, setOpen] = useState(false);
  const router = useRouter();
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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function handleMenuClick(e) {
    // message.info("Click on menu item.");
    setModalIsOpen(true);
  }

  const fetchUpdateUser = async (payload) => {
    try {
      const response = await userApi.updateUser(payload);
    } catch (error) {
      console.log(Promise.reject(error));
    }
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      phone: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      roles: [{ id: null, name: null }],
    },

    onSubmit: (e) => {
      const payload = {
        id: e?.code,
        phone: e?.phone,
        name: e?.name,
        username: e?.username,
        email: e?.email,
        activeFlag: true,
        roles: [
          {
            id: infoUser.roles[0].id,
            name: infoUser.roles[0].name,
          },
        ],
      };

      fetchUpdateUser(payload);
      handleClose();
      // login(e);
    },
  });
  const handleOpen = () => {
    formik.setFieldValue("code", infoUser.id);
    formik.setFieldValue("name", infoUser.name);
    formik.setFieldValue("phone", infoUser.phone);
    formik.setFieldValue("email", infoUser.email);
    formik.setFieldValue("username", infoUser.username);
    formik.setFieldValue("roles", infoUser.roles[0].name);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const updateUser = (e) => {};

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

  return (
    <>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>ROLE</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUser?.map((user) => (
                  <TableRow hover key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.roles[0].name.slice(5)}</TableCell>
                    <TableCell>
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <a>
                          <MoreOutlined
                            style={{
                              border: "1px solid #d9d9d9",
                              color: "black",
                              padding: "7px",
                              marginLeft: "10px",
                              fontSize: "18px",
                            }}
                            onClick={() => {
                              setInfoUser(user);
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
          count={listUser.length}
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
              disabled
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
              disabled
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
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.phone}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.roles && formik.errors.roles)}
              disabled
              fullWidth
              helperText={formik.touched.roles && formik.errors.roles}
              label="ROLES"
              margin="normal"
              name="roles"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.roles}
              variant="outlined"
            />
            <Box sx={{ py: 2, ml: 16 }}>
              <Button
                sx={{ mr: 2 }}
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={updateUser}
              >
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

CustomerListResults.propTypes = {
  listUser: PropTypes.array.isRequired,
};
