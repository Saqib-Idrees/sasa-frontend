import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useApproveQuotationMutation, useDisapproveQuotationMutation, useUpdateQuotationMutation } from "slices/orderApi";
import Swal from "sweetalert2";
// import axios from "axios";

const QuotationComponent = ({ orderData, userRole }) => {
  const [quotation, setQuotation] = useState(orderData?.quotationPrice || null);
  const [orderId, setOrderId] = useState(orderData?.id || null);
  const [isSubmitting, setIsSubmitting] = useState(
    orderData?.quotationPrice ? true : false
  );
  const [orderStatus, setOrderStatus] = useState(
    orderData?.status || "Pending"
  );

  useEffect(() => {
    // Update quotation state whenever orderData changes
    setQuotation(orderData?.quotationPrice || null);
    setOrderId(orderData?.id || null);
    setOrderStatus(orderData?.status || "Pending");
    setIsSubmitting(orderData?.quotationPrice ? true : false);
  }, [orderData]);

  const [
    disapproveQuotation,
    {
      isSuccess: disapproveIsSuccess,
      isLoading: disapproveIsLoading,
      isError: disapproveIsError,
      data: disapproveData,
      error: disapproveError,
    },
  ] = useDisapproveQuotationMutation();
  
  const handleDisapprove = async () => {
    try {
      await disapproveQuotation({ orderId });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  useEffect(() => {
    if (disapproveIsError) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: disapproveError?.data?.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (disapproveIsSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Quotation disapproved successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setQuotation(null);    }
  }, [disapproveIsError, disapproveIsSuccess, disapproveError]);
  

  const [
    approveQuotation,
    {
      isSuccess: approveIsSuccess,
      isLoading: approveIsLoading,
      isError: approveIsError,
      data: approveData,
      error: approveError,
    },
  ] = useApproveQuotationMutation();

  const handleApprove = async () => {
    const values = {
      quotationPrice: quotation,
    };
    try {
      await approveQuotation({ orderId, values });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  useEffect(() => {
    if (approveIsError) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: approveError?.data?.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (approveIsSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Quotation approved successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setOrderStatus("InProduction");
    }
  }, [approveIsError, approveIsSuccess, approveError]);


  const [
    updateQuotation,
    {
      isSuccess: quotationIsSuccess,
      isLoading: quotationIsLoading,
      isError: quotationIsError,
      data: quotationData,
      error: quotationError,
    },
  ] = useUpdateQuotationMutation();

  const handleSubmitQuotation = async () => {
    const values = {
      quotationPrice: quotation,
    };
    try {
      await updateQuotation({ orderId, values });
      setIsSubmitting(true);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    if (quotationIsError) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: quotationError?.data?.message || "An error occurred!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (quotationIsSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Quotation has been updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [quotationIsError, quotationIsSuccess, quotationError]);


  if (userRole === "Tailor") {
    return (
      <div className="my-6">
        <h4 className="text-black text-lg font-semibold mb-4">
          Submit Quotation
        </h4>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            className="text-base bg-[#EEEDED] w-full sm:w-auto px-4 py-3 border rounded-md focus:outline-none focus:border-black"
            type="text"
            value={quotation || ""}
            onChange={(e) => setQuotation(e.target.value)}
            placeholder="Enter quotation price"
            aria-label="Quotation Price"
          />
          <Button
            className="py-4 px-6 mt-4 sm:mt-0"
            onClick={handleSubmitQuotation}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitted" : "Submit"}
          </Button>
        </div>
      </div>
    );
  }

  if (quotation === null || userRole === "Sales") {
    return null;
  }

  return (
    <div className="my-6">
      <h4 className="text-black text-lg font-semibold mb-4">Quotation</h4>
      <input
        className="text-base bg-[#EEEDED] w-full sm:w-auto px-4 py-3 border rounded-md focus:outline-none focus:border-black"
        type="text"
        value={quotation}
        onChange={(e) => setQuotation(e.target.value)}
        placeholder="Enter quotation price"
        aria-label="Quotation Price"
        readOnly
      />

      {orderStatus === "Pending" ? (
        <div className="mt-6 flex items-center gap-4">
          <Button
            className="py-3 px-6 w-full sm:w-auto "
            onClick={handleApprove}
          >
            Approve
          </Button>
          <span className="mx-3">or</span>
          <Button
            className="py-3 px-6 w-full sm:w-auto bg-red-500 hover:bg-red-600"
            onClick={handleDisapprove}
          >
            Disapprove
          </Button>
        </div>
      ) : (
        <div className="mt-6">
          <Button
            className="py-3 px-6 w-full sm:w-auto bg-green-500 hover:bg-green-600"
            onClick={handleApprove}
            disabled
          >
            Approved
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuotationComponent;
