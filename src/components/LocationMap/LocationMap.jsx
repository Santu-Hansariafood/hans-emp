
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const LocationMap = ({ employeeId }) => {
  const [locations, setLocations] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (employeeId) {
      fetchLocationData();
    }
  }, [employeeId]);

  const fetchLocationData = async () => {
    try {
      const response = await axios.get(`https://main-server-2kc5.onrender.com/api/location/${employeeId}`, {
        headers: {
          "X-RapidAPI-Key": "cdbafd3690msh5b1831cfe874765p121f44jsnb5a6f103870f",
          "X-RapidAPI-Host": "your-rapidapi-host",
        },
      });
      setLocations(response.data.data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        locations.length > 0
          ? { lat: locations[0].coordinates.lat, lng: locations[0].coordinates.lng }
          : { lat: 0, lng: 0 }
      }
      zoom={10}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
          }}
          label={new Date(location.timestamp).toLocaleString()} // Show timestamp as label
        />
      ))}
    </GoogleMap>
  );
};

export default LocationMap;