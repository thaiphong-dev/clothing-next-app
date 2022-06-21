import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import React, { useState, useEffect } from "react";
import userApi from "src/api/usersApi";

export default function Customers() {
  const [listUser, setListUser] = useState([]);
  const fetchUserList = async () => {
    try {
      const param = {
        page: 1,
        size: 10,
      };
      const response = await userApi.getAlluser(param);
      setListUser([]);
      response.users?.map((item) => {
        setListUser((prev) => [...prev, item]);
      });
      console.log(listUser);
    } catch (error) {
      console.log(Promise.reject(error));
    }
  };
  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar titlePage="Customer" />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults listUser={listUser} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
