import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Button } from "@material-tailwind/react";
import { useUserCreateMutation } from "slices/authAPI";
import { selectCurrentUser } from "slices/authSlice";
import { useSelector } from "react-redux";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function Create() {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  // if (user) {
  //   router.push("/");
  // }
  const [currentDate, setCurrentDate] = useState(new Date());
  // RTK Query Signup Hook
  const [
    userCreate,
    { isSuccess, isLoading, isError, data: loginData, error: loginError },
  ] = useUserCreateMutation();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    debugger;
    try {
      await userCreate(values);
      if (isError === false) {
        debugger;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User has been created successfully!!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset the form after success
        resetForm();
      }
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

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    dob: Yup.date()
      .nullable()
      .max(new Date(), "Date of Birth cannot be in the future"), // Optional
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.number()
      .typeError("Phone number must be a number") // Ensure it's a number
      .integer("Phone number must be an integer") // Ensure it's an integer
      .min(1000000000, "Phone number must be exactly 10 digits") // Minimum 10 digits
      .max(9999999999, "Phone number must be exactly 10 digits") // Maximum 10 digits
      .transform((value) => (value ? Math.floor(value) : null)) // Ensure it's returned as an integer
      .nullable(), // Optional
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    gender: Yup.string().nullable(), // Optional
    role: Yup.string().required("Role is required"),
  });

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <Layout>
      <h2 className="font-bold text-3xl">Create User</h2>
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
          Complete the fields below
        </p>
        <div className="grid gap-7 grid-cols-2 mb-5 mt-5">
          <Formik
            initialValues={{
              username: "",
              firstname: "",
              lastname: "",
              dob: "",
              gender: "",
              email: "",
              phone: "",
              password: "",
              re_password: "",
              role: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting, resetForm }) => (
              <FormikForm onSubmit={handleSubmit}>
                <div className="grid gap-7 grid-cols-2 mb-7"></div>

                <div className="grid gap-7 grid-cols-2 mb-7">
                  <div>
                    <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                      First Name
                    </label>
                    <Field
                      name="firstname"
                      type="text"
                      className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="Isabella"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                      Last Name
                    </label>
                    <Field
                      name="lastname"
                      type="text"
                      className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="Lopez"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid gap-7 grid-cols-2 mb-7">
                  <div>
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
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
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
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid gap-7 grid-cols-2 mb-7">
                  <div>
                    <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                      Username
                    </label>
                    <Field
                      name="username"
                      type="text"
                      className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="isabella-lopez"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="Isabella@gmail.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid gap-7 grid-cols-2 mb-7">
                  <div>
                    <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                      Confirm Password
                    </label>
                    <Field
                      name="re_password"
                      type="password"
                      className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                    />
                    <ErrorMessage
                      name="re_password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid gap-7 grid-cols-2 mb-7">
                  <div>
                    <label className="inline-block mb-4 text-xs font-medium text-gray-700 tracking-wide">
                      Mobile Phone
                    </label>
                    <Field
                      name="phone"
                      type="tel"
                      className="w-full text-base px-4 py-3 rounded-lg border border-gray-300"
                      placeholder="559 355 3732"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
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

                <Button
                  type="submit"
                  className="mt-10 py-4 px-16"
                  disabled={isSubmitting}
                >
                  Create Account
                </Button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
