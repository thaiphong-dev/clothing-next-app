import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { Formik } from "formik";
import * as yup from "yup";
import userApi from "../../public/api/usersApi";
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const [infoUser, setInfoUser] = useState(null);
  const [fulln, setFulln] = useState();
  const [phone, setPhone] = useState();
  const [addr, setAddr] = useState();
  const [update, setUpdate] = useState(false);

  const fetchInfoUser = async () => {
    const response = await userApi.getUserById(localStorage.getItem("userId"));
    setInfoUser(response);
    console.log(response);
  };
  useEffect(() => {
    fetchInfoUser();
  }, []);

  const schema = yup.object().shape({
    fullName: yup.string().required(),
    userName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
  });

  const UpdateUser = async () => {
    const payload = {
      fullname: fulln,
      avatar: "",
      username: infoUser[0]?.username,
      contact: phone,
      address: addr,
    };
    console.log("payload", payload)
    try {
      const response = await userApi.updateUserByID(
        localStorage.getItem("userId"),
        payload
      );
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container style={{ margin: "50px 100px" }}>
      {infoUser?.map((item) => (
        <div key={item._id}>
          <h1>Your ID: {infoUser[0]?._id}</h1>
          <Formik
            validationSchema={schema}
            initialValues={{
              fullName: infoUser[0]?.fullname,
              userName: infoUser[0]?.username,
              email: infoUser[0]?.email,
              phone: infoUser[0].contact,
              address: infoUser[0].address,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Full name"
                      defaultValue={values.fullName}
                      onChange={(e) => setFulln(e.target.value)}
                      isValid={touched.fullName && !errors.fullName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                      type="text"
                      name="User name"
                      defaultValue={values.userName}
                      isValid={touched.userName && !errors.userName}
                      disabled
                    />

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormikUsername"
                  >
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        defaultValue={values.email}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.userName}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormikUsername"
                  >
                    <Form.Label>Phone</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Phone"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        defaultValue={values.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        isInvalid={touched.phone && !errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormikUsername"
                  >
                    <Form.Label>Address</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        defaultValue={values.address}
                        onChange={(e) => setAddr(e.target.value)}
                        isInvalid={touched.address && !errors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Button
                  type="submit"
                  style={{ position: "relative", left: "1190px" }}
                  onClick={UpdateUser}
                >
                  Save Info
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      ))}
    </Container>
  );
}
