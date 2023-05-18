import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useSignup } from "../../TBL/hooks/useSignup";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

function AddUser() {
  const { signup, error, isLoading } = useSignup();

  const [photo, setPhoto] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setPhoto(base64);
  };

  const handleSubmit = async (values) => {
    //e.preventDefault();

    console.log(
      values.email,
      values.password,
      values.confirmPassword,
      values.name,
      values.phone,
      values.age,
      selectedProvince,
      selectedDistrict,
      photo,
      selectedUser
    );

    await signup(
      values.email,
      values.password,
      values.confirmPassword,
      values.name,
      values.phone,
      values.age,
      selectedProvince,
      selectedDistrict,
      photo,
      selectedUser
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
        /^\d{11}$/,
        "Contact number must be a 11-digit number with country code!"
      ),

    name: yup.string().required("Please enter the Name!"),

    age: yup.string().required("Please enter the Age!"),

    //province: yup.string().required("Please enter the Province!"),

    //city: yup.string().required("Please enter the City!"),

    // terms: yup
    //   .bool()
    //   .required()
    //   .oneOf([true], "Terms and conditions must be accepted"),
  });

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

  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginTop: "20px",
        marginLeft: "13%",
        marginRight: "13%",
        marginBottom: "20px",
        padding: "50px",
      }}
    >
      <div>
        <h1 className="head">Create a User</h1>
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
              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "45%" }}
              >
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
                style={{ marginLeft: "5%", width: "45%" }}
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

              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "45%" }}
              >
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
                style={{ marginLeft: "5%", width: "45%" }}
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

              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "45%" }}
              >
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
                style={{ marginLeft: "5%", width: "45%" }}
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

              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
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
                      width: "100%",
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

              <Form.Group
                style={{ marginLeft: "5%", width: "45%" }}
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
                <Dropdown onSelect={handleDropdownProvince}>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-input"
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    {selectedProvince ? selectedProvince : "Select a Province"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
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

              <Form.Group
                as={Col}
                md="5"
                controlId="validationFormikUsername"
                style={{ width: "45%" }}
              >
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload a Profile Photo
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
              {/* User Roles */}
              <Form.Group
                style={{ marginLeft: "5%", width: "45%" }}
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
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                    }}
                  >
                    {selectedUser ? selectedUser : "Select a User role"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ width: "100%" }}>
                    <Dropdown.Item eventKey="member">Member</Dropdown.Item>
                    <Dropdown.Item eventKey="member">Moderator</Dropdown.Item>
                    <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Row>

            <Button
              disabled={isLoading}
              className="submitBTN"
              type="submit"
              variant="outline-primary"
            >
              Create User
            </Button>

            {error && <div className="error">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddUser;

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
