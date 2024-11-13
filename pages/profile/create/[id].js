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

import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import { useGetAllPostsQuery } from "slices/postsAPI";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Input, Button, IconButton } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";

export default function Create() {
  const user = useSelector(selectCurrentUser);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = React.useState(new Date());
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

  const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i);
function DatePicker() {
  const [date, setDate] = useState();
  const [selectedYear, setSelectedYear] = useState(currentYear);
}
  const handleYearChange = (year) => {
    setSelectedYear(year);
  }

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
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="text"
                    placeholder="Isabella"
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
                    placeholder="Lopez"
                    name="lname"
                  />
                </div>
              </div>
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Date of Birth
                  </label>
                  
                  {/* <Popover placement="bottom">
        <PopoverHandler>
          <Input
            onChange={() => null}
            value={date ? format(date, "PPP") : ""}
          />
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            showOutsideDays
            className="border-0"
            classNames={{
              nav: "flex items-center",
              nav_button:
                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
              nav_button_previous: "absolute left-1.5",
              nav_button_next: "absolute right-1.5",
              table: "w-full border-collapse",
              head_row: "flex font-medium text-gray-900",
              head_cell: "m-0.5 w-9 font-normal text-sm",
              row: "flex w-full mt-2",
              cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal",
              day_range_end: "day-range-end",
              day_selected:
                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
              day_today: "rounded-md bg-gray-200 text-gray-900",
              day_outside:
                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
              day_disabled: "text-gray-500 opacity-50",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
              ),
            }}
          />
        </PopoverContent>
      </Popover> */}

                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="date"
                    placeholder="Nov-11-2022"
                    name="dob"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Gender
                  </label>

                  <Select className="border-0 w-full text-base px-4 py-6 rounded-lg focus:outline-none bg-white" variant="standard">
                    <Option>Female</Option>
                    <Option>Male</Option>
                    <Option>Non-binary</Option>
                    <Option>Prefer not to disclose</Option>
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
                    placeholder="Isabella@gmail.com"
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
                    placeholder="559 355 3732"
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
