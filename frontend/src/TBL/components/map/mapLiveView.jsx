import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";

const OpenLayersMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/locations"
        );
        await setLocations(response.data);
        await console.log(response.data);
        await setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const sriLankaExtent = [79.5222, 5.9684, 81.9329, 9.8167];

    const vectorSource = new VectorSource({
      features: locations.map((loc) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(loc)),
        });
        return feature;
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
          scale: 0.05,
        }),
      }),
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([80.7718, 7.8731]),
        zoom: 8,
        maxZoom: 18,
      }),
    });

    const markers = locations.map((location) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(location)),
      });

      const iconStyle = new Style({
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
          scale: 0.20,
        }),
      });

      feature.setStyle(iconStyle);
      return feature;
    });

    const markerSource = new VectorSource({
      features: markers,
    });

    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    map.addLayer(markerLayer);

    return () => {
      map.setTarget(undefined);
    };
  }, [locations]);

  return <div id="map" style={{ width: "800px", height: "800px" }}></div>;
};

export default OpenLayersMap;
