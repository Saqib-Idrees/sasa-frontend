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
import router, { useRouter } from "next/router";
import { useGetUserQuery } from "slices/authAPI";
import { useDispatch } from "react-redux";
import w from "@/components/Post";
import { Switch } from "@material-tailwind/react";

import { useGetAllPostsQuery } from "slices/postsAPI";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Input, Button, IconButton } from "@material-tailwind/react";
import AssignTailorCard from "@/components/cards/assignTailor";
import { useGetAllUsersQuery } from "slices/authAPI";
import { useGetAllTypesQuery } from "slices/typesApi";

import CustomerDetails from "components/Customer/Customer";
import ComponentDesignList from "@/components/cards/buttonCard";
import MeasurementsForm from "@/components/Measurement/MeasurementForm";
import { useCreateOrderMutation } from "slices/orderApi";
import Swal from "sweetalert2";
export default function Edit() {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showStep, setShowStep] = useState("step1");
  const [customerData, setCustomerData] = useState({});
  const [selectedTailorId, setSelectedTailorId] = useState(null);
  const [types, setTypes] = useState([]);
  const [typeIndex, setTypeIndex] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState({});
  const [typeComponents, setTypeComponents] = useState([]);
  const [price, setPrice] = useState(""); // State for price
  const [paid, setPaid] = useState("");
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
  const [
    createOrder,
    { isSuccess, isLoading, isError, data: loginData, error: loginError },
  ] = useCreateOrderMutation();

  const handleFabricChange = (e) => {
    const { name, value } = e.target;
    setFabricDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (optionName) => {
    setAdditionalOptions((prevState) => ({
      ...prevState,
      [optionName]: !prevState[optionName], // Toggle the current value
    }));
  };

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

  const Tailors = [
    {
      tailorName: "Ezio",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Lorenzo",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Altair",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Mario",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Madeci",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Chezare",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Salvador",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Lorenzo",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Altair",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Mario",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Madeci",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
    {
      tailorName: "Chezare",
      orders: 5,
      shopName: "Cuciture di Lusso",
      location: "Venice, Italy",
    },
  ];
  const [tailors, setTailors] = useState([]);
  const router = useRouter();
  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
    isError: usersIsError,
    isFetching: usersIsFetching,
  } = useGetAllUsersQuery("");

  useEffect(() => {
    if (typesData) {
      setTypes([...typesData]);
    }
  }, [typesData]);

  useEffect(() => {
    if (typeIndex !== null) {
      setTypeComponents([...typesData[typeIndex].typeComponents]);
    }
  }, [typeIndex]);

  useEffect(() => {
    if (usersData) {
      const users = Object.values(usersData);
      if (Array.isArray(users) && users.length > 0) {
        const tailors = users.filter((user) => user.role !== "Admin");
        setTailors([...tailors]);
      }
    }
    console.log(usersData);
    console.log(usersError);
    console.log(usersIsLoading);
    console.log(usersIsFetching);
  }, [usersData]);

  useEffect(() => {
    if (usersIsError) {
      console.log(usersIsError);
    }
  }, [usersIsError]);

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

  const onCustomerUpdate = (data) => {
    setCustomerData({ ...data });
  };

  const handleSelectTailor = (id) => {
    setSelectedTailorId(id); // Update the state with the selected tailor's ID
    console.log("Selected Tailor ID:", id); // Optional: Log the selected ID
  };

  const handleSelectionChange = (design) => {
    setSelectedDesign(design);
    console.log("Selected Design:", design);
  };

  const handleItemClick = (index) => {
    setTypeIndex(index);
    console.log("Selected Index:", index);
  };

  const handleMeasurementChange = (componentId, index, value) => {
    setTypeComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === componentId
          ? {
              ...component,
              measurement: {
                ...component.measurement,
                [index]: {
                  ...component.measurement[index],
                  value,
                },
              },
            }
          : component
      )
    );
  };

  // Handle change for Initials
  const handleInitialsChange = (e) => {
    setInitials(e.target.value);
  };

  // Handle change for Special Instructions
  const handleSpecialInstructionsChange = (e) => {
    setSpecialInstructions(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value === "" ? "" : parseFloat(e.target.value) || 0);
  };

  const handlePaidChange = (e) => {
    setPaid(e.target.value === "" ? "" : parseFloat(e.target.value) || 0);
  };

  const handleSubmit = async () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    const formattedDate = currentDate.toISOString().split("T")[0];
    const orderPayload = {
      design: types[typeIndex].type,
      agent_id: user.userdata.id,
      tailor_id: selectedTailorId,
      customer: {
        firstname: customerData.firstname,
        lastname: customerData.lastname,
        email: customerData.email,
        phone: customerData.phone,
      },
      delivery_date: formattedDate,
      fabricDetails: { ...fabricDetails },
      type_id: types[typeIndex].id,
      type: types[typeIndex].type,
      image_url: types[typeIndex].image_url,

      style_id: selectedDesign.id,
      styleName: selectedDesign.styleName,
      styleLabel: selectedDesign.label,
      styleValue: selectedDesign.value,
      styleImageUrl: selectedDesign.imageurl,
      modelNumber: selectedDesign.modelNumber,

      initials: initials,
      specialInstructions: specialInstructions,
      additionalOptions: { ...additionalOptions },
      price: price,
      paid: paid,
      orderDetails: typeComponents.map((detail) => ({
        component_id: detail.id,
        componentName: detail.componentName,
        image_url: detail.image_url,
        measurements: detail.measurement,
      })),
    };

    try {
      debugger;
      const response = await createOrder({
        orderPayload,
      }).unwrap();
      if (isError === false) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Order Created Successfully: ", response);
        debugger;
        router.push("/thankyou");
      }
    } catch (error) {
      console.error("Error Order Creation:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Layout>
        <h3 className="text-2xl mb-5">Create Order</h3>
        {showStep == "step1" && (
          <div className="order-create-step1">
            <div className="px-9 py-8">
              <div className="max-w-[550px] w-full mx-auto">
                <CustomerDetails onCustomerUpdate={onCustomerUpdate} />
                <div className="w-[100%] mt-16">
                  <Button
                    className="bg-black text-white rounded-3xl w-full p-4"
                    onClick={() => {
                      setShowStep("step2");
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showStep == "step2" && (
          <div className="order-create-step2">
            <div className="p-4">
              {/* <div className="space-y-2 justify-self-end content-center">
                <Button
                  className="py-3 px-5 font-normal normal-case text-sm mb-5"
                  onClick={() => {
                    router.push("/users/create");
                  }}
                >
                  + Create Tailor
                </Button>
              </div> */}
              <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {usersIsLoading ||
                usersIsFetching ||
                usersData === undefined ? (
                  <Spinner animation="border" variant="success" />
                ) : (
                  <>
                    {tailors.map((item, index) => {
                      return (
                        <AssignTailorCard
                          key={index}
                          type="Tailor"
                          item={item}
                          tailorName={item.firstname}
                          orders={item.orders || "10"}
                          shopName={item.shopName || "Cuciture di Lusso"}
                          location={item.location || "Venice, Italy "}
                          onSelectTailor={handleSelectTailor}
                          isSelected={selectedTailorId === item.id}
                        />
                      );
                    })}
                  </>
                )}
              </div>
              {tailors.length === 0 && (
                <div className="full-height">
                  <p className="text-center">No Tailor Found.</p>
                </div>
              )}
              <div className="">
                <div className="w-[100%] px-3 mt-16">
                  <div className="max-w-[550px] w-full mx-auto">
                    <Button
                      className="bg-black text-white rounded-3xl w-full p-4"
                      onClick={() => {
                        setShowStep("step3");
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showStep == "step3" && (
          <div className="order-create-step3">
            <div className="bg-white border rounded-3xl px-9 py-8 max-w-[1100px] w-full mx-auto">
              <div className="max-w-[400px] w-full mx-auto">
                <h4 className="font-bold text-2xl mb-12 text-center">
                  Customer Information
                </h4>

                {/* Customer Name */}
                <div className="flex justify-between items-center mt-4">
                  <h6 className="text-black text-lg font-semibold">
                    Customer Name:
                  </h6>
                  <div>{`${customerData.firstname} ${customerData.lastname}`}</div>
                </div>

                {/* Email Address */}
                <div className="flex justify-between items-center mt-4">
                  <h6 className="text-black text-lg font-semibold">
                    Email Address:
                  </h6>
                  <div>{customerData.email}</div>
                </div>

                {/* Contact Number */}
                <div className="flex justify-between items-center mt-4">
                  <h6 className="text-black text-lg font-semibold">
                    Contact Number:
                  </h6>
                  <div>{customerData.phone}</div>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
              <div className="">
                <div className="mb-10">
                  <h4 className="font-bold text-2xl mb-12 text-center">
                    Products
                  </h4>
                </div>
                {types.length === 0 ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 text-lg">No data available</p>
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-6 mb-7">
                    {types.map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer ${
                          typeIndex === index
                            ? "border-green-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleItemClick(index)}
                      >
                        <img
                          src={item.image_url}
                          alt={item.type}
                          className="w-full rounded-full h-32 object-cover"
                        />
                        <p className="font-normal text-center mt-6">
                          {item.type}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {types[typeIndex] ? (
              <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
                <div className="mb-16">
                  <h4 className="font-bold text-2xl mb-8 text-center">Style</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full">
                  <div className="space-y-16">
                    <div className="flex flex-col items-start">
                      <label className="text-base font-medium mb-8">
                        Select Styles:
                      </label>
                      <ComponentDesignList
                        componentDesigns={
                          types[typeIndex].componentDesigns || []
                        }
                        onSelectionChange={handleSelectionChange}
                      />
                    </div>

                    <div className="flex items-center">
                      <span className="text-black text-base font-medium mr-4 w-1/4">
                        Model Num:
                      </span>
                      <label className="text-base bg-[#F3F2F2] p-4 rounded-lg w-full text-center">
                        {selectedDesign.modelNumber}
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    {selectedDesign.imageurl && (
                      <img
                        src={selectedDesign.imageurl}
                        alt="Selected Design"
                        className="w-3/4 max-w-md"
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
                        Jacket Fabric#
                      </label>
                      <input
                        name="jacketFabric"
                        value={fabricDetails.jacketFabric}
                        onChange={handleFabricChange}
                        className="text-base px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Enter Jacket Fabric#"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-medium text-black mb-4">
                        Jacket Lining#
                      </label>
                      <input
                        name="jacketLining"
                        value={fabricDetails.jacketLining}
                        onChange={handleFabricChange}
                        className="text-base px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Enter Jacket Lining#"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-medium text-black mb-4">
                        Button#
                      </label>
                      <input
                        name="button"
                        value={fabricDetails.button}
                        onChange={handleFabricChange}
                        className="text-base px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Enter Button#"
                      />
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="flex flex-col">
                      <label className="text-lg font-medium text-black mb-4">
                        Vest Fabric#
                      </label>
                      <input
                        name="vestFabric"
                        value={fabricDetails.vestFabric}
                        onChange={handleFabricChange}
                        className="text-base px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Enter Vest Fabric#"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-medium text-black mb-4">
                        Vest Lining#
                      </label>
                      <input
                        name="vestLining"
                        value={fabricDetails.vestLining}
                        onChange={handleFabricChange}
                        className="text-base px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Enter Vest Lining#"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-medium text-black mb-4">
                        Trouser Fabric#
                      </label>
                      <input
                        name="trouserFabric"
                        value={fabricDetails.trouserFabric}
                        onChange={handleFabricChange}
                        className="text-base px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black"
                        type="text"
                        placeholder="Enter Trouser Fabric#"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
              <div className="mb-16">
                <h4 className="font-bold text-2xl mb-12 text-center">
                  Additional Options
                </h4>
              </div>
              <div className="grid gap-6 grid-cols-3 my-8 justify-items-center">
                {/* Sleeve Button Holes */}
                <div className="inline-flex items-center gap-12">
                  <div className="relative inline-block self-center">
                    <p>Sleeve Button Holes</p>
                  </div>
                  <div className="relative inline-block">
                    <Switch
                      id="custom-switch-component-one"
                      ripple={false}
                      checked={additionalOptions.sleeveButtonHoles}
                      onChange={() => handleSwitchChange("sleeveButtonHoles")}
                      className="h-full w-full checked:bg-[#2ec946]"
                      containerProps={{
                        className: "w-12 h-6",
                      }}
                      circleProps={{
                        className: "h-8 w-8 before:hidden border-none",
                      }}
                    />
                  </div>
                </div>

                {/* Shirt */}
                <div className="inline-flex gap-12">
                  <div className="relative inline-block self-center">
                    <p>Shirt</p>
                  </div>
                  <div className="relative inline-block">
                    <Switch
                      id="custom-switch-component-two"
                      ripple={false}
                      checked={additionalOptions.shirt}
                      onChange={() => handleSwitchChange("shirt")}
                      className="h-full w-full checked:bg-[#2ec946]"
                      containerProps={{
                        className: "w-12 h-6",
                      }}
                      circleProps={{
                        className: "h-8 w-8 before:hidden border-none",
                      }}
                    />
                  </div>
                </div>

                {/* Vest */}
                <div className="inline-flex gap-12">
                  <div className="relative inline-block self-center">
                    <p>Vest</p>
                  </div>
                  <div className="relative inline-block">
                    <Switch
                      id="custom-switch-component-three"
                      ripple={false}
                      checked={additionalOptions.vest}
                      onChange={() => handleSwitchChange("vest")}
                      className="h-full w-full checked:bg-[#2ec946]"
                      containerProps={{
                        className: "w-12 h-6",
                      }}
                      circleProps={{
                        className: "h-8 w-8 before:hidden border-none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {types[typeIndex] &&
              typeComponents.map((component) => (
                <MeasurementsForm
                  key={component.id}
                  component={component}
                  onMeasurementChange={handleMeasurementChange}
                />
              ))}
            <div className="bg-white border rounded-3xl px-9 py-8 mt-5 max-w-[1100px] w-full mx-auto">
              {/* Initials Section */}
              <div>
                <h4 className="text-black text-2xl font-semibold my-6">
                  Initials
                </h4>
                <input
                  className="text-base bg-[#EEEDED] px-3 py-2 rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Type your text here........"
                  value={initials} // Set the value from state
                  onChange={handleInitialsChange} // Update state on change
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
                  value={specialInstructions} // Set the value from state
                  onChange={handleSpecialInstructionsChange} // Update state on change
                ></textarea>
              </div>
              <div className="w-[100%] px-3 mt-16">
                <div className="max-w-[550px] w-full mx-auto">
                  <Button
                    className="bg-black text-white rounded-3xl w-full p-4"
                    onClick={() => {
                      setShowStep("step4");
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showStep == "step4" && (
          <div className="order-create-step4">
            <div className="bg-white border rounded-3xl px-9 py-8 max-w-[1100px] w-full mx-auto">
              <div className=" w-full mx-auto">
                <div className="w-full">
                  <h2 className="text-3xl">Order Details</h2>
                  <div className="grid grid-cols-1 gap-6  mt-6">
                    <div className="col-span-2 bg-white border rounded-3xl p-10">
                      <div className="grid gap-7 grid-cols-2 ">
                        <div className="space-y-2">
                          <h3 className="text-black text-lg font-semibold">
                            Customer ID &nbsp;{" "}
                            <span className="font-normal">
                              {" "}
                              #SASA-{customerData.id}{" "}
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="grid gap-7 grid-cols-3 mb-7">
                        <div className="space-y-2">
                          <p className="text-black text-base font-semibold mt-4">
                            Customer Name: &nbsp;{" "}
                            <span className="font-normal">
                              {customerData.firstname} {customerData.lastname}
                            </span>
                          </p>
                        </div>
                        <div className="space-y-2 justify-self-center">
                          <p className="text-black text-base font-semibold mt-4">
                            Product: &nbsp;{" "}
                            <span className="font-normal">
                              {types[typeIndex].type}
                            </span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-black text-base font-semibold mt-4">
                            Expected Delivery Date &nbsp;{" "}
                            <span className="font-normal"> 31/12/24</span>
                          </p>
                        </div>
                      </div>
                      <hr className="border-t-2 border-gray-300"></hr>
                      <div className="grid gap-16 grid-cols-2 mb-7">
                        <div className="space-y-5">
                          <div className="space-y-4">
                            <h4 className="text-black text-base font-semibold my-6">
                              Fabric Details:
                            </h4>
                            <div className="ml-5">
                              <span className="font-normal mr-7">
                                Jacket Fabric#{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>{fabricDetails.jacketFabric}</b>
                              </label>{" "}
                            </div>
                            <div className="ml-5">
                              <span className="font-normal mr-7">
                                Jacket Lining#{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>{fabricDetails.jacketLining}</b>
                              </label>{" "}
                            </div>
                            <div className="ml-5">
                              <span className="font-normal mr-20">
                                Vest Fabric#{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>{fabricDetails.vestFabric}</b>
                              </label>{" "}
                            </div>
                            <div className="ml-5">
                              <span className="font-normal mr-20">
                                Vest Lining#{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>{fabricDetails.vestLining}</b>
                              </label>{" "}
                            </div>
                            <div className="ml-5">
                              <span className="font-normal mr-20">
                                Trouser Fabric#{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>{fabricDetails.trouserFabric}</b>
                              </label>{" "}
                            </div>
                            <div className="ml-5">
                              <span className="font-normal mr-20">
                                Button#{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>{fabricDetails.button}</b>
                              </label>{" "}
                            </div>
                          </div>
                          {typeComponents.map((component) => (
                            <div className="space-y-4" key={component.id}>
                              <h4 className="text-black text-base font-semibold my-6">
                                {component.componentName} Measurements
                              </h4>

                              <div>
                                {/* Loop through each measurement inside the component */}
                                {Object.values(component.measurement).map(
                                  (measurement, index) => (
                                    <div
                                      key={index}
                                      className="ml-5 flex items-center justify-between mb-4"
                                    >
                                      <span className="font-normal">
                                        {measurement.label}
                                      </span>
                                      <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl">
                                        <b>
                                          {measurement.value
                                            ? `${measurement.value} cm`
                                            : "N/A"}
                                        </b>
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="space-y-4">
                            <h4 className="text-black text-base font-semibold my-6">
                              Additional Options
                            </h4>
                            <div className="ml-5">
                              <span className="font-normal mr-7">
                                Sleeves Button Holes{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>
                                  {additionalOptions?.sleeveButtonHoles
                                    ? "Yes"
                                    : "No"}
                                </b>
                              </label>
                            </div>
                            <div className="ml-5">
                              <span className="font-normal mr-7">
                                Initials{" "}
                              </span>
                              <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                                <b>{initials ? initials : "N/A"}</b>
                              </label>
                            </div>
                          </div>
                          <div className="mt-10">
                            <img src={selectedDesign.imageurl} />
                            <h3 className="text-black text-lg font-semibold mt-10 text-center">
                              Model Num: &nbsp;{" "}
                              <span className="font-normal">
                                {" "}
                                {selectedDesign.modelNumber}
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-[550px] mt-10 mx-auto">
                  <div className="">
                    <Button
                      className="bg-black text-white rounded-3xl w-full p-4"
                      onClick={() => {
                        setShowStep("step5");
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showStep == "step5" && (
          <div className="order-create-step4">
            <div className="bg-white border rounded-3xl px-9 py-8 max-w-[1100px] w-full mx-auto">
              <div className="w-full mx-auto">
                <div className="grid grid-cols-3 gap-9  mt-6">
                  <div className="col-span-2">
                    <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
                      <div className="mb-16">
                        <h4 className="font-bold text-2xl mb-12">Shipping</h4>
                      </div>
                      <div className="grid gap-6 grid-cols-2 my-8 justify-items-center">
                        <div className="inline-flex items-center gap-12">
                          <div className="relative inline-block self-center">
                            <p className="text-xl">Standard</p>
                          </div>
                          <div className="relative inline-block">
                            <Switch
                              id="custom-switch-component-one"
                              ripple={false}
                              className="h-full w-full checked:bg-[#2EC946]"
                              containerProps={{
                                className: "w-12 h-6",
                              }}
                              circleProps={{
                                className: "h-8 w-8 before:hidden border-none",
                              }}
                            />
                          </div>
                        </div>
                        <div className="inline-flex gap-12">
                          <div className="relative inline-block self-center">
                            <p className="text-xl">Express</p>
                          </div>
                          <div className="relative inline-block">
                            <Switch
                              id="custom-switch-component-two"
                              ripple={false}
                              className="h-full w-full checked:bg-[#2EC946]"
                              containerProps={{
                                className: "w-12 h-6",
                              }}
                              circleProps={{
                                className: "h-8 w-8 before:hidden border-none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
                      <div className="mb-16">
                        <h4 className="font-bold text-2xl mb-12">Payment</h4>
                      </div>
                      <div className="my-8">
                        <div className="space-y-4">
                          <div className="flex items-center pb-4">
                            <label className="font-normal w-1/3">
                              {"Price ($):"}
                            </label>
                            <input
                              className="text-base text-center  px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black w-2/3"
                              type="text"
                              value={price}
                              onChange={handlePriceChange}
                            />
                          </div>
                          <div className="flex items-center pb-4">
                            <label className="font-normal w-1/3">
                              {"Paid ($):"}
                            </label>
                            <input
                              className="text-base text-center  px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black w-2/3"
                              type="text"
                              value={paid}
                              onChange={handlePaidChange}
                            />
                          </div>
                          <hr />
                          <div className="flex items-center pb-4">
                            <label className="font-normal w-1/3">
                              {"Balance ($):"}
                            </label>
                            <input
                              className="text-base text-center px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:border-black w-2/3"
                              type="text"
                              value={price - paid}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="bg-white border mt-5">
                      <div className="mb-4">
                        <h4 className="font-bold text-2xl text-center p-4 bg-black text-white">
                          Order Summary
                        </h4>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center pb-2">
                            <label className="font-normal w-1/3">
                              {"Price:"}
                            </label>
                            <p className="text-base text-center px-4 py-3 w-2/3">
                              ${price}
                            </p>
                          </div>
                          <div className="flex items-center pb-2">
                            <label className="font-normal w-1/3">
                              {"Paid:"}
                            </label>
                            <p className="text-base text-center px-4 py-3 w-2/3">
                              ${paid}
                            </p>
                          </div>
                          <div className="flex items-center pb-2">
                            <label className="font-normal w-1/3">
                              {"Balance:"}
                            </label>
                            <p className="text-base text-center px-4 py-3 w-2/3">
                              ${price - paid}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] px-3 mt-10">
                      <div className="max-w-[550px] w-full mx-auto">
                        <Button
                          className="bg-black text-white rounded-3xl w-full p-4"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Confirm Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
