import Button from "react-bootstrap/Button";
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

function Projects() {

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


  return (
    <div
      style={{
        backgroundColor: "#b0dae9",
        marginBottom: "17px",
        marginLeft: "20%",
        marginRight: "15%",
        padding: "50px",
        width: "60%",
      }}
    >
      <div>
        <h1 className="head">Projects</h1>
      </div>
      <br/>

      <Card style={{ marginLeft: "10%", backgroundColor: "#89c7dd", width: '80%' }}><br/>
        <Card.Title style={{ textAlign: 'center' }}><h4><b>Project 01</b></h4><h6>Leo Club of SLIIT</h6></Card.Title>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
      <Image src="https://5.imimg.com/data5/SELLER/Default/2022/1/QC/YU/AX/82368182/computer-lab-jb-028-500x500.jpg" style={{height: "250px", width: "400px"}}/>
      </div>
      <Card.Body>
        
        <Card.Text>
        Lorem ipsum dolor sit amet. Vel doloribus reiciendis 33 ipsum aliquam est commodi distinctio qui quia ipsam qui culpa alias? Et soluta laboriosam hic omnis tempore rem ipsam placeat. Sed maxime temporibus ex perferendis iusto vel quam temporibus eum accusamus aperiam ut quae galisum eos molestias maxime. Aut obcaecati sequi hic Quis alias ut repudiandae nihil et aliquid dolores sed voluptas officiis nam sint ipsam.

Ut magni omnis eos odio amet sit labore quam ut enim explicabo ut rerum dolores. Sit aliquid inventore sit laboriosam possimus in autem galisum non ipsam voluptas rem sunt sapiente ad suscipit ipsum et esse saepe. Sed quos similique quo sapiente praesentium et perferendis enim et dolorem deleniti aut dolorum illum. Qui numquam ullam qui iusto quasi hic voluptate repellendus nam rerum ullam ut esse odio ut omnis autem est obcaecati quod.

Et tempore laboriosam rem modi soluta sed ullam saepe et corporis placeat. Aut magni repellendus cum quis laudantium et facilis animi et aliquid laboriosam hic consequatur laudantium ad quae nihil et consectetur consequatur.
<br/><br/>Start Date: 13.06.2023<br/>End Date: 10.08.2023</Card.Text>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="success">Contribute</Button>
        </div>
      </Card.Body>
    </Card>
<br /><br/>
    <Card style={{ marginLeft: "10%", backgroundColor: "#89c7dd", width: '80%' }}><br/>
        <Card.Title style={{ textAlign: 'center' }}><h4><b>Project 02</b></h4><h6>Leo Club of SLIIT</h6></Card.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
      <img src="https://a-z-animals.com/media/2022/04/shutterstock_1666284073.jpg" style={{height: "250px", width: "400px"}}/>
      </div>
      <Card.Body>
        
        <Card.Text>
        Lorem ipsum dolor sit amet. Vel doloribus reiciendis 33 ipsum aliquam est commodi distinctio qui quia ipsam qui culpa alias? Et soluta laboriosam hic omnis tempore rem ipsam placeat. Sed maxime temporibus ex perferendis iusto vel quam temporibus eum accusamus aperiam ut quae galisum eos molestias maxime. Aut obcaecati sequi hic Quis alias ut repudiandae nihil et aliquid dolores sed voluptas officiis nam sint ipsam.

Ut magni omnis eos odio amet sit labore quam ut enim explicabo ut rerum dolores. Sit aliquid inventore sit laboriosam possimus in autem galisum non ipsam voluptas rem sunt sapiente ad suscipit ipsum et esse saepe. Sed quos similique quo sapiente praesentium et perferendis enim et dolorem deleniti aut dolorum illum. Qui numquam ullam qui iusto quasi hic voluptate repellendus nam rerum ullam ut esse odio ut omnis autem est obcaecati quod.

Et tempore laboriosam rem modi soluta sed ullam saepe et corporis placeat. Aut magni repellendus cum quis laudantium et facilis animi et aliquid laboriosam hic consequatur laudantium ad quae nihil et consectetur consequatur.
<br/><br/>Start Date: 13.06.2023<br/>End Date: 10.08.2023</Card.Text>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="success">Contribute</Button>
        </div>
      </Card.Body>
    </Card>
    <br /><br/>
    <Card style={{ marginLeft: "10%", backgroundColor: "#89c7dd", width: '80%' }}><br/>
        <Card.Title style={{ textAlign: 'center' }}><h4><b>Project 03</b></h4><h6>Leo Club of SLIIT</h6></Card.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
      <img src="https://www.collinsdictionary.com/images/full/school_309241295.jpg" style={{height: "250px", width: "400px"}}/>
      </div>
      <Card.Body>
        
        <Card.Text>
        Lorem ipsum dolor sit amet. Vel doloribus reiciendis 33 ipsum aliquam est commodi distinctio qui quia ipsam qui culpa alias? Et soluta laboriosam hic omnis tempore rem ipsam placeat. Sed maxime temporibus ex perferendis iusto vel quam temporibus eum accusamus aperiam ut quae galisum eos molestias maxime. Aut obcaecati sequi hic Quis alias ut repudiandae nihil et aliquid dolores sed voluptas officiis nam sint ipsam.

Ut magni omnis eos odio amet sit labore quam ut enim explicabo ut rerum dolores. Sit aliquid inventore sit laboriosam possimus in autem galisum non ipsam voluptas rem sunt sapiente ad suscipit ipsum et esse saepe. Sed quos similique quo sapiente praesentium et perferendis enim et dolorem deleniti aut dolorum illum. Qui numquam ullam qui iusto quasi hic voluptate repellendus nam rerum ullam ut esse odio ut omnis autem est obcaecati quod.

Et tempore laboriosam rem modi soluta sed ullam saepe et corporis placeat. Aut magni repellendus cum quis laudantium et facilis animi et aliquid laboriosam hic consequatur laudantium ad quae nihil et consectetur consequatur.
<br/><br/>Start Date: 13.06.2023<br/>End Date: 10.08.2023</Card.Text>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="success">Contribute</Button>
        </div>
      </Card.Body>
    </Card>

      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />

    </div>
  );
}

export default Projects;
