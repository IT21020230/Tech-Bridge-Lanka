import React, { useState } from "react";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./mapView.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import { Grid, Card } from "@mui/material";
import "../index.css";
import { useAuthContext } from "../../hooks/useAuthContext";


const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidWRlc2gtcGl5dW1hbnRoYSIsImEiOiJjbGgzYWlsaGwxbTdnM3BwbjF6eWgwcjJkIn0.UKoFgIjjbMcxCe96eOaprg",
  maxZoom: 18,
  minZoom: 5,
});

const MapView = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [zoom, setZoom] = useState([5]);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState([null, null]);
  const { user } = useAuthContext();

  const locationBounds = [
    [79.596998, 5.868369], // southwest corner of Sri Lanka
    [81.899167, 9.835298], // northeast corner of Sri Lanka
  ];

  const handleSendLocation = async () => {
    // const { latitude, longitude } = location;
    // alert(latitude);
    // alert(longitude);

    //const userId = "646676d408d6791817b3e37d"; // replace with actual user ID
    const userId = user.userId; // replace with actual user ID
    console.log(userId);
    const { latitude, longitude } = location;

    try {
      await axios.patch(`http://localhost:7000/api/user/home-location`, {
        userId,
        latitude,
        longitude,
      });

      alert("Location data sent successfully!");
      // toast.success("Location data sent successfully!");
    } catch (error) {
      console.error(error);
      // toast.error("Failed to send location data. Please try again later.");
      alert("Failed to send location data. Please try again later.");
    }
  };

  const handleGeolocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;

    // Set the map bounds to Sri Lanka's bounding box
    const bounds = [
      [79.696998, 5.968369], // Southwest coordinates
      [81.899167, 9.835298], // Northeast coordinates
    ];

    setLocation({ latitude, longitude });
  };

  const handleMarkerDragEnd = (marker) => {
    const { lat, lng } = marker.getLngLat();
    setLocation({ latitude: lat, longitude: lng });
  };

  const handleClick = (map, event) => {
    const { lngLat } = event;
    setLocation({ latitude: lngLat.lat, longitude: lngLat.lng });
  };

  // const handleSelect = async (value) => {
  //   setAddress(value);
  //   const results = await geocodeByAddress(value);
  //   const { lat, lng } = await getLatLng(results[0]);
  //   setLocation({ latitude: lat, longitude: lng });
  // };

  const handleAddressChange = (address) => {
    setAddress(address);
  };

  const handleAddressSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setLocation({
      latitude: latLng.lat,
      longitude: latLng.lng,
    });
    setZoom([15]);
    setCenter([latLng.lng, latLng.lat]);
  };

  return (
    <main>
      <Navbar />
      <div className="content">
        <Grid container spacing={0}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div style={{}}>
              <h1>Contribute to DDD Map </h1>
              <p>
                Select your home location where you connect to the internet and
                send us. That will help people to get a visual outcome of
                Digital Divide Distribution in Sri Lanka.
              </p>
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleAddressSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="autocomplete-container">
                    <input
                      {...getInputProps({ placeholder: "Search Places..." })}
                      className="input"
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <br />
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={center}
                fitBounds={locationBounds}
                fitBoundsOptions={{ padding: 20 }}
                zoom={[zoom]}
                maxBounds={[
                  [78.588709, 5.721103], // Southwest coordinates
                  [82.881341, 9.938232], // Northeast coordinates
                ]}
                containerStyle={{
                  height: "500px",
                  width: "500px",
                }}
                onClick={handleClick}
              >
                <ZoomControl />
                <mapboxgl.GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={true}
                  onGeolocate={handleGeolocationSuccess}
                />
                {location.latitude && location.longitude && (
                  <Marker
                    draggable={true}
                    coordinates={[location.longitude, location.latitude]}
                    onDragEnd={handleMarkerDragEnd}
                  />
                )}
              </Map>
              <br />
              <button
                onClick={handleSendLocation}
                disabled={!location.latitude || !location.longitude}
              >
                Send Location
              </button>
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      <Footer />
    </main>
  );
};

export default MapView;
