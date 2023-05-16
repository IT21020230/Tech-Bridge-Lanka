import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useLogin } from "../../hooks/useLogin";
import * as yup from "yup";
import { Formik } from "formik";

function Login() {
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (values) => {
    await login(values.email, values.password);
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter an Email!")
      .email("Please enter a valid Email!"),

    password: yup.string().required("Please enter a Password!"),
  });

  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginTop: "120px",
        marginLeft: "35%",
        marginRight: "35%",
        marginBottom: "120px",
        padding: "50px",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }} className="head">
          Login
        </h1>
      </div>
      <Formik
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="12"
                controlId="validationFormikEmail"
                style={{ width: "100%" }}
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
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="12"
                controlId="validationFormikPassword"
                style={{ width: "100%" }}
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
            </Row>
            <Button
              disabled={isLoading}
              className="submitBTN"
              type="submit"
              variant="outline-primary"
            >
              Login
            </Button>
            <br />
            <br />
            <p>
              No created account? <a href="/signup">Register</a>
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

export default Login;
