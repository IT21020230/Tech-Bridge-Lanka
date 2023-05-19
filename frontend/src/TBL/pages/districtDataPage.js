import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import Sidebar from "../layout/Slidebar/Slidebar";
import { Grid, Card } from "@mui/material";
import "./index.css";

function DistrictData() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/ddd-data/districts-data")
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <Navbar />
      <div className="content">
        <Grid container spacing={0}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div style={{}}>
              <h1>Digital Divide Distribution (District vise) </h1>
              <p>Following view helps you to get an idea of DDD in Sri Lanka. 
                These calculations are based on the contributors of the site.</p>
              {districts.map((district) => (
                <div key={district._id}>
                  <h3>{district.district}</h3>
                  <progress
                    value={district.count / district.population}
                    max="1"
                  />
                  <p>
                    {district.count} members are inside empowered community out
                    of {district.population} population
                  </p>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      <Footer />
    </main>
  );
}

export default DistrictData;
