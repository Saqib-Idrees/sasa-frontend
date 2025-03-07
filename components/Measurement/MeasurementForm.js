import React from "react";

const MeasurementsForm = ({ component, onMeasurementChange }) => {
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    onMeasurementChange(component.id, index, value);
  };

  return (
    <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
      <div className="mb-10">
        <h4 className="font-bold text-2xl mb-12 text-center">{component.componentName} Measurement</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-7">
        {/* Loop through each measurement inside the component */}
        <div className="space-y-4 mt-7">
          {Object.values(component.measurement).map((measurement, index) => (
            <div key={index} className="pb-4 flex items-center">
              <label className="font-normal w-1/2">{measurement.label}</label>
              <input
                className="text-base px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black w-1/2 mx-2"
                type="text"
                value={measurement.value || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-7">
          {/* Display image of the component */}
          <img
            src={component.image_url}
            alt={component.componentName}
            className="w-[250px]"
          />
        </div>
      </div>
    </div>
  );
};

export default MeasurementsForm;
