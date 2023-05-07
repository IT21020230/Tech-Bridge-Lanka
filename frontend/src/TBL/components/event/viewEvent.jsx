import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

import * as formik from "formik";
import * as yup from "yup";

import { Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useSignup } from '../../hooks/useSignup';
import { BiTrash } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";

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
        <Button style={{marginRight: "20px"}} variant="success">Update</Button>
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
        <Button style={{marginRight: "20px"}} variant="danger">Delete</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ViewUser() {

  const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  const {signup, error, isLoading} = useSignup()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

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

    console.log(values.email, values.password, values.confirmPassword, values.name, values.phone, values.age, values.province, values.city)

    await signup(values.email, values.password, values.confirmPassword, values.name, values.phone, values.age, values.province, values.city)
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
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, "Password should between 8 to 15 characters, and must include atleast 1 uppercase, 1 lowercase and 1 number!"),
  
    phone: yup
      .string()
      .required("Please enter a Phone number!")
      .matches(/^[0-9]{10}$/, "Contact number must be a 10-digit number without spaces or dashes"),
    
    name: yup
      .string()
      .required("Please enter the Name!"),

    age: yup
      .string()
      .required("Please enter the Age!"),

    province: yup
      .string()
      .required("Please enter the Province!"),
      
    city: yup
      .string()
      .required("Please enter the City!")
    });

    return (
      <div
        style={{
          backgroundColor: "#E8E8E8",
          marginLeft: "200px",
          marginRight: "200px",
          marginBottom: "17px",
          padding: "50px",
        }}
      >
        <div>
          <h1 className="head">Event Details</h1>
        </div>
        <Formik
          validationSchema={schema}
          validateOnChange={false} // Disable validation on change
          validateOnBlur={true} // Enable validation on blur
          onSubmit={handleSubmit}
          initialValues={{
            name: "",
            description: "", 
            timeline: "", 
            
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationFormikUsername">               
                  <Form.Label style={{ marginTop: "20px" }}>
                    Name
                  </Form.Label>
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
                </Row>
                
                <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationFormikUsername">               
                  <Form.Label style={{ marginTop: "20px" }}>
                    Location
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      isValid={touched.location && !errors.location}
                      isInvalid={!!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.location}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                </Row>

                <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationFormikUsername">               
                  <Form.Label style={{ marginTop: "20px" }}>
                    Description
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="textarea"
                      aria-describedby="inputGroupPrepend"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                </Row>
  
                <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationFormikUsername">
                  <Form.Label
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Date
                  </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      aria-describedby="inputGroupPrepend"
                      name="startDate"
                      value={values.startDate}
                      onChange={handleChange}
                      isValid={touched.startDate && !errors.startDate}
                      isInvalid={!!errors.startDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.startDate}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                </Row>
              <div style={{marginTop: "30px"}} >
              <Button disabled={isLoading} className="submitBTN" type="submit" variant="outline-success" onClick={() => setModalUpdateShow(true)}>
                Update
              </Button>
              <Button disabled={isLoading} className="submitBTN" type="submit" variant="outline-danger" onClick={() => setModalDeleteShow(true)} style={{marginLeft: "30px"}}>
                Delete
              </Button>
              </div>
              {error && <div className='error'>{error}</div>}
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
