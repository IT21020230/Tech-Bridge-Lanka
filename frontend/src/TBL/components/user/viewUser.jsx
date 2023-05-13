import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { BiTrash } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";
//import { useAuthContext } from "../../hooks/useAuthContext";

function UpdateModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Your Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure want to update your account ?</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ marginRight: "20px" }} variant="success">
          Update
        </Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Your Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure want to permanently delete your account ?</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ marginRight: "20px" }} variant="danger">
          Delete
        </Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ViewUser() {
  //const { user } = useAuthContext();

  //console.log(user.email);

  const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  const { signup, error, isLoading } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setPhoto(base64);
  };

  const handleSubmit = async (values) => {
    console.log(
      values.email,
      values.password,
      values.confirmPassword,
      values.name,
      values.phone,
      values.age,
      values.province,
      values.city
    );

    await signup(
      values.email,
      values.password,
      values.confirmPassword,
      values.name,
      values.phone,
      values.age,
      values.province,
      values.city
    );
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter an Email!")
      .email("Please enter a valid Email!"),

    password: yup
      .string()
      .required("Please enter a Password!")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        "Password should between 8 to 15 characters, and must include atleast 1 uppercase, 1 lowercase and 1 number!"
      ),

    confirmPassword: yup
      .string()
      .required("Please enter the Password again!")
      .oneOf([yup.ref("password"), ""], "Passwords must match"),

    phone: yup
      .string()
      .required("Please enter a Phone number!")
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be a 10-digit number without spaces or dashes"
      ),

    name: yup.string().required("Please enter the Name!"),

    age: yup.string().required("Please enter the Age!"),

    province: yup.string().required("Please enter the Province!"),

    city: yup.string().required("Please enter the City!"),
  });

  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginLeft: "200px",
        marginRight: "200px",
        marginBottom: "17px",
        padding: "50px",
      }}
    >
      <div>
        <h1 className="head">My Account</h1>
      </div>
      <Formik
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          phone: "",
          age: "",
          province: "",
          city: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">

              <Row>
                <div
                  style={{
                    marginLeft: "60px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Col s={6} md={4}>
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                      style={{ height: "250px", width: "250px" }}
                      roundedCircle
                    />
                  </Col>
                </div>
              </Row>

              
            <Row>


            <div style={{ marginLeft: "60px", display: "flex", justifyContent: "center" }}>
        <Col s={6} md={4}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png" style={{height: "250px", width: "250px"}} roundedCircle />
        </Col>
</div>

      </Row>


              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label style={{ marginTop: "20px" }}>Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group
                style={{ marginLeft: "10%" }}
                as={Col}
                md="5"
                controlId="validationFormikUsername"
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Email
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Password
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    aria-describedby="inputGroupPrepend"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group
                style={{ marginLeft: "10%" }}
                as={Col}
                md="5"
                controlId="validationFormikUsername"
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Confirm Password
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    aria-describedby="inputGroupPrepend"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  City
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isValid={touched.city && !errors.city}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group
                style={{ marginLeft: "10%" }}
                as={Col}
                md="5"
                controlId="validationFormikUsername"
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Province
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="province"
                    value={values.province}
                    onChange={handleChange}
                    isValid={touched.province && !errors.province}
                    isInvalid={!!errors.province}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.province}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Age
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    aria-describedby="inputGroupPrepend"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    isValid={touched.age && !errors.age}
                    isInvalid={!!errors.age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group
                style={{ marginLeft: "10%" }}
                as={Col}
                md="5"
                controlId="validationFormikUsername"
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Phone
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    aria-describedby="inputGroupPrepend"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Phone
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    aria-describedby="inputGroupPrepend"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload Profile Photo
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="photo"
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.photo}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>


            <br />
            <Button
              disabled={isLoading}
              className="submitBTN"
              type="submit"
              variant="outline-success"
              onClick={() => setModalUpdateShow(true)}
            ></Button>

            <br/>
            <Button disabled={isLoading} className="submitBTN" type="submit" variant="outline-success" onClick={() => setModalUpdateShow(true)}>

              Update
            </Button>
            <Button
              style={{ marginLeft: "30px" }}
              disabled={isLoading}
              className="submitBTN"
              type="submit"
              variant="outline-danger"
              onClick={() => setModalDeleteShow(true)}
            >
              Delete
            </Button>
            {error && <div className="error">{error}</div>}
          </Form>
        )}
      </Formik>

      <UpdateModal
        show={modalUpdateShow}
        onHide={() => setModalUpdateShow(false)}
      />

      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />
    </div>
  );
}

export default ViewUser;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
