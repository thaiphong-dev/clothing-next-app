import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import React, { useState, useEffect } from "react";

import { CustomerDetailListOders } from "../../components/customer/customer-list-detailOrder";

export default function DetailOrder() {
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
            <CustomerDetailListOders />
          </Box>
        </Container>
      </Box>
    </>
  );
}

DetailOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
