import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
// import { useAuthContext } from "../../hooks/useAuthContext";
import { useAuthContext } from "../../TBL/hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useLogout } from "../../TBL/hooks/useLogout";
import { Dropdown } from "react-bootstrap";
// import { useUpdateUser } from "../../hooks/useUpdateUser";
import axios from "axios";

function ViewUser() {
  //const { updateUser, error, isLoading } = useUpdateUser();
  // const { user } = useAuthContext();
  //const { logout } = useLogout();

  const { id } = useParams();

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    age: "",
    province: "",
    city: "",
    photo: "",
  });

  const [imageURL, setImageURL] = useState("");

  //GET USER DATA
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:7000/api/user/${id}`);
      const { email, password, name, phone, age, province, city, photo, role } =
        response.data;
      setInitialValues({
        email,
        name,
        phone,
        age,
        province,
        city,
        photo,
        role,
      });

      setSelectedDistrict(city);
      setSelectedProvince(province);
      setSelectedUser(role);

      if (photo) {
        setImageURL(photo);
      } else {
        // Set a default image URL if the API response is empty
      }
    }

    fetchData();
  }, []);

  const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  //UPDATE USER DATA
  const handleSubmit = async (values) => {
    //e.preventDefault();

    const response = await fetch(`http://localhost:7000/api/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        age: values.age,
        province: values.province,
        city: values.city,
        photo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log("User updated successfully.");

      toast.success(`User updated successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        window.location.href = "/listUser";
      }, 2000);
    }
  };

  //DELETE User
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:7000/api/user/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      console.log("User deleted successfully.", json);

      toast.success(`User deleted successfully `, {
        position: "bottom-left",
      });
      setTimeout(() => {
        window.location.href = "/listUser";
      }, 2000);
    }
  };

  //Update modal
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
          <Button
            style={{ marginRight: "20px" }}
            variant="success"
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //Delete modal
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
          <Button
            style={{ marginRight: "20px" }}
            variant="danger"
            onClick={handleDeleteSubmit}
          >
            Delete
          </Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleDropdownDistrict = (eventKey) => {
    setSelectedDistrict(eventKey);
  };

  const handleDropdownProvince = (eventKey) => {
    setSelectedProvince(eventKey);
  };

  const handleDropdownUser = (eventKey) => {
    setSelectedUser(eventKey);
  };

  const [photo, setPhoto] = useState("");

  //file upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setPhoto(base64);
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
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit Mobile Number"),

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
      <ToastContainer />
      <div>
        <h1 className="head">User Account</h1>
      </div>
      <Formik
        enableReinitialize
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
                    {imageURL ? (
                      <Image
                        src={imageURL}
                        style={{ height: "250px", width: "250px" }}
                        roundedCircle
                      />
                    ) : (
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                        style={{ height: "250px", width: "250px" }}
                        roundedCircle
                      />
                    )}
                  </Col>
                </div>
              </Row>

              <Form.Group as={Col} md="5" controlId="validationFormikName">
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
                controlId="validationFormikEmail"
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

              <Form.Group as={Col} md="5" controlId="validationFormikPassword">
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
                controlId="validationFormikConfirmPassword"
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

              {/* District */}
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikDistrict"
                style={{ width: "45%" }}
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  District
                </Form.Label>

                <Dropdown onSelect={handleDropdownDistrict}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-input"
                    style={{
                      width: "92%",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    {selectedDistrict ? selectedDistrict : "Select a District"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                      <Dropdown.Item eventKey="Colombo">Colombo</Dropdown.Item>
                      <Dropdown.Item eventKey="Gampaha">Gampaha</Dropdown.Item>
                      <Dropdown.Item eventKey="Kalutara">
                        Kalutara
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Kandy">Kandy</Dropdown.Item>
                      <Dropdown.Item eventKey="Matale">Matale</Dropdown.Item>
                      <Dropdown.Item eventKey="Nuwara Eliya">
                        Nuwara Eliya
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Galle">Galle</Dropdown.Item>
                      <Dropdown.Item eventKey="Hambantota">
                        Hambantota
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Jaffna">Jaffna</Dropdown.Item>
                      <Dropdown.Item eventKey="Mannar">Mannar</Dropdown.Item>
                      <Dropdown.Item eventKey="Vavuniya">
                        Vavuniya
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Mullaitivu">
                        Mullaitivu
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Batticaloa">
                        Batticaloa
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Ampara">Ampara</Dropdown.Item>
                      <Dropdown.Item eventKey="Trincomalee">
                        Trincomalee
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Kurunegala">
                        Kurunegala
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Puttalam">
                        Puttalam
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Anuradhapura">
                        Anuradhapura
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Polonnaruwa">
                        Polonnaruwa
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Badulla">Badulla</Dropdown.Item>
                      <Dropdown.Item eventKey="Monaragala">
                        Monaragala
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Ratnapura">
                        Ratnapura
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Kegalle">Kegalle</Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {/* Province */}
              <Form.Group
                style={{ marginLeft: "7%", width: "45%" }}
                as={Col}
                md="5"
                controlId="validationFormikProvince"
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Province
                </Form.Label>
                <Dropdown onSelect={handleDropdownProvince}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-input"
                    style={{
                      width: "92%",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    {selectedProvince ? selectedProvince : "Select a Province"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    <Dropdown.Item eventKey="Western">
                      Western Province
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Northern">
                      Northern Province
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="North Western">
                      North Western Province
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="North Central">
                      North Central Province
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Central">
                      Central Province
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Sabaragamuwa">
                      Sabaragamuwa Province
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Eastern">
                      Eastern Province
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Uva">Uva Province</Dropdown.Item>
                    <Dropdown.Item eventKey="Southern">
                      Southern Province
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikAge">
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
                controlId="validationFormikPhone"
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
                    type="text"
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

              <Form.Group as={Col} md="5" controlId="validationFormikPhoto">
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

              <Form.Group
                style={{ marginLeft: "10%", width: "45%" }}
                as={Col}
                md="5"
                controlId="validationFormikUsername"
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  User Role
                </Form.Label>
                <Dropdown onSelect={handleDropdownUser}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-input"
                    style={{
                      width: "92%",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    {selectedUser ? selectedUser : "Select a User role"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "80%" }}>
                    <Dropdown.Item eventKey="member">Member</Dropdown.Item>
                    <Dropdown.Item eventKey="member">Moderator</Dropdown.Item>
                    <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Row>

            <br />
            <Button
              className="submitBTN"
              variant="outline-success"
              type="submit"
            >
              Update
            </Button>
            <Button
              style={{ marginLeft: "30px" }}
              className="submitBTN"
              variant="outline-danger"
              onClick={() => setModalDeleteShow(true)}
            >
              Delete
            </Button>
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
