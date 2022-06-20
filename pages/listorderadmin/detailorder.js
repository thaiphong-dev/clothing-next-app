import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import React, { useState, useEffect } from "react";
import orderApi from "src/api/orderApi";
import { CustomerDetailListOders } from "src/components/customer/customer-list-detailOrder";

export default function DetailOrder() {
  const [listproduct, setListproduct] = useState([]);
  useEffect(() => {
    const fetchProductList = async () => {
      const ID = localStorage.getItem("idDetailOrder");
      try {
        const response = await orderApi.getOrderByID(ID);
        console.log("response", response);
        setListproduct(response);
      } catch (error) {
        console.log("Loi : " + error);
      }
    };
    fetchProductList();
  }, []);

  useEffect(() => {
  console.log("setlist", listproduct);

  }, [listproduct]);


  return (
    <>
      <Head>
        <title>Detail Product</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar titlePage="Detail Order" />
          <Box sx={{ mt: 3 }}>
            <CustomerDetailListOders products={listproduct} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

DetailOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
