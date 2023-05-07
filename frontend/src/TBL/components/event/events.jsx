import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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


function Events() {

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
          <h1 className="head">Events</h1>
        </div>

        <Card style={{ width: '30rem' }}>
        <Card.Title style={{ textAlign: 'center' }}>Event 01</Card.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
      <img src="https://pikwizard.com/pw/medium/bfbe02a0bb975704bf4d1f1ab62a32a8.avif" />
      </div>
      <Card.Body>
        
        <Card.Text>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        </Card.Text>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="primary">Participate</Button>
        </div>
      </Card.Body>
    </Card>
        
        <UpdateModal
          show={modalUpdateShow}
          onHide={() => setModalUpdateShow(false)}
        />
  
  
      </div>
    );
}

export default Events;
