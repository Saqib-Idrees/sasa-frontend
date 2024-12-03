import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectCurrentUser, selectIsAuthenticated } from "slices/authSlice";
import { useUpdateProfileMutation } from "slices/profileAPI";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Button } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { setUser } from "slices/authSlice";
// Validation schema using Yup
const validationSchema = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  dob: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.number()
      .typeError("Phone number must be a number") // Ensure it's a number
      .integer("Phone number must be an integer") // Ensure it's an integer
      .min(1000000000, "Phone number must be exactly 10 digits") // Minimum 10 digits
      .max(9999999999, "Phone number must be exactly 10 digits") // Maximum 10 digits
      .transform((value) => (value ? Math.floor(value) : null)) // Ensure it's returned as an integer
      .nullable(), // Optional
  role: Yup.string().required("Role is required"),
  shopName: Yup.string().nullable(),
  location: Yup.string().nullable(),
  // password: Yup.string()
  //   .min(8, "Password must be at least 8 characters")
  //   .required("Password is required"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Passwords must match")
  //   .required("Confirm Password is required"),
});

export default function Edit() {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  const [
    updateProfile,
    { isSuccess, isLoading, isError, data: loginData, error: loginError },
  ] = useUpdateProfileMutation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTailor, setIsTailor] = useState(
    user?.userdata?.role === "Tailor" ? true : false
  );

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

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await updateProfile(values).unwrap();
      if (isError === false) {
        dispatch(setUser({ userdata: response }));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("Profile updated successfully:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
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
    console.log(loginError);
    if (isError) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: loginError?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isError]);

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
              username: user?.userdata?.username || "",
              dob: user?.userdata?.dob || "",
              gender: user?.userdata?.gender || "",
              phone: user?.userdata?.phone || "",
              email: user?.userdata?.email || "",
              role: user?.userdata?.role || "",
              shopName: user?.userdata?.shopName || "",
              location: user?.userdata?.location || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="max-w-3xl mt-6">
                  <div className="grid gap-7 grid-cols-2 mb-7">
                    <div className="">
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
                    <div className="">
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
                    <div className="">
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
                    <div className="">
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
                    <div className="">
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Username
                      </label>
                      <Field
                        className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                        type="text"
                        name="username"
                        placeholder="isabella-lopez"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="">
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
                    <div className="">
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
                    <div>
                      <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                        Role
                      </label>
                      <Field
                        name="role"
                        as="select"
                        className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                        onChange={(e) => {
                          const selectedRole = e.target.value;
                          setFieldValue("role", selectedRole);
                          setIsTailor(selectedRole === "Tailor");
                        }}
                        disabled={true}
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Sales">Sales Agent</option>
                        <option value="Tailor">Tailor</option>
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  {isTailor && (
                    <>
                      <div className="grid gap-7 grid-cols-2 mb-7">
                        <div>
                          <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                            Shop Name
                          </label>
                          <Field
                            name="shopName"
                            type="text"
                            className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Enter Shop Name"
                          />
                          <ErrorMessage
                            name="shopName"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                        <div>
                          <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                            Location
                          </label>
                          <Field
                            name="location"
                            type="text"
                            className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                            placeholder="Enter Location"
                          />
                          <ErrorMessage
                            name="location"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {/* <div className="grid gap-7 grid-cols-2 mb-7">
                    <div className="">
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
                    <div className="">
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
                          type="button"number
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
                  </div> */}
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
