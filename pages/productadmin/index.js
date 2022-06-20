import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListProducts } from "../components/customer/customer-list-products";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import React, { useState, useEffect } from "react";
import ProductsApi from "src/api/productsApi";

export default function Products() {
  const [listproduct, setListproduct] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const param = {
          page: 1,
          size: 10,
        };
        const response = await ProductsApi.getAllProduct(param);
        setListproduct(response.products);
      } catch (error) {
        console.log("Loi : " + error);
      }
    };

    fetchProductList();
  }, []);

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
            <CustomerListProducts products={listproduct} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
