import Head from "next/head";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated } from "slices/authSlice";
import { useProfileUpdateMutation } from "slices/authAPI";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Button } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";

// Validation schema using Yup
const validationSchema = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  dob: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must be numeric")
    .required("Phone is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Edit() {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [profileUpdate] = useProfileUpdateMutation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  if (!isAuthenticated) {
    router.push("/");
  }
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await profileUpdate(values).unwrap();
      console.log("Profile updated successfully:", response);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: "Failed to update profile. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Layout>
        <h2 className="font-bold text-3xl">Profile</h2>
        <div className="mr-auto md:mr-4 my-8">
          <h2 className="font-semibold text-[#3E435D] text-2xl">
            Welcome, {user?.userdata?.firstname}
          </h2>
          <div className="text-[#ADA7A7] font-extralight text-base mt-2">
            {formattedDate}
          </div>
          <h2 className="font-medium text-black text-2xl mt-10">
            Account Information
          </h2>
          <p className="text-[#ADA7A7] font-extralight text-base mt-4">
            Update your account information
          </p>
          <Formik
            initialValues={{
              firstname: user?.userdata?.firstname || "",
              lastname: user?.userdata?.lastname || "",
              dob: user?.userdata?.dob || "",
              gender: user?.userdata?.gender || "",
              phone: user?.userdata?.phone || "",
              email: user?.userdata?.email || "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="max-w-3xl mt-6">
                  <div className="grid gap-7 grid-cols-2 mb-7">
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        First Name
                      </label>
                      <Field
                        name="firstname"
                        type="text"
                        placeholder="Isabella"
                        className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      />
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Last Name
                      </label>
                      <Field
                        name="lastname"
                        type="text"
                        placeholder="Lopez"
                        className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      />
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid gap-7 grid-cols-2 mb-7">
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Date of Birth
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Gender
                      </label>
                      <Field
                        name="gender"
                        as="select"
                        className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      >
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to disclose">
                          Prefer not to disclose
                        </option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid gap-7 grid-cols-2 mb-7">
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Mobile Phone
                      </label>
                      <Field
                        name="phone"
                        type="tel"
                        placeholder="559 355 37320"
                        className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Isabella@gmail.com"
                        className="w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-100 cursor-not-allowed"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="grid gap-7 grid-cols-2 mb-7">
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Password
                      </label>
                      <div className="relative flex items-center">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                        />
                        <button
                          onClick={togglePasswordVisibility}
                          type="button"
                          className="absolute right-3 top-3 px-2 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Confirm Password
                      </label>
                      <div className="relative flex items-center">
                        <Field
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                        />
                        <button
                          onClick={toggleConfirmPasswordVisibility}
                          type="button"
                          className="absolute right-3 top-3 px-2 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 py-4 px-16"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>
                  {errors.submit && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.submit}
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    </div>
  );
}
