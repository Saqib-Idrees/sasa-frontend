import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../../slices/customerSlice"; // Update the path as per your file structure
import { Input, Button, IconButton } from "@material-tailwind/react";
import { useGetCustomerByEmailQuery } from "../../slices/customerAPI";
import Swal from "sweetalert2";
const CustomerDetails = ({ onCustomerUpdate }) => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.data);
  const [emailInput, setEmailInput] = useState("");
  const [emailToSearch, setEmailToSearch] = useState("");

  const [formData, setFormData] = useState({
    customer_id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  // Fetch customer data using RTK Query
  const {
    data: fetchedCustomerData,
    error: fetchedCustomerError,
    isLoading: fetchedCustomerIsLoading,
    isError: fetchedCustomerIsError,
    isFetching: fetchedCustomerIsFetching,
    refetch,
  } = useGetCustomerByEmailQuery(emailToSearch, {
    skip: !emailToSearch, // Skip query if emailInput is empty
  });
  useEffect(() => {
    if (fetchedCustomerData) {
      // Dispatch to the Redux store
      dispatch(setCustomer(fetchedCustomerData));
      setFormData({
        customer_id: fetchedCustomerData.customer_id || "",
        firstname: fetchedCustomerData.firstname || "",
        lastname: fetchedCustomerData.lastname || "",
        email: fetchedCustomerData.email || "",
        phone: fetchedCustomerData.phone || "",
      });
      if (onCustomerUpdate) {
        onCustomerUpdate(fetchedCustomerData);
      }
    }
  }, [fetchedCustomerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    dispatch(setCustomer({ ...updatedFormData }));
    onCustomerUpdate({ ...updatedFormData });
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleLookUp = () => {
    if (emailInput) {
      setEmailToSearch(emailInput);
      refetch();
    }
  };

  useEffect(() => {
    console.log(fetchedCustomerError, fetchedCustomerIsError);
    if (fetchedCustomerIsError) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: fetchedCustomerError?.message || "Customer not found!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [fetchedCustomerIsError, fetchedCustomerError]);

  return (
    <div className="customer-details">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-6">
        <div className="col-span-3">
          <div className="relative flex items-center">
            <input
              name="email"
              type="email"
              placeholder="Customer Email"
              className="w-full pl-4 pr-20 text-base px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
              value={emailInput}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="col-span-1">
          <Button
            className="bg-black text-white rounded-3xl w-full p-3"
            onClick={handleLookUp}
          >
            Look Up
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 tracking-wide">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full pl-4 pr-20 text-base px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 tracking-wide">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full pl-4 pr-20 text-base px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 tracking-wide">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full pl-4 pr-20 text-base px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 tracking-wide">
            Mobile Phone
          </label>
          <input
            name="phone"
            type="text"
            placeholder="559 355 37320"
            className="w-full pl-4 pr-20 text-base px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
