import React, { useState } from "react";
import ReactMapboxGl, { Marker, ZoomControl } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./mapView.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

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

  const locationBounds = [
    [79.596998, 5.868369], // southwest corner of Sri Lanka
    [81.899167, 9.835298], // northeast corner of Sri Lanka
  ];

  const handleSendLocation = () => {
    const { latitude, longitude } = location;
    alert(latitude);
    alert(longitude);
    // TODO: Send location data via API
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
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleAddressSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
      <button
        onClick={handleSendLocation}
        disabled={!location.latitude || !location.longitude}
      >
        Send Location
      </button>
    </>
  );
};

export default MapView;
