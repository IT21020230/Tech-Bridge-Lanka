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
import { Grid, Card } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import Table from "react-bootstrap/Table";

function FormExample() {
  return (
    <div className="allP">
      <Grid container spacing={0}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="set">
            <div style={{ position: "relative" }}>
              <label
                htmlFor="myInput"
                style={{
                  fontStyle: "italic",
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none", // Ensures the label doesn't interfere with input interaction
                }}
              >
                <AiOutlineSearch /> Search Community here...
              </label>
              <input
                type="text"
                id="myInput"
                style={{
                  paddingLeft: "30px",
                  width: "220px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <Table striped="columns" style={{ marginTop: "50px" }}>
              <tbody>
                <tr>
                  <td>C01</td>
                  <td>Leo club</td>
                  <td>Malabe</td>
                  <td>
                    <button className="viewBtn">View Page</button>
                  </td>
                </tr>
                <tr>
                  <td>C02</td>
                  <td>Mozila</td>
                  <td>Kadawaha</td>
                  <td>
                    <button className="viewBtn">View Page</button>
                  </td>
                </tr>
                <tr>
                  <td>c03</td>
                  <td>LS club</td>
                  <td>Galle</td>
                  <td>
                    <button className="viewBtn">View Page</button>
                  </td>
                </tr>
                <tr>
                  <td>c04</td>
                  <td>Aisec</td>
                  <td>Kandy</td>
                  <td>
                    <button className="viewBtn">View Page</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default FormExample;
