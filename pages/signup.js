import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import { useUserCreateMutation } from "slices/authAPI";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "slices/authSlice";
import Layout from "@/components/Layouts/NoHeaderLayout/Layout";
import {
  Alert,
  Spinner,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'

export default function Signup() {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  if (user) {
    router.push("/");
  }

  // RTK Query Signup Hook
  const [
    userCreate,
    { isSuccess, isLoading, isError, data: loginData, error: loginError },
  ] = useUserCreateMutation();

  // Formik initial values
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
    role: "",
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    re_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    role: Yup.string().required("Role is required"),
  });

  // Form submission handler
  const handleSignupSubmit = async (values) => {
    console.log(values);
    try {
      await userCreate(values);
      if (isError === false) {
        debugger;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have successfully register!! Redirecting to login ....",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(()=>{router.push("/login");}, 1000);
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  useEffect(() => {
    if(isError){
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: loginError?.data?.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }, [isError]);

  return (
    <Layout>
      <div className="md:container mx-auto">
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
            <div className="self-start hidden lg:flex flex-col text-white">
              <img
                src="/assets/images/signupbg.jpg"
                className="mb-3 rounded-3xl"
              />
            </div>
          </div>
          <div className="flex justify-center self-center sm:max-w-5xl xl:max-w-lg z-10">
            <div className="p-10 bg-white mx-auto rounded-2xl">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Create an account
                </h3>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignupSubmit}
              >
                {({ values, handleChange, setFieldValue, errors, touched }) => (
                  <Form>
                    <div className="space-y-5">
                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 tracking-wide">
                            First Name
                          </label>
                          <Field
                            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                            type="text"
                            name="firstname"
                            value={values.firstname}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="firstname"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 tracking-wide">
                            Last Name
                          </label>
                          <Field
                            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                            type="text"
                            name="lastname"
                            value={values.lastname}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name="lastname"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 tracking-wide">
                          Username
                        </label>
                        <Field
                          className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 tracking-wide">
                          Email
                        </label>
                        <Field
                          className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                          Password
                        </label>
                        <Field
                          className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                          Confirm Password
                        </label>
                        <Field
                          className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                          type="password"
                          name="re_password"
                          value={values.re_password}
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="re_password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700 tracking-wide">
                          Role
                        </label>
                        <Select
                          className="w-full text-base px-4 py-6 border border-gray-300 rounded-lg focus:outline-none"
                          value={values.role}
                          onChange={(value) => setFieldValue("role", value)}
                        >
                          <Option value="Tailor">Tailor</Option>
                          <Option value="Sales Agent">Sales Agent</Option>
                        </Select>
                        <ErrorMessage
                          name="role"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="pt-5 text-center text-gray-400 text-xs">
                        <span>
                          By creating an account, I agree to our{" "}
                          <a
                            href=""
                            className="text-black hover:text-black-500"
                          >
                            Terms of use
                          </a>{" "}
                          and{" "}
                          <a
                            href=""
                            className="text-black hover:text-black-500"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </div>
                      <div>
                        {isLoading ? (
                          <Button
                            variant="primary"
                            disabled
                            className="w-full flex justify-center bg-black hover:bg-black text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                          >
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            Loading...
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            type="submit"
                            className="w-full flex justify-center bg-black hover:bg-black text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                          >
                            Create an account
                          </Button>
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="pt-5 text-center text-gray-400 text-sm">
                <a href="/login" className="text-black hover:text-black">
                  Login instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
