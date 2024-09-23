import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationTracker = ({ employeeId }) => {
  const [locationData, setLocationData] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [error, setError] = useState(null);

  const handleLocationUpdate = async (latitude, longitude) => {
    const lastUpdate = localStorage.getItem("lastLocationUpdate");
    const currentTime = new Date().getTime();

    if (!lastUpdate || currentTime - lastUpdate >= 24 * 60 * 60 * 1000) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_API_KEY`
        );

        if (response.data.status === "OK") {
          const locationName =
            response.data.results[0]?.formatted_address || "Unknown location";
          setLocationName(locationName);

          const postData = {
            employeeId,
            lat: latitude,
            lng: longitude,
            locationName,
          };

          console.log("Sending data to server:", postData);

          const serverResponse = await axios.post(
            "https://main-server-2kc5.onrender.com/api/location-track/track-location",
            postData
          );

          console.log("Location data sent to server:", serverResponse.data);

          localStorage.setItem("lastLocationUpdate", currentTime);
        } else {
          console.error("Geocoding API error:", response.data.error_message);
          setError("Unable to retrieve location name");
        }
      } catch (error) {
        console.error("Error sending location data:", error.message);
        setError("Failed to update location data.");
      }
    } else {
      console.log("Location update skipped (less than 24 hours)");
    }
  };

  useEffect(() => {
    const trackLocation = () => {
      if (navigator.geolocation) {
        const watcher = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocationData({ latitude, longitude });

            handleLocationUpdate(latitude, longitude);
          },
          (error) => {
            console.error("Error fetching location:", error.message);
            setError("Failed to fetch location");
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(watcher);
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    trackLocation();
  }, [employeeId]);

  return (
    <div>
      <h2>Location Tracker</h2>
      {error && <p className="error-message">{error}</p>} {/* Display errors */}
      {locationData ? (
        <p>
          Current Location: Latitude {locationData.latitude}, Longitude{" "}
          {locationData.longitude}
          {locationName && <span>, Location: {locationName}</span>}
        </p>
      ) : (
        <p>Fetching location data...</p>
      )}
    </div>
  );
};

export default LocationTracker;
