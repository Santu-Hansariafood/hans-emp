import React, { useEffect, useState } from "react";
import data from "../../../data/data.json"

const GodownList = ({ userRole }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Check if the user has the appropriate role
    if (userRole === "manager" || userRole === "backoffice") {
      setCollections(data);
    }
  }, [userRole]);

  if (userRole !== "manager" && userRole !== "backoffice") {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <div className="container mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Godown List
      </h2>
      {collections.length > 0 ? (
        <ul>
          {collections.map((collection, index) => (
            <li key={index} className="mb-4 p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold">{collection.name}</h3>
              <p>Address: {collection.address}</p>
              <p>A: {collection.a}</p>
              <p>B: {collection.b}</p>
              <p>C: {collection.c}</p>
              <p>D: {collection.d}</p>
              <p>E: {collection.e}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No collections available.</div>
      )}
    </div>
  );
};

export default GodownList;
