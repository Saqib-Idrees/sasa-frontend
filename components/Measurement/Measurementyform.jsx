import React from 'react';

const MeasurementForm = ({ title, measurements, imageSrc, modelNumber }) => {
  return (
    <div className="bg-white border rounded-3xl px-10 py-8 mt-5 max-w-[1100px] mx-auto">
      <h4 className="font-bold text-2xl mb-10 text-center">{title}</h4>
      <div className="flex flex-col md:flex-row justify-between gap-32">
        {/* Left: Measurements */}
        <div className="flex-1 space-y-4">
          {measurements.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-base font-medium w-1/2">{index + 1}. {item.label}</span>
              <div className="bg-gray-200 rounded-full py-1 font-bold text-sm w-2/6 text-center">
                {item.value} cm
              </div>
            </div>
          ))}
        </div>

        {/* Right: Image + Model Number */}
        <div className="flex flex-col items-center">
          <img src={imageSrc} alt="Measurement diagram" className="w-[250px] p-2 rounded" />
          <p className="mt-2 font-semibold">Model Num: <span className="font-normal">{modelNumber}</span></p>
        </div>
      </div>
    </div>
  );
};

export default MeasurementForm;
