import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import "./index.css";
import { BiTrash } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";
function FormExample() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    communityName: yup.string().required("Community name required"),
    Location: yup
      .string()
      .required("Location required")
      .matches(/^[A-Za-z ]*$/, "Location must contain only letters"),
    email: yup
      .string()
      .required("Email required")
      .email("Invalid email format"),

    date: yup
      .date()
      .required("Location is required")

      .max(new Date(), "Date cannot be in the future"),
    logo: yup.mixed().required("Please select a file"),

    contactNumber: yup
      .string()
      .required("contact number required")
      .matches(
        /^[0-9]{10}$/,
        "Contact number must be a 10-digit number without spaces or dashes"
      ),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
    communitySize: yup.string().required("Community size is required"),
  });
  const communitySizeOptions = [
    { value: "small", label: "Small (0-20)" },
    { value: "medium", label: "Medium (0-50)" },
    { value: "large", label: "Large(0-100)" },
  ];
  return (
    <div
      style={{
        backgroundColor: "#E8E8E8",
        marginLeft: "200px",
        marginRight: "200px",

        padding: "50px",
      }}
    >
      <div>
        <h1 className="head">Community Registration</h1>
      </div>
      <Formik
        validationSchema={schema}
        validateOnChange={false} // Disable validation on change
        validateOnBlur={true} // Enable validation on blur
        onSubmit={console.log}
        initialValues={{
          communityName: "",
          Location: "",
          email: "",
          contactNumber: "",
          state: "",
          zip: "",
          communitySize: "",
          terms: false,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label style={{ marginTop: "20px" }}>
                  Community Name
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="communityName"
                    value={values.communityName}
                    onChange={handleChange}
                    isValid={touched.communityName && !errors.communityName}
                    isInvalid={!!errors.communityName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.communityName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Location
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="Location"
                    value={values.Location}
                    onChange={handleChange}
                    isValid={touched.Location && !errors.Location}
                    isInvalid={!!errors.Location}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Location}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Contact Number
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="contactNumber"
                    value={values.contactNumber}
                    onChange={handleChange}
                    isValid={touched.contactNumber && !errors.contactNumber}
                    isInvalid={!!errors.contactNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contactNumber}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Email
                </Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
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
                  Started date
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    aria-describedby="inputGroupPrepend"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    isValid={touched.date && !errors.date}
                    isInvalid={!!errors.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormikCommunitySize"
              >
                <Form.Label
                  style={{
                    marginTop: "60px",
                  }}
                >
                  Community Size
                </Form.Label>
                <Field
                  as={Form.Control}
                  name="communitySize"
                  component="select"
                  isValid={touched.communitySize && !errors.communitySize}
                  isInvalid={!!errors.communitySize}
                >
                  <option value=""></option>
                  {communitySizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="communitySize"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload community Registration File
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="registerFile"
                    value={values.registerFile}
                    onChange={handleChange}
                    isValid={touched.registerFile && !errors.registerFile}
                    isInvalid={!!errors.registerFile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.registerFile}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload community Logo
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="logo"
                    value={values.logo}
                    onChange={handleChange}
                    isValid={touched.logo && !errors.logo}
                    isInvalid={!!errors.logo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.logo}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                <Form.Label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Upload community page cover photo
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="file"
                    aria-describedby="inputGroupPrepend"
                    name="logo"
                    value={values.logo}
                    onChange={handleChange}
                    isValid={touched.logo && !errors.logo}
                    isInvalid={!!errors.logo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.logo}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Label
                style={{
                  marginTop: "20px",
                }}
              >
                Community Rules
              </Form.Label>
              {fields.map((field, index) => (
                <Form.Group
                  key={index}
                  as={Col}
                  md="10"
                  controlId="validationFormikCommunitySize"
                  className="ruleContainer"
                >
                  <Form.Control
                    as="textarea"
                    md="5"
                    value={field.value}
                    onChange={(event) => handleInputChange(index, event)}
                    required
                    className="ruleArea"
                  />
                  {index === fields.length - 1 && (
                    <Button onClick={handleAddField} className="btn2">
                      <IoAddSharp />
                    </Button>
                  )}
                  {index > 0 && (
                    <Button
                      onClick={() => handleRemoveField(index)}
                      className="btn"
                    >
                      <BiTrash />
                    </Button>
                  )}
                </Form.Group>
              ))}
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
            <Button className="submitBTN" type="submit">
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormExample;
