import React, { useEffect, useState } from "react";
import axios from "axios";

function DistrictData() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ddd-data/districts-data")
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {districts.map((district) => (
        <div key={district._id}>
          <h3>{district.district}</h3>
          <progress value={district.count / district.population} max="1" />
          <p>
            {district.count} members are inside empowered community out of {district.population} population
          </p>
        </div>
      ))}
    </div>
  );
}

export default DistrictData;
