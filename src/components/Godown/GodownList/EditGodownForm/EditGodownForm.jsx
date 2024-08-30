import React from "react";

const EditGodownForm = ({
  editMode,
  newGodownMode,
  rateEditId,
  qualityEditMode,
  currentGodown,
  setCurrentGodown,
  handleSave,
  handleRateChange,
  handleQualityChange,
  setEditMode,
  setNewGodownMode,
  setRateEditId,
  setQualityEditMode,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-bold mb-4">
        {editMode
          ? "Edit Godown"
          : newGodownMode
          ? "Add New Godown"
          : rateEditId
          ? "Edit Rate"
          : "Edit Quality Parameters"}
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
              <label className="block mb-1 font-medium">Location Name:</label>
              <input
                type="text"
                value={currentGodown.location.name}
                onChange={(e) =>
                  setCurrentGodown({
                    ...currentGodown,
                    location: { ...currentGodown.location, name: e.target.value },
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
            <div>
              <label className="block mb-1 font-medium">Rate:</label>
              <input
                type="number"
                value={currentGodown.rate}
                onChange={(e) =>
                  setCurrentGodown({ ...currentGodown, rate: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        )}
        {qualityEditMode && (
          <div>
            <label className="block mb-1 font-medium">Quality Parameters:</label>
            {currentGodown.quality?.map((q, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="text"
                  value={q.parameter}
                  onChange={(e) =>
                    handleQualityChange(index, "parameter", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Parameter"
                />
                <input
                  type="text"
                  value={q.accepted}
                  onChange={(e) =>
                    handleQualityChange(index, "accepted", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Accepted"
                />
                <input
                  type="text"
                  value={q.upto}
                  onChange={(e) =>
                    handleQualityChange(index, "upto", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Upto"
                />
                <input
                  type="text"
                  value={q.claim}
                  onChange={(e) =>
                    handleQualityChange(index, "claim", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Claim"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={() => {
            setEditMode(false);
            setNewGodownMode(false);
            setRateEditId(null);
            setQualityEditMode(false);
            setCurrentGodown(null);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditGodownForm;
