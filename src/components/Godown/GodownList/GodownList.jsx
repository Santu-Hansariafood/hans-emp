import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiEdit, CiCirclePlus } from "react-icons/ci";
import NoAccess from "../../common/NoAccess/NoAccess";

const GodownList = ({ userRole }) => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentGodown, setCurrentGodown] = useState(null);
  const [rateEditId, setRateEditId] = useState(null);
  const [newGodownMode, setNewGodownMode] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (["manager", "backoffice", "admin"].includes(userRole)) {
          const godownResponse = await axios.get(
            "https://main-server-9oo9.onrender.com/godown"
          );
          setCollections(godownResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [userRole]);

  if (!["manager", "backoffice", "admin"].includes(userRole)) {
    return <NoAccess />;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCollections = filteredCollections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleEdit = (collection) => {
    setCurrentGodown(collection);
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3000/godown/${currentGodown._id}`,
          currentGodown
        );
        const updatedCollections = collections.map((collection) =>
          collection._id === currentGodown._id ? currentGodown : collection
        );
        setCollections(updatedCollections);
      } else if (newGodownMode) {
        const response = await axios.post(
          "http://localhost:3000/godown",
          currentGodown
        );
        setCollections([...collections, response.data]);
      } else if (rateEditId) {
        await axios.put(
          `http://localhost:3000/godown/${rateEditId}`,
          { rate: currentGodown.rate }
        );
        const updatedCollections = collections.map((collection) =>
          collection._id === rateEditId ? { ...collection, rate: currentGodown.rate } : collection
        );
        setCollections(updatedCollections);
      }
      setEditMode(false);
      setNewGodownMode(false);
      setRateEditId(null);
      setCurrentGodown(null);
    } catch (error) {
      console.error("Error saving godown", error);
    }
  };

  const handleAddNew = () => {
    setCurrentGodown({
      name: "",
      location: { name: "", landmark: "", pin: "", state: "" },
      rate: 0,
    });
    setNewGodownMode(true);
  };

  const handleRateEdit = (collection) => {
    setRateEditId(collection._id);
    setCurrentGodown(collection);
  };

  const handleRateChange = (event) => {
    setCurrentGodown({ ...currentGodown, rate: event.target.value });
  };

  const handleNextPage = () => {
    if (indexOfLastItem < filteredCollections.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg pt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Godown List
      </h2>

      {(editMode || newGodownMode || rateEditId) && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">
            {editMode ? "Edit Godown" : newGodownMode ? "Add New Godown" : "Edit Rate"}
          </h3>
          <div className="space-y-4">
            {(editMode || newGodownMode) && (
              <>
                <div>
                  <label className="block mb-1 font-medium">Name:</label>
                  <input
                    type="text"
                    value={currentGodown.name}
                    onChange={(e) =>
                      setCurrentGodown({ ...currentGodown, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Location:</label>
                  <input
                    type="text"
                    value={currentGodown.location.name}
                    onChange={(e) =>
                      setCurrentGodown({
                        ...currentGodown,
                        location: {
                          ...currentGodown.location,
                          name: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Landmark:</label>
                  <input
                    type="text"
                    value={currentGodown.location.landmark}
                    onChange={(e) =>
                      setCurrentGodown({
                        ...currentGodown,
                        location: {
                          ...currentGodown.location,
                          landmark: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Pin:</label>
                  <input
                    type="text"
                    value={currentGodown.location.pin}
                    onChange={(e) =>
                      setCurrentGodown({
                        ...currentGodown,
                        location: {
                          ...currentGodown.location,
                          pin: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">State:</label>
                  <input
                    type="text"
                    value={currentGodown.location.state}
                    onChange={(e) =>
                      setCurrentGodown({
                        ...currentGodown,
                        location: {
                          ...currentGodown.location,
                          state: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block mb-1 font-medium">Rate:</label>
              <input
                type="number"
                value={currentGodown.rate}
                onChange={handleRateChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setNewGodownMode(false);
                  setRateEditId(null);
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Godown Name"
          className="w-full px-3 py-2 border rounded-lg"
        />
        {/* <button
          onClick={handleAddNew}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ml-4"
        >
          <CiCirclePlus title="Add New Godown" />
        </button> */}
      </div>
      <div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Landmark</th>
              <th className="py-2 px-4 border-b">Pin</th>
              <th className="py-2 px-4 border-b">State</th>
              <th className="py-2 px-4 border-b">Rate</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCollections.length > 0 ? (
              currentCollections.map((collection, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{collection.name}</td>
                  <td className="py-2 px-4 border-b">
                    {collection.location.name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {collection.location.landmark}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {collection.location.pin}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {collection.location.state}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {rateEditId === collection._id ? (
                      <input
                        type="number"
                        value={currentGodown.rate}
                        onChange={handleRateChange}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    ) : (
                      collection.rate
                    )}
                  </td>
                  <td className="py-2 px-4 border-b flex">
                    {["manager", "admin"].includes(userRole) && (
                      <button
                        onClick={() => handleEdit(collection)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded transition duration-300 mr-2"
                      >
                        <CiEdit title="Edit Godown" />
                      </button>
                    )}
                    {rateEditId !== collection._id && (
                      <button
                        onClick={() => handleRateEdit(collection)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded transition duration-300 ml-2"
                      >
                        <CiCirclePlus title="Edit Rate" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center">
                  No collections available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <button
            onClick={handleBack}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Back
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastItem >= filteredCollections.length}
            className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${
              indexOfLastItem >= filteredCollections.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GodownList;
