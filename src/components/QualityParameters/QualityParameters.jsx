import React from "react";

const QualityParameters = ({ parameters, setParameters, disabled }) => {
  const handleInputChange = (index, field, value) => {
    const newParameters = [...parameters];
    newParameters[index][field] = value;
    setParameters(newParameters);
  };

  const handleAddParameter = () => {
    setParameters([...parameters, { parameter: "", accepted: "", upto: "" }]);
  };

  const handleRemoveParameter = (index) => {
    const newParameters = parameters.filter((_, i) => i !== index);
    setParameters(newParameters);
  };

  return (
    <div className="space-y-4">
      {parameters.map((param, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Parameter</label>
            <input
              type="text"
              value={param.parameter}
              onChange={(e) =>
                handleInputChange(index, "parameter", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled={disabled}
              placeholder="Parameter"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Accepted</label>
            <input
              type="text"
              value={param.accepted}
              onChange={(e) =>
                handleInputChange(index, "accepted", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled={disabled}
              placeholder="Accepted value"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Upto</label>
            <input
              type="text"
              value={param.upto}
              onChange={(e) => handleInputChange(index, "upto", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled={disabled}
              placeholder="Upto value"
            />
          </div>
          {!disabled && (
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => handleRemoveParameter(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
      {!disabled && (
        <button
          type="button"
          onClick={handleAddParameter}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Parameter
        </button>
      )}
    </div>
  );
};

export default QualityParameters;
