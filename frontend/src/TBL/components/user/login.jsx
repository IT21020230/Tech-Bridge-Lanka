import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useLogin } from '../../hooks/useLogin';
import * as formik from "formik";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";

import { BiTrash } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";

function Login() {

  const { login, error, isLoading } = useLogin();

  const [fields, setFields] = useState([{ value: "" }]);

  const handleInputChange = (index, event) => {
    const values = [...fields];
    values[index].value = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    const values = [...fields];
    values.push({ value: "" });
    setFields(values);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleSubmit = async (e, values) => {
    e.preventDefault()

    await login(values.email, values.password)
  };

  const { Formik } = formik;

  const schema = yup.object().shape({

    email: yup
    .string()
    .required("Please enter an Email!")
    .email("Please enter a valid Email!"),

    password: yup
      .string()
      .required("Please enter a Password!")
    });

  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginLeft: "35%",
        marginRight: "35%",
        marginBottom: "17px",
        padding: "50px",
      }}
    >
      <div>
        <h1 style={{textAlign: "center"}} className="head">Login</h1>
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
              
              <Form.Group as={Col} md="12" controlId="validationFormikUsername">
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
              <Form.Group as={Col} md="12" controlId="validationFormikUsername">
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
<br/>
            <Button disabled={isLoading} className="submitBTN" type="submit" variant="outline-primary">
              Login
            </Button>
            {error && <div className='error'>{error}</div>}
          </Form>
        )}
      </Formik>

    </div>
  );
}

export default Login;
