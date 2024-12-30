import React from "react";
import { FaClipboardList } from "react-icons/fa";

const AssignTailorCard = ({
  tailorName,
  orders,
  shopName,
  location,
  item,
  type,
  onSelectTailor, // Callback function to update parent state
  isSelected
}) => {
  const handleCardClick = () => {
    onSelectTailor(item.id); // Pass the selected tailor's ID to the parent
  };

  return (
    <>
      {type === "Tailor" && item.role === "Tailor" ? (
        <div
          className={`relative flex flex-col cursor-pointer rounded-xl ${
            isSelected ? "border-2 border-green-500 " : "border"
          }`}
          onClick={handleCardClick} // Trigger callback on click
        >
          <div className="p-10 bg-clip-border rounded-xl bg-white text-gray-700">
            <div className="flex mb-4">
              <div className="w-1/2">
                <h6 className="mb-0 font-bold text-black text-xl">
                  {tailorName}
                </h6>
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <div className="me-3">
                  <FaClipboardList color="#2AE286" size={18} />
                </div>
                <div className="text-sm">Orders: {orders ? orders : 0}</div>
              </div>
            </div>
            <div className="mb-5">{item.role} Agent</div>
            <div>
              <div className="text-sm mb-1">Shop name: {shopName}</div>
              <div className="text-sm">Location: {location}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AssignTailorCard;
