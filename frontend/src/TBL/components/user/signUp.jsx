import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useSignup } from "../../hooks/useSignup";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

function SignUp() {
  const { signup, error, isLoading } = useSignup();

<<<<<<< HEAD
  const {signup, error, isLoading} = useSignup()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

<<<<<<< HEAD
=======
>>>>>>> 1bb55f56f4ea85999c084921c1f22b4ee1e39069
  const [fields, setFields] = useState([{ value: "" }]);

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
      values.province,
      values.city,
      photo
    );

    await signup(
      values.email,
      values.password,
      values.confirmPassword,
      values.name,
      values.phone,
      values.age,
      values.province,
      values.city,
      photo
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
<<<<<<< HEAD
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, "Password should between 8 to 15 characters, and must include atleast 1 uppercase, 1 lowercase and 1 number!"),
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
      const user = await axios.post('http://localhost:8000/api/user/signup', {
        email, password, confirmPassword, name, phone, age, address, city
      }).then(() => {
        console.log('User registered successfully');
>>>>>>> feature/udesh/current-location
    
=======
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        "Password should between 8 to 15 characters, and must include atleast 1 uppercase, 1 lowercase and 1 number!"
      ),

>>>>>>> 1bb55f56f4ea85999c084921c1f22b4ee1e39069
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

    // terms: yup
    //   .bool()
    //   .required()
    //   .oneOf([true], "Terms and conditions must be accepted"),
  });

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
        <h1 className="head">User Registration</h1>
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
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>

            <Button
              disabled={isLoading}
              className="submitBTN"
              type="submit"
              variant="outline-primary"
            >
              Register
            </Button>
            <br />
            <br />
            <p>
              Already have an account? <a href="/login">Login</a>
              <br />
              <br />
            </p>
            {error && <div className="error">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;

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
