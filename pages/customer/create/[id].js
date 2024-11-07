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
import {
  AiOutlineCalendar,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineLock,
} from "react-icons/ai"; // Icons

export default function Edit() {
  const user = useSelector(selectCurrentUser);
  const [currentDate, setCurrentDate] = useState(new Date());
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // Displays the full weekday (e.g., "Monday")
    year: "numeric",
    month: "long", // Full month name
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
        <h2 class="font-bold text-3xl">Customer Details</h2>
        <div className="grid mr-auto md:mr-4 my-40 justify-center">
        <Form>
              <div className="grid gap-7 grid-cols-3 max-w-lg items-end">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                  Customer ID
                  </label>

                  <input
                    className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                    type="text"
                  />
                </div>
                <div className="col-span-1space-y-2">
                <Button className="py-4 px-12">Look up</Button>
                </div>
              </div>
          </Form>
          <Form>
            <div className="max-w-lg mt-6">
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    First Name
                  </label>

                  <input
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
              <div className="space-y-2 mb-7">
                <label className="text-xs font-medium text-gray-700 tracking-wide">
                    Email address
                </label>

                <input
                  className=" w-full text-base px-4 py-3 rounded-lg focus:outline-none focus:border-black"
                  type="email"
                  placeholder="mail@gmail.com"
                  name="email"
                />
              </div>
                <div className="space-y-2 mb-7">
                <label className="text-xs font-medium text-gray-700 tracking-wide">
                Phone number
                  </label>
        <div class="flex items-center border border-white rounded-lg">
            <select class="flex items-center py-3 pl-4 border-r border-white bg-white text-gray-700 focus:outline-none focus:border-black w-40">
                <option value="+1" class="flex items-center"> +1 (USA)
                </option>
                <option value="+44" class="flex items-center"> +44 (UK)
                </option>
                <option value="+91" class="flex items-center"> +91 (India)
                </option>
                <option value="+49" class="flex items-center"> +49 (Germany) 
                </option>
            </select>
            <input type="tel" id="phone" class="py-3 pr-4 w-full focus:outline-none focus:border-black" placeholder="Enter mobile number" pattern="[0-9]*" inputmode="numeric" required />
        </div>
        <p class="mt-2 text-gray-600 text-sm">Please enter your mobile number without the country code.</p>
    </div>
              <Button className="mt-4 py-4 px-16 w-full">Next</Button>
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