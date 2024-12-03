import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

const TailorCard = ({
  tailorName,
  orders,
  shopName,
  location,
  item,
  type,
  name,
  designation,
  sales,
}) => {
  return (
    <>
      {type === 'Tailor' && item.role === 'Tailor' ? (
        <div className="relative flex flex-col">
          <a href={`/profile/edit/${item.id}`}>
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
                {/* <div className="text-sm mb-1">Suits Tailor</div> */}
                <div className="text-sm mb-1">Shop name: {shopName}</div>
                <div className="text-sm">Location: {location}</div>
              </div>
            </div>
          </a>
        </div>
      ) : (
        ""
      )}
      {type === 'Sales' && item.role === 'Sales' ? (
        <div className="relative flex flex-col">
          <a href={`/profile/edit/${item.id}`}>
            <div className="p-10 bg-clip-border rounded-xl bg-white text-gray-700">
              <div className="mb-2">
                <h6 className="mb-0 font-bold text-black text-2xl">{item.firstname}</h6>
              </div>
              <div>
                <div className="mb-6">{item.role} Agent</div>
                <div className="w-full flex items-center">
                  <div className="me-3">
                    <BsGraphUpArrow color="#2AE286" size={22} />
                  </div>
                  <p>Sales: {sales ? sales : 0}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TailorCard;
