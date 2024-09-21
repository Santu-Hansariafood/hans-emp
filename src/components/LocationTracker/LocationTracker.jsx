import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationTracker = ({ employeeId }) => {
  const [locationData, setLocationData] = useState(null);

  // Function to handle location updates
  const handleLocationUpdate = async (latitude, longitude) => {
    const lastUpdate = localStorage.getItem("lastLocationUpdate");
    const currentTime = new Date().getTime();
    
    // Check if 24 hours have passed since the last update
    if (!lastUpdate || currentTime - lastUpdate >= 24 * 60 * 60 * 1000) {
      try {
        await axios.post("https://main-server-2kc5.onrender.com/api/location-track/track-location", {
          employeeId, // include employeeId
          lat: latitude,
          lng: longitude
        });
        console.log("Location data sent to server");
        
        // Update the last update timestamp
        localStorage.setItem("lastLocationUpdate", currentTime);
      } catch (error) {
        console.error("Error sending location data:", error);
      }
    } else {
      console.log("Location update skipped (less than 24 hours)");
    }
  };

  useEffect(() => {
    const trackLocation = () => {
      if (navigator.geolocation) {
        // Watch for continuous position changes
        const watcher = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocationData({ latitude, longitude });
            
            handleLocationUpdate(latitude, longitude); // Handle location updates
          },
          (error) => {
            console.error("Error fetching location:", error);
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        // Cleanup watcher on component unmount
        return () => navigator.geolocation.clearWatch(watcher);
      }
    };

    trackLocation();
  }, [employeeId]);

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
