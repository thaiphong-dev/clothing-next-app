import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import userApi from "./../../public/api/usersApi";
import orderApi from "../../public/api/orderApi";
import cartApi from "../../public/api/cartApi";

const Register = () => {
  const router = useRouter();
  const orderTemap = {

  }
  const cartTemp = {
    
  }
  const fetchRegisterUser = async (param) => {
    try {
      const response = await userApi.registerUser(param);
      console.log(response);
      if(response?.status === "200") {
        const createOrder = await orderApi.registerUser(orderTemap);
        const createCart = await cartApi.registerUser(cartTemp);
      }
      router.push("/login");
    } catch (error) {
      console.log("Err : ", error);
      console.log(param);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      fullname: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
      username: Yup.string().max([255], "User Name is required"),
    }),
    onSubmit: (e) => {
      fetchRegisterUser(e);
    },
  });

  return (
    <>
      <Head>
        <title>COZA STORE | Register</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
        style={{ paddingTop: "5%" }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Login
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
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
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.fullname && formik.errors.fullname)}
              fullWidth
              helperText={formik.touched.fullname && formik.errors.fullname}
              label="Full Name"
              margin="normal"
              name="fullname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullname}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Pass Word"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="User Name"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="username"
              value={formik.values.username}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            ></Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
