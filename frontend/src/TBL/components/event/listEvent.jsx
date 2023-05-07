import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import * as formik from "formik";
import * as yup from "yup";

import { Formik, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useSignup } from '../../hooks/useSignup';
import { BiTrash } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";

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
          <h1 className="head">Event List</h1>
        </div>
        <Table responsive>
      <thead>
        <tr>
          <th></th>
          <th key={{}}>Name</th>
          <th key={{}}>Location</th>
          <th key={{}}>Description</th>
          <th key={{}}>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>

        </tr>
        <tr>
          <td>2</td>

        </tr>
        <tr>
          <td>3</td>

        </tr>
      </tbody>
    </Table>
    
      </div>
    );
}

export default ViewUser;
