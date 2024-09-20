import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationTracker = () => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocationData({ latitude, longitude });
            axios.post("https://main-server-2kc5.onrender.com/api/location-track/track-location", { latitude, longitude })
              .then(response => console.log("Location data sent to server:", response))
              .catch(error => console.error("Error sending location data:", error));
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      }
    };

    trackLocation();
  }, []);

  return (
    <div>
      <h2>Location Tracker</h2>
      {locationData ? (
        <p>Current Location: Latitude {locationData.latitude}, Longitude {locationData.longitude}</p>
      ) : (
        <p>Fetching location data...</p>
      )}
    </div>
  );
};

export default LocationTracker;