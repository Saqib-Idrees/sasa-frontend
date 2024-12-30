import React, { useState } from "react";

const ComponentDesignList = ({ componentDesigns, onSelectionChange }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleChange = (design) => {
    setSelectedId(design.id); // Update the selected state
    onSelectionChange(design); // Notify the parent about the selection
  };

  return (
    <div className=" flex items-start gap-6">
      {componentDesigns.map((design) => (
        <div
          key={design.id}
          className={`flex items-center py-6 px-8  border rounded-lg cursor-pointer transition ${
            selectedId === design.id
              ? "bg-black text-white border-black"
              : "bg-[#F4F4F4] text-gray-900 border-gray-200"
          }`}
          onClick={() => handleChange(design)}
        >
          {/* Hidden radio input */}
          <input
            id={`bordered-radio-${design.id}`}
            type="radio"
            name="bordered-radio"
            className="hidden"
            checked={selectedId === design.id}
            onChange={() => handleChange(design)}
          />
          <label
            htmlFor={`bordered-radio-${design.id}`}
            className="w-full ms-2 text-sm font-medium"
          >
            {design.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ComponentDesignList;
