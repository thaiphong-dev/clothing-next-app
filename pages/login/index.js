import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import userApi from "./../../public/api/usersApi";
import { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const login = async (param) => {
    try {
      const response = await userApi.login(param);
      console.log("login res", response);
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("userId", response?.userData?.id);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "test1@gmail.com",
      password: "123123123",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(255)
        .required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (e) => {
      login(e);
    },
  });


  const imageUpload = (e) => {
    console.log("called");
    var fileIn = e.target;
    var file = fileIn.files[0];
    if (file && file.size < 5e6) {
        const formData = new FormData();

        formData.append("image", file);
        try {
          fetch("https://api.imgur.com/3/upload", {
            method: "POST",
            headers: {
                Authorization: "Client-ID c41137647408899",
                Accept: "application/json",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                e.preventDefault();
                console.log(response);
                console.log(response.data.link);
                url_in = response.data.link;
            });
        } catch (error) {
          console.log(error);
        }
        
    } else {
        console.error("oversized file");
    }
}


  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    console.log("file", file);

  }, [file]);
  return (
    <>
    <div>
      <h2>Add Image:</h2>
            <input type="file" onChange={imageUpload} />
            <img src={file} />
      </div>
      <Head>
        <title>COZA STORE | Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
        style={{ height: "100vh" }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
