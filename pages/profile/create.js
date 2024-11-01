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
import router from "next/router";
import { useGetUserQuery } from "slices/authAPI";
import { useDispatch } from "react-redux";
import w from "@/components/Post";

import { useGetAllPostsQuery } from "slices/postsAPI";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Input, Button, IconButton } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";

export default function Home() {
  const user = useSelector(selectCurrentUser);
  const [currentDate, setCurrentDate] = useState(new Date());
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const {
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    isError: postsIsError,
    isFetching: postsIsFetching,
  } = useGetAllPostsQuery("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    if (postsIsError) {
      console.log(postsError);
    }
  }, [postsIsError]);

  return (
    <div>
      <Layout>
        <h2 class="font-bold text-3xl">Create User</h2>
        <div className="mr-auto md:mr-4 my-8">
          <h2 class="font-semibold text-[#3E435D] text-2xl">
            Welcome, Alexa A.
          </h2>
          <div className="text-[#ADA7A7] font-extralight text-base mt-2">
            {formattedDate}
          </div>
          <h2 class="font-medium text-black text-2xl mt-10">
            Account Information
          </h2>
          <p className="text-[#ADA7A7] font-extralight text-base mt-4">
            Complete the fields below
          </p>
          <h3 class="text-black text-lg font-semibold mt-10">
            Personal Information
          </h3>
          <Form>
            <div className="max-w-3xl mt-6">
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    First Name
                  </label>

                  <input
                    icon={<i className="fas fa-heart" />}
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="text"
                    placeholder="Joshua"
                    name="fname"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Last Name
                  </label>

                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="text"
                    placeholder="George"
                    name="lname"
                  />
                </div>
              </div>
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Date of Birth
                  </label>

                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="date"
                    placeholder="07/06/2022"
                    name="dob"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Gender
                  </label>

                  <Select className="border-0 w-full text-base px-4 py-6 rounded-lg focus:outline-none bg-white" variant="standard">
                    <Option>Male</Option>
                    <Option>Female</Option>
                    <Option>Other</Option>
                  </Select>
                  {/* 
                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="option"
                    placeholder="+12 3456 7890"
                    name="phno"
                  /> */}
                </div>
              </div>
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2 mb-7">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Email
                  </label>

                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="email"
                    placeholder="mail@gmail.com"
                    name="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Mobile Phone
                  </label>

                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="tel"
                    placeholder="+12 3456 7890"
                    name="phno"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full pl-4 pr-20 text-base px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      type="button"
                      className="absolute right-3 top-3 px-2 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full pl-4 pr-20 text-base px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={toggleConfirmPasswordVisibility}
                      type="button"
                      className="absolute right-3 top-3 px-2 py-1 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>
          
              {/* <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <label className="mb-5 text-xs font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-xs font-medium text-gray-700 tracking-wide">
                    Confirm Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="password"
                    placeholder="Enter your password"
                    name="re_password"
                  />
                </div>
              </div> */}
            </div>
            <div className="max-w-3xl mt-6">
            <h3 class="text-black text-lg font-semibold mt-10">
            Roles
          </h3>
                <div className="grid gap-7 grid-cols-2 mt-7 space-y-2">
                <Select className="border-0 w-full text-base px-4 py-6 rounded-lg focus:outline-none bg-white" variant="standard">
                    <Option>Admin</Option>
                    <Option>Sales Agent</Option>
                    <Option>Tailor</Option>
                  </Select>
                  {/* 
                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="option"
                    placeholder="+12 3456 7890"
                    name="phno"
                  /> */}
                </div>
              <Button className="mt-32 py-4 px-16">Create Account</Button>
            </div>
          </Form>
        </div>
      </Layout>
      {postsIsLoading || postsIsFetching || postsData === undefined ? (
        <Spinner animation="border" variant="success" />
      ) : (
        <>
          <h3>All Posts</h3>
          {postsData.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
}
