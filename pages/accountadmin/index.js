import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { DashboardLayout } from "../../components/dashboard-layout";
import React, { useEffect, useState } from "react";
import userApi from "../../public/api/usersApi";

export default function Account() {
  const [infoUser, setInfoUser] = useState();
  const fetchInfoUser = async () => {
    const response = await userApi.getUserById(localStorage.getItem("userId"));
    setInfoUser(response[0]);
    console.log(infoUser);
  };

  useEffect(() => {
    fetchInfoUser();
  }, []);

  return (
    <>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>

          <Grid container spacing={3} style={{ justifyContent: "center" }}>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails infoUser={infoUser} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
