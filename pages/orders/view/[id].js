import Head from "next/head";
// import Image from 'next/image'
import React from "react";
import {
  selectAccess,
  selectCurrentUser,
  selectIsAuthenticated,
  selectRefresh,
  setUser,
} from "slices/authSlice";
import { useSelector } from "react-redux";
import { Alert, Spinner, Button } from "@material-tailwind/react";
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import router from "next/router";
import { useDispatch } from "react-redux";
import w from "@/components/Post";
import Swal from "sweetalert2";
import Layout from "@/components/Layouts/DashLayout/Layout";
import {
  useGetOrderByOrderIdQuery,
  useCreateNoteMutation,
  useUpdateStatusMutation,
  useUpdateBalanceMutation,
} from "slices/orderApi";
import QuotationComponent from "@/components/Quotation/Quotation";
import { Select, Option, Input } from "@material-tailwind/react";
export default function View() {
  const user = useSelector(selectCurrentUser);
  const [currentDate, setCurrentDate] = useState(new Date());
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [status, setStatus] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [
    createNote,
    {
      isSuccess,
      isLoading: noteIsLoading,
      isError,
      data: noteData,
      error: noteError,
    },
  ] = useCreateNoteMutation();
  const [
    updateStatus,
    {
      isLoading: statusIsLoading,
      isError: statusIsError,
      isSuccess: statusIsSuccess,
      error: statusError,
    },
  ] = useUpdateStatusMutation();
  const [
    updateBalance,
    {
      isLoading: balanceIsLoading,
      isError: balanceIsError,
      isSuccess: balanceIsSuccess,
      error: balanceError,
    },
  ] = useUpdateBalanceMutation();
  const { id } = router.query;
  const {
    data: orderData,
    error: orderError,
    isLoading: orderIsLoading,
    isError: orderIsError,
    isFetching: orderIsFetching,
  } = useGetOrderByOrderIdQuery(`${id}`);

  useEffect(() => {
    console.log(orderIsFetching, "orderIsFetching");
    if (!orderIsFetching) {
      setCurrentDate(new Date());
      setStatus(orderData.status);
      setPaidAmount(orderData.paid);
      console.log(orderData);
      console.log(user);
    }
  }, [orderData]);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (orderIsError) {
      console.log(orderError);
    }
  }, [orderIsError]);

  const handleSendNote = async () => {
    if (noteContent.trim() === "") {
      // Optionally show a message if the content is empty
      alert("Please enter some text before sending.");
      return;
    }
    const notePayload = {
      content: noteContent,
    };
    const orderId = id;
    try {
      await createNote({ orderId, notePayload });
      setNoteContent("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Note Created successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (err) {
      console.error("Error creating note:", err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleChange = async (newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Change it!",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await updateStatus({
            orderId: orderData.id,
            newStatus: newStatus,
          });
          if (response?.data) {
            setStatus(newStatus);
            Swal.fire({
              title: "Success!",
              text: "Order status updated successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            throw new Error("Failed to update order status.");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.message || "Something went wrong. Try again!",
            icon: "error",
          });
        }
      }
    });
  };

  const handlePaidUpdate = async () => {
    Swal.fire({
      title: "Confirm Payment Update",
      text: `Are you sure you want to update the paid amount to $${paidAmount}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(paidAmount>(orderData.price-orderData.paid)){
          Swal.fire({
            title: "Error!",
            text: "Cannot add greater than Balance amount!",
            icon: "error",
          });
          return;
        }
        if(paidAmount<orderData.paid){
          Swal.fire({
            title: "Error!",
            text: "Cannot add less than Balance amount!",
            icon: "error",
          });
          return;
        }
        try {
          const response = await updateBalance({
            orderId: orderData.id,
            newBalance: paidAmount,
          });
          if (response?.data) {
            setPaidAmount(paidAmount)
            Swal.fire({
              title: "Success!",
              text: "Order Balance updated successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          } else {
            throw new Error("Failed to update order balance.");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error?.message || "Something went wrong. Try again!",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      {orderIsLoading || orderIsFetching || orderData === undefined ? (
        <Layout>
          <Spinner animation="border" variant="success" />
        </Layout>
      ) : (
        <Layout>
          <div className="w-full">
            <h2 className="font-bold text-3xl">Order Details</h2>
            <div className="grid grid-cols-3 gap-6  mt-6">
              <div className="col-span-2 bg-white border rounded-3xl p-8 pb-12">
                {user?.userdata?.role === "Admin" && (
                  <div className="grid grid-cols-2 gap-7 items-center mb-5">
                    <div className="flex flex-col justify-start items-start ">
                      <label className="text-black text-lg font-semibold me-4 mb-3">
                        Order Status:
                      </label>
                      <div className="w-[200px]">
                        <Select
                          label="Change Status"
                          value={status}
                          onChange={handleChange}
                          className=""
                        >
                          <Option value="Pending">Pending</Option>
                          <Option value="InProduction">In Production</Option>
                          <Option value="Shipped">Shipped</Option>
                          <Option value="Completed">Received</Option>
                          <Option value="Cancelled">Cancelled</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-end ">
                      <div className="w-[320px]">
                        <label className="text-black text-lg font-semibold me-4 ">
                          Balance Paid:
                        </label>
                        <div className="flex items-start gap-2 mt-3">
                          <Input
                            min={0}
                            type="number"
                            inputMode="numeric"
                            label="Add Remaining Balance"
                            value={paidAmount}
                            onChange={(value) => {
                              setPaidAmount(value.currentTarget.value)
                            }}
                            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <Button type="primary" onClick={handlePaidUpdate}>Confirm</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid gap-7 grid-cols-2 mb-0">
                  <div className="space-y-2">
                    <h3 className="text-black text-lg">
                      <span className="font-semibold">Order ID:</span>&nbsp;
                      {orderData.order_id}
                    </h3>
                    <h3 className="text-black text-lg font-semibold">
                      Customer ID:&nbsp;
                      <span className="font-normal">
                        #SASA-{orderData.customer_id}
                      </span>
                    </h3>
                  </div>
                  {user?.userdata?.role !== "Tailor" && (
                    <div className="space-y-2 justify-self-end pr-8">
                      <h3 className="text-black text-lg ">
                        <span className="font-semibold">Paid:</span>&nbsp;$&nbsp;
                        {orderData.paid}
                      </h3>
                      <h3 className="text-black text-lg ">
                        <span className="font-semibold">Balance:</span>&nbsp;$&nbsp;
                        {orderData.price - orderData.paid}
                      </h3>
                    </div>
                  )}
                </div>
                <div className="grid gap-7 grid-cols-3 mb-7">
                  <div className="space-y-2">
                    <p className="text-black text-base font-semibold mt-10">
                      Customer Name: &nbsp;
                      <span className="font-normal">
                        {orderData.customer.firstname}{" "}
                        {orderData.customer.lastname}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-2 justify-self-center">
                    <p className="text-black text-base font-semibold mt-10">
                      Product:
                      <span className="font-normal"> {orderData.type}</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-black text-base font-semibold mt-10">
                      Expected Delivery:{" "}
                      <span className="font-normal">
                        {" "}
                        {orderData.delivery_date}{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="border-t-2 border-gray-300"></hr>
                <div className="grid gap-16 grid-cols-2 mb-7">
                  <div className="space-y-5">
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
                            <b>{orderData.fabricDetails.jacketFabric}</b>
                          </label>{" "}
                        </div>
                        <div className="ml-5">
                          <span className="font-normal mr-7">
                            Jacket Lining#{" "}
                          </span>
                          <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                            <b>{orderData.fabricDetails.jacketLining}</b>
                          </label>{" "}
                        </div>
                        <div className="ml-5">
                          <span className="font-normal mr-20">
                            Vest Fabric#{" "}
                          </span>
                          <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                            <b>{orderData.fabricDetails.vestFabric}</b>
                          </label>{" "}
                        </div>
                        <div className="ml-5">
                          <span className="font-normal mr-20">
                            Vest Lining#{" "}
                          </span>
                          <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                            <b>{orderData.fabricDetails.vestLining}</b>
                          </label>{" "}
                        </div>
                        <div className="ml-5">
                          <span className="font-normal mr-20">
                            Trouser Fabric#{" "}
                          </span>
                          <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                            <b>{orderData.fabricDetails.trouserFabric}</b>
                          </label>{" "}
                        </div>
                        <div className="ml-5">
                          <span className="font-normal mr-20">Button# </span>
                          <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                            <b>{orderData.fabricDetails.button}</b>
                          </label>{" "}
                        </div>
                      </div>
                      {orderData.orderDetails.map((component) => (
                        <div className="space-y-4" key={component.id}>
                          <h4 className="text-black text-base font-semibold my-6">
                            {component.componentName} Measurements
                          </h4>

                          <div>
                            {/* Loop through each measurement inside the component */}
                            {Object.values(component.measurements).map(
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
                    {/* Special Instructions Section */}
                    <div className="mt-10">
                      <h4 className="text-black text-base font-semibold my-6">
                        Special Instructions / Recorded Preferences
                      </h4>
                      <textarea
                        rows="4"
                        className="w-full font-light bg-[#EEEDED] border rounded-lg p-6"
                        value={orderData?.specialInstructions} // Set the value from state
                      ></textarea>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-black text-base font-semibold my-6">
                        Shipping
                      </h4>
                      <div className="ml-5">
                        <span className="font-normal mr-7">
                          Express Delivery{" "}
                        </span>
                      </div>
                    </div>
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
                            {orderData.additionalOptions?.sleeveButtonHoles
                              ? "Yes"
                              : "No"}
                          </b>
                        </label>
                      </div>
                      <div className="ml-5">
                        <span className="font-normal mr-7">Initials </span>
                        <label className="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                          <b>
                            {orderData.initials ? orderData.initials : "N/A"}
                          </b>
                        </label>
                      </div>
                    </div>
                    <div className="mt-10 text-center">
                      <img
                        src={orderData.styleImageUrl}
                        className="h-96 inline-block"
                      />
                      <h3 className="text-black text-lg font-semibold mt-10 text-center">
                        Model Num: &nbsp;{" "}
                        <span className="font-normal">
                          {" "}
                          {orderData.modelNumber}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
                <QuotationComponent
                  orderData={orderData}
                  userRole={user?.userdata?.role}
                />
                {/* <div>
                  <h4 className="text-black text-base font-semibold my-6">
                    Quotation
                  </h4>
                  <input
                    className=" text-base bg-[#EEEDED] px-3 py-2 rounded-lg focus:outline-none"
                    type="text"
                  />
                  <Button className="py-3 px-6 ml-2">Approve</Button>
                  <span className="mx-3">or</span>
                  <Button className="py-3 px-6">Disapprove</Button>
                </div> */}
              </div>
              <div className="col-span-1">
                <div className="bg-white border rounded-xl p-6">
                  <div className="flex flex-row justify-end mb-6">
                    <button
                      onClick={handleSendNote}
                      className="py-3 px-8 rounded-md bg-black text-white"
                      disabled={noteIsLoading}
                    >
                      {noteIsLoading ? "Sending..." : "+ Note"}
                    </button>
                  </div>
                  <hr className="border-t-1 border-gray-300"></hr>
                  <textarea
                    rows="3"
                    placeholder="Start typing to leave a note..."
                    className="w-full font-light mt-6 p-4 border rounded-lg focus:outline-none focus:border-black"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                  ></textarea>
                  {noteError && (
                    <p className="text-red-500 mt-2">
                      Error: {noteError.message}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  <h4 className="text-black text-base font-semibold my-6">
                    Activity
                  </h4>
                  <div>
                    {orderData.notes
                      .slice() // Create a shallow copy to avoid mutating the original array
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      ) // Sort by createdAt in descending order
                      .map((note, index) => {
                        // Formatting the createdAt date
                        const createdAt = new Date(note.createdAt);
                        const formattedDate = createdAt.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          }
                        );

                        // Determine background color for the latest note
                        const isLatestNote = index === 0;

                        return (
                          <div key={note.id} className="mb-4">
                            <div
                              className={`border rounded-md p-5 ${
                                isLatestNote ? "bg-[#C9D2FF]" : "bg-[#FFFFFF]"
                              }`}
                            >
                              <div className="flex flex-row justify-between mb-4">
                                <span className="font-semibold">
                                  Mahnoor, The Boss
                                </span>
                                <span className="font-semibold">
                                  {formattedDate}
                                </span>
                              </div>
                              <div className="w-9/12">
                                <span className="font-extralight text-[#00000073]">
                                  {note.content}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
}
