import Head from "next/head";
// import Image from 'next/image'
import {
  selectAccess,
  selectCurrentUser,
  selectIsAuthenticated,
  selectRefresh,
  setUser,
} from "slices/authSlice";
import { useSelector } from "react-redux";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Input, Button, IconButton } from "@material-tailwind/react";
import { useGetAllUsersQuery } from "slices/authAPI";
import { useGetAllTypesQuery } from "slices/typesApi";
import { Plus } from "lucide-react";
import { Upload } from "lucide-react";
export default function Edit() {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showStep, setShowStep] = useState("step1");
  const [customerData, setCustomerData] = useState({});
  const [selectedJacketStyle, setSelectedJacketStyle] =
    useState("peak-lapel-regular");
  const [selectedPantStyle, setSelectedPantStyle] = useState("regular-pants");
  const [selectedCollarStyle, setSelectedCollarStyle] = useState("bari-slim");
  const [selectedCuffsStyle, setSelectedCuffsStyle] = useState("a-cuff");
  const jacketImages = {
    "peak-lapel-regular":
      "https://bigello.com/wp-content/uploads/2025/04/Peak-Lapel-Jacket.png",
    "regular-lapel":
      "https://bigello.com/wp-content/uploads/2025/04/Regular-Lapel-Jacket.png",
    "double-breasted-regular":
      "https://bigello.com/wp-content/uploads/2025/04/Double-breasted-Jacket.png",
    "peak-lapel-tuxedo":
      "https://bigello.com/wp-content/uploads/2025/04/Peak-Lapel-Tux.png",
    "shawl-lapel":
      "https://bigello.com/wp-content/uploads/2025/04/Shawl-Tux.png",
    "double-breasted-tuxedo":
      "https://bigello.com/wp-content/uploads/2025/04/Double-Breasted-Tux.png",
  };
  const pantImages = {
    "regular-pants":
      "https://bigello.com/wp-content/uploads/2025/04/Pants-scaled.png",
    "pants-with-pleats-and-side-buckles":
      "https://bigello.com/wp-content/uploads/2025/04/Pants-with-pleats-and-side-buckles-scaled.png",
    "pants-with-pleats":
      "https://bigello.com/wp-content/uploads/2025/04/Pants-with-pleats-scaled.png",
  };
  const collarImages = {
    "bari-slim":
      "https://bigello.com/wp-content/uploads/2025/04/Bari-Slim-copy.png",
    "como-slim":
      "https://bigello.com/wp-content/uploads/2025/04/Como-Slim-copy.png",
    "genova-slim":
      "https://bigello.com/wp-content/uploads/2025/04/Genova-Slim-copy.png",
    "napoli-regular":
      "https://bigello.com/wp-content/uploads/2025/04/Napoli-Regular-copy.png",
    "torino-regular":
      "https://bigello.com/wp-content/uploads/2025/04/Torino-copy.png",
    "varese-slim":
      "https://bigello.com/wp-content/uploads/2025/04/Varese-Slim-copy.png",
    "verona-slim":
      "https://bigello.com/wp-content/uploads/2025/04/Verona-Slim-copy.png",
  };
  const cuffsImages = {
    "a-cuff": "https://bigello.com/wp-content/uploads/2025/04/A.png",
    "b-cuff": "https://bigello.com/wp-content/uploads/2025/04/B.png",
    "c-cuff": "https://bigello.com/wp-content/uploads/2025/04/C.png",
    "d-cuff": "https://bigello.com/wp-content/uploads/2025/04/D.png",
    "e-mix": "https://bigello.com/wp-content/uploads/2025/04/E-Mix.png",
  };
  const jacketImage = jacketImages[selectedJacketStyle];
  const pantImage = pantImages[selectedPantStyle];
  const collarImage = collarImages[selectedCollarStyle];
  const cuffsImage = cuffsImages[selectedCuffsStyle];
  const [types, setTypes] = useState([]);
  const [typeIndex, setTypeIndex] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState({});
  const [typeComponents, setTypeComponents] = useState([]);
  // Create state for Initials and Special Instructions
  const [initials, setInitials] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [fabricDetails, setFabricDetails] = useState({
    jacketFabric: "",
    jacketLining: "",
    button: "",
    vestFabric: "",
    vestLining: "",
    trouserFabric: "",
  });
  const [additionalOptions, setAdditionalOptions] = useState({
    sleeveButtonHoles: false,
    shirt: false,
    vest: false,
  });
  const {
    data: typesData,
    error: typesError,
    isLoading: typesIsLoading,
    isError: typesIsError,
    isFetching: typesIsFetching,
  } = useGetAllTypesQuery([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // Displays the full weekday (e.g., "Monday")
    year: "numeric",
    month: "long", // Full month name
    day: "numeric",
  });

  useEffect(() => {
    if (typesData) {
      setTypes([...typesData]);
    }
  }, [typesData]);

  useEffect(() => {
    if (typeIndex !== null) {
      let typeComponents = [...typesData[typeIndex].typeComponents];
      if (typesData[typeIndex].additionOptions.Shirt) {
        typeComponents = typeComponents.filter(
          (component) => component.componentName !== "Shirt"
        );
      }
      if (typesData[typeIndex].additionOptions.Vest) {
        typeComponents = typeComponents.filter(
          (component) => component.componentName !== "Vest"
        );
      }
      setTypeComponents([...typeComponents]);
    }
  }, [typeIndex]);

  useEffect(() => {
    console.log(typesData);
    console.log(types);
    console.log(selectedDesign);
    console.log(customerData);
    console.log(fabricDetails);
    console.log(additionalOptions);
    console.log(typeComponents);
    console.log(initials);
    console.log(specialInstructions);
  }, [
    customerData,
    fabricDetails,
    additionalOptions,
    typesData,
    types,
    typeComponents,
    initials,
    specialInstructions,
    selectedDesign,
  ]);
  return (
    <div>
      <Layout>
        <h3 className="text-2xl mb-5">Create Order</h3>

        {/* Step 3 Static UI */}
        <div className="order-create-step3">
          {/* Customer Information */}
          <div className="bg-white border rounded-3xl px-9 py-8 max-w-[1100px] w-full mx-auto">
            <div className="max-w-[400px] w-full mx-auto">
              <h4 className="font-bold text-2xl mb-12 text-center">
                Customer Information
              </h4>

              <div className="flex justify-between items-center mt-4">
                <h6 className="text-black text-lg font-semibold">
                  Customer Name:
                </h6>
                <div>John Doe</div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <h6 className="text-black text-lg font-semibold">
                  Email Address:
                </h6>
                <div>john@example.com</div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <h6 className="text-black text-lg font-semibold">
                  Contact Number:
                </h6>
                <div>+1234567890</div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
            <div className="mb-10">
              <h4 className="font-bold text-2xl mb-12 text-center">Products</h4>
            </div>
            <div className="flex justify-center items-center h-64 gap-6">
              <div className="text-center">
                <img
                  src="https://bigello.com/wp-content/uploads/2025/04/Suit.png"
                  alt="Suit"
                  className="w-36 h-36 rounded-full object-cover object-top border-4 border-gray-400"
                />
                <p className="mt-2">Suit</p>
              </div>
              <div className="text-center">
                <img
                  src="https://bigello.com/wp-content/uploads/2025/04/Coat.png"
                  alt="Coat"
                  className="w-36 h-36 rounded-full object-cover object-top border-4 border-gray-300"
                />
                <p className="mt-2">Coat</p>
              </div>
              <div className="text-center">
                <img
                  src="https://bigello.com/wp-content/uploads/2025/04/Jacket.png"
                  alt="Jacket"
                  className="w-36 h-36 rounded-full object-cover object-top border-4 border-gray-300"
                />
                <p className="mt-2">Jacket</p>
              </div>
              <div className="text-center">
                <img
                  src="https://bigello.com/wp-content/uploads/2025/04/Trousers.png"
                  alt="Trouser"
                  className="w-36 h-36 rounded-full object-cover object-top border-4 border-gray-300"
                />
                <p className="mt-2">Trouser</p>
              </div>
              <div className="text-center">
                <img
                  src="https://bigello.com/wp-content/uploads/2025/04/Vest.png"
                  alt="Vest"
                  className="w-36 h-36 rounded-full object-cover object-top border-4 border-gray-300"
                />
                <p className="mt-2">Vest</p>
              </div>
              <div className="text-center">
                <img
                  src="https://bigello.com/wp-content/uploads/2025/04/Shirt.png"
                  alt="Shirt"
                  className="w-36 h-36 rounded-full object-cover object-top border-4 border-green-400"
                />
                <p className="mt-2">Shirt</p>
              </div>
            </div>
          </div>

          {/* Fabric Details */}
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
            <div className="mb-10">
              <h4 className="font-bold text-2xl mb-12 text-center">
                Fabric Details
              </h4>
            </div>
            <div className="max-w-[650px] w-full mx-auto">
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 my-7">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label className="text-lg font-medium text-black mb-4">
                    Shirt Fabric#
                    </label>
                    <input
                      className="text-base px-4 py-3 bg-gray-100 border rounded-lg"
                      type="text"
                      placeholder="Enter Button#"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label className="text-lg font-medium text-black mb-4">
                      Buttons#
                    </label>
                    <input
                      className="text-base px-4 py-3 bg-gray-100 border rounded-lg"
                      type="text"
                      placeholder="Enter Vest Fabric#"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SHIRT STYLE SECTION */}
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
            <div className="mb-10">
              <h4 className="font-bold text-2xl mb-12 text-center">Style</h4>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left Side: Options */}
              <div className="flex-1">
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Collar:</h4>
                  <div className="flex space-y-2 flex-row w-3/4 gap-x-5">
                    <div className="space-y-2">
                      <button
                        className={`px-4 py-2 rounded-lg text-left transition-colors ${
                          setSelectedCollarStyle === "bari-slim"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                        onClick={() => setSelectedCollarStyle("bari-slim")}
                      >
                        Bari Slim
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-left transition-colors ${
                          setSelectedCollarStyle === "como-slim"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                        onClick={() => setSelectedCollarStyle("como-slim")}
                      >
                        Como Slim
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-left transition-colors ${
                          setSelectedCollarStyle === "genova-slim"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                        onClick={() => setSelectedCollarStyle("genova-slim")}
                      >
                        Genova Slim
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-left transition-colors ${
                          setSelectedCollarStyle === "napoli-regular"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                        onClick={() => setSelectedCollarStyle("napoli-regular")}
                      >
                        Napoli Regular
                      </button>{" "}
                    </div>
                    <div className="space-y-2">
                      <button
                        className={`px-4 py-2 rounded-lg text-left transition-colors ${
                          setSelectedCollarStyle === "torino-regular"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                        onClick={() => setSelectedCollarStyle("torino-regular")}
                      >
                        Torino Regular
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-left transition-colors ${
                          setSelectedCollarStyle === "varese-slim"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                        onClick={() => setSelectedCollarStyle("varese-slim")}
                      >
                        Varese Slim
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg text-left transition-colors ${
                          setSelectedCollarStyle === "verona-slim"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-black hover:text-white"
                        }`}
                        onClick={() => setSelectedCollarStyle("verona-slim")}
                      >
                        Verona Slim
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Cuffs:</h4>
                  <div className="space-y-2 flex flex-row w-fit gap-x-3">
                    <button
                      className={`px-4 py-2 rounded-lg text-left transition-colors ${
                        setSelectedCuffsStyle === "a-cuff"
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-black hover:text-white mt-1"
                      }`}
                      onClick={() => setSelectedCuffsStyle("a-cuff")}
                    >
                      A
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-left transition-colors ${
                        setSelectedCuffsStyle === "b-cuff"
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-black hover:text-white"
                      }`}
                      onClick={() => setSelectedCuffsStyle("b-cuff")}
                    >
                      B
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-left transition-colors ${
                        setSelectedCuffsStyle === "c-cuff"
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-black hover:text-white"
                      }`}
                      onClick={() => setSelectedCuffsStyle("c-cuff")}
                    >
                      C
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-left transition-colors ${
                        setSelectedCuffsStyle === "d-cuff"
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-black hover:text-white"
                      }`}
                      onClick={() => setSelectedCuffsStyle("d-cuff")}
                    >
                      D
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-left transition-colors ${
                        setSelectedCuffsStyle === "e-mix"
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-black hover:text-white"
                      }`}
                      onClick={() => setSelectedCuffsStyle("e-mix")}
                    >
                      E-Mix
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-black-600 text-sm mb-1">Model Num:</p>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg w-3/4 text-gray-800 font-semibold">
                    224C4
                  </div>
                </div>
              </div>

              {/* Right Side: Jacket Sketch - Image changes based on selection */}
              <div className="flex-1 flex flex-col justify-center items-center gap-y-16">
                <img
                  src={collarImage}
                  alt="Collar Style"
                  className="w-96 h-auto object-contain"
                />
                <img
                  src={cuffsImage}
                  alt="Cuffs Style"
                  className="w-36 h-auto object-contain"
                />
              </div>
            </div>
          </div>
          {/* SHIRT Measurements */}
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
            <div className="mb-10">
              <h4 className="font-bold text-2xl mb-12 text-center">
                Measurements
              </h4>
            </div>
            <div className="flex flex-col md:flex-row justify-around">
              {/* Loop through each measurement inside the component */}
              <div className="space-y-4 mt-7">
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">A. Shoulder</label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">B. Chest</label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">C. Waist</label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">D. Sleeve Length</label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">E. Total Length</label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">
                    F. Neck Circumference
                  </label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">
                    G. Wrist Circumference
                  </label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
                <div className="pb-4 flex items-center">
                  <label className="font-normal w-4/6">H. Biceps</label>
                  <input
                    className="text-base px-3 py-3 bg-[#EEEDED] border rounded-lg focus:outline-none focus:border-black w-3/4 mx-2"
                    type="text"
                    value=""
                  />
                </div>
              </div>
              <div className="flex justify-center items-center mt-7">
                {/* Display image of the component */}
                <img
                  src="https://bigello.com/wp-content/uploads/2025/04/Group-1000003366.png"
                  alt=""
                  className="w-[250px]"
                />
              </div>
            </div>
          </div>
          <div className="py-8 mt-5 max-w-[1100px] w-full mx-auto">
            <div className="w-1/6">
              <Button className="bg-black text-white rounded-3xl w-full p-3 capitalize text-base flex items-center gap-2">
                <div className="bg-white text-black rounded-full p-1">
                  <Plus size={16} />
                </div>
                Add more
              </Button>
            </div>
          </div>
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
            <div className="flex items-center justify-around w-1/3 h-36">
              {/* Upload Icon Box */}
              <div className="border rounded-none p-6 ">
                <Upload className="text-black-300" size={50} />
              </div>

              {/* Choose File Button */}
              <label className="bg-red-600 text-white rounded-3xl px-8 py-3 capitalize text-base text-center cursor-pointer">
                Choose File
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="py-8 mt-5 max-w-[1100px] w-full mx-auto">
            {/* Initials Section */}
            <div>
              <h4 className="text-black text-2xl font-semibold my-6">
                Initials
              </h4>
              <input
                className="text-base bg-[#EEEDED] px-3 py-2 rounded-lg focus:outline-none"
                type="text"
                placeholder="Type your text here........"
                value=""
              />
            </div>

            {/* Special Instructions Section */}
            <div className="mt-10">
              <h4 className="text-black text-2xl font-semibold my-6">
                Special Instructions / Recorded Preferences
              </h4>
              <textarea
                rows="8"
                placeholder="Type your text here........"
                className="w-full font-light bg-[#EEEDED] border rounded-lg p-6"
                value=""
              ></textarea>
            </div>
            <div className="w-[100%] px-3 mt-16">
              <div className="max-w-[550px] w-full mx-auto">
                <Button className="bg-black text-white rounded-3xl w-full p-4">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
