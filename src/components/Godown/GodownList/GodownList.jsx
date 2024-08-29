import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoAccess from "../../common/NoAccess/NoAccess";
import GodownTable from "./GodownTable/GodownTable";
import EditGodownForm from "./EditGodownForm/EditGodownForm";
import SearchAndAdd from "./SearchAndAdd/SearchAndAdd";
import Pagination from "./Pagination/Pagination";

const GodownList = ({ userRole }) => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentGodown, setCurrentGodown] = useState(null);
  const [rateEditId, setRateEditId] = useState(null);
  const [newGodownMode, setNewGodownMode] = useState(false);
  const [qualityEditMode, setQualityEditMode] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (["manager", "backoffice", "admin"].includes(userRole)) {
          const godownResponse = await axios.get(
            "https://main-server-2kc5.onrender.com/api/godowns"
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

  const handleEdit = (collection) => {
    setCurrentGodown(collection);
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(
          `https://main-server-2kc5.onrender.com/api/godowns/${currentGodown._id}`,
          currentGodown
        );
        const updatedCollections = collections.map((collection) =>
          collection._id === currentGodown._id ? currentGodown : collection
        );
        setCollections(updatedCollections);
      } else if (newGodownMode) {
        const response = await axios.post(
          "https://main-server-2kc5.onrender.com/api/godowns",
          currentGodown
        );
        setCollections([...collections, response.data]);
      } else if (rateEditId) {
        await axios.put(
          `https://main-server-2kc5.onrender.com/api/godowns/${rateEditId}`,
          { rate: currentGodown.rate }
        );
        const updatedCollections = collections.map((collection) =>
          collection._id === rateEditId
            ? { ...collection, rate: currentGodown.rate }
            : collection
        );
        setCollections(updatedCollections);
      } else if (qualityEditMode) {
        await axios.put(
          `https://main-server-2kc5.onrender.com/api/godowns/${currentGodown._id}`,
          { quality: currentGodown.quality }
        );
        const updatedCollections = collections.map((collection) =>
          collection._id === currentGodown._id ? currentGodown : collection
        );
        setCollections(updatedCollections);
      }
      setEditMode(false);
      setNewGodownMode(false);
      setRateEditId(null);
      setQualityEditMode(false);
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
      quality: [
        { parameter: "Moisture", accepted: "", upto: "", claim: "" },
        { parameter: "Broken", accepted: "", upto: "", claim: "" },
        { parameter: "F.M.", accepted: "", upto: "", claim: "" },
        { parameter: "Damage", accepted: "", upto: "", claim: "" },
        { parameter: "Small Gain", accepted: "", upto: "", claim: "" },
      ],
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

  const handleQualityEdit = (collection) => {
    setQualityEditMode(true);
    setCurrentGodown(collection);
  };

  const handleQualityChange = (index, field, value) => {
    const newQuality = [...currentGodown.quality];
    newQuality[index][field] = value;
    setCurrentGodown({ ...currentGodown, quality: newQuality });
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCollections.length / itemsPerPage)) {
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

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCollections = filteredCollections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const title = "Godown List";

  return (
    <div className="container mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg pt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        {title}
      </h2>

      {(editMode || newGodownMode || rateEditId || qualityEditMode) && (
        <EditGodownForm
          editMode={editMode}
          newGodownMode={newGodownMode}
          rateEditId={rateEditId}
          qualityEditMode={qualityEditMode}
          currentGodown={currentGodown}
          setCurrentGodown={setCurrentGodown}
          handleSave={handleSave}
          handleRateChange={handleRateChange}
          handleQualityChange={handleQualityChange}
          setEditMode={setEditMode}
          setNewGodownMode={setNewGodownMode}
          setRateEditId={setRateEditId}
          setQualityEditMode={setQualityEditMode}
        />
      )}

      <SearchAndAdd
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleAddNew={handleAddNew}
      />

      <GodownTable
        currentCollections={currentCollections}
        handleEdit={handleEdit}
        handleRateEdit={handleRateEdit}
        handleQualityEdit={handleQualityEdit}
        rateEditId={rateEditId}
        currentGodown={currentGodown}
        handleRateChange={handleRateChange}
      />

      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        filteredCollections={filteredCollections}
        itemsPerPage={itemsPerPage}
      />

      <button
        onClick={handleBack}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
};

export default GodownList;
