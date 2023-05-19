import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";
import { Grid, Card } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import axios from "axios";

const getFilteredItems = (query, items) => {
  if (!query) {
    return items;
  }
  const lowercaseQuery = query.toLowerCase();
  return items.filter((data) =>
    data.commName.toLowerCase().includes(lowercaseQuery)
  );
};

const direct = (id) => {
  // localStorage.setItem("orderID", id);
  window.location.href = `/community/${id}`;
};

function FormExample() {
  const [communityList, setCommunityList] = useState([]);

  const [query, setQuery] = useState("");

  const filteredItems = getFilteredItems(query, communityList);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/community/getAllCommunity")
      .then((response) => {
        setCommunityList(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="allP">
      <Grid container spacing={0}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="set">
            <div style={{ position: "relative", marginTop: "20px" }}>
              <label
                htmlFor="myInput"
                style={{
                  fontStyle: "italic",
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none", // Ensures the label doesn't interfere with input interaction
                  marginTop: "10px",
                }}
              >
                <AiOutlineSearch />
              </label>
              <input
                type="text"
                id="myInput"
                placeholder="search community here"
                style={{
                  paddingLeft: "30px",
                  width: "220px",
                  borderRadius: "50px",
                  marginTop: "20px",
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              {filteredItems.map((data) => {
                return (
                  <Grid item xs={6}>
                    <div
                      className="oneCommunity"
                      onClick={() => {
                        direct(data._id);
                      }}
                    >
                      <Link
                        to={`/community/${data._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Grid container spacing={0}>
                          <Grid item xs={3}>
                            <img
                              className="communityListImg"
                              src={require(`../createCommunity/communityLogo/${data.logo}`)}
                            />
                            {/* <img className="memberList1" src={} /> */}
                          </Grid>
                          <Grid item xs={8}>
                            <p className="oneName">{data.commName}</p>
                          </Grid>
                        </Grid>{" "}
                      </Link>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default FormExample;
