import React from "react";
import * as XLSX from "xlsx";

const ExportToExcel = ({ buyers }) => {
  const handleGenerateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(buyers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
    XLSX.writeFile(workbook, "buyers.xlsx");
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      onClick={handleGenerateExcel}
    >
      Generate Excel
    </button>
  );
};

export default ExportToExcel;
