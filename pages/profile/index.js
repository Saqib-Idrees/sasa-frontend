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

export default function Home() {
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

  useEffect(() => {
    if (postsIsError) {
      console.log(postsError);
    }
  }, [postsIsError]);

  return (
    <div>
      <Layout>
        <h2 class="font-bold text-3xl">Profile</h2>
        <div className="mr-auto md:mr-4 my-8">
          <h2 class="font-semibold text-[#3E435D] text-2xl">
            Welcome, Kayla S.
          </h2>
          <div className="text-[#ADA7A7] font-extralight text-base mt-2">
            {formattedDate}
          </div>
          <h2 class="font-medium text-black text-2xl mt-10">
            Account Information
          </h2>
          <p className="text-[#ADA7A7] font-extralight text-base mt-4">
            Update your account information
          </p>
          <h3 class="text-black text-lg font-semibold mt-10">
            Personal Information
          </h3>

          {/* <div className="p-8 max-w-3xl">
      <form className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-4">
            <label className="font-semibold text-base" >First Name</label>
          <Input  bg-gray-50 label="First Name" placeholder="Kayla" />
          <Input  bg-gray-50 label="Last Name" placeholder="Snow" />
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Input label="Date of Birth" placeholder="07/06/2022" /> 
        </div>

        <div className="relative">
          <Input label="Mobile Phone" placeholder="+12 3456 7890" />
        </div>
        </div>

        <div className="relative">
          <Input label="Email" placeholder="alexaandriana@gmail.com" />
        </div>

        <div className="relative">
          <Input label="New Password" type="password" />
        </div>

        <div className="relative">
          <Input label="Confirm Password" />
        </div>

        <Button className="mt-4">
          Update
        </Button>
      </form>
    </div> */}
          <Form>
            <div className="max-w-3xl mt-6">
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700 tracking-wide">
                    First Name
                  </label>

                  <input icon={<i className="fas fa-heart" />}
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
              <div className="grid gap-7 grid-cols-2 mb-7">
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
              </div>
              <Button className="mt-4 py-4 px-16">Update</Button>
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
