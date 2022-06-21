import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListProducts } from "../../components/customer/customer-list-products";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import React, { useState, useEffect } from "react";
import ProductsApi from "../../public/api/productsApi";

export default function Products() {


  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar titlePage="Product" />
          <Box sx={{ mt: 3 }}>
            <CustomerListProducts />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
