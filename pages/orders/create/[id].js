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
        <h2 class="font-bold text-3xl">Measurements</h2>
        <div className="my-10 justify-center">
          <div className="bg-white border rounded-3xl px-9 py-8">
            <div className="grid gap-4 grid-cols-3 pb-8">
              <div className="col-span-2">
                <h3 class="font-bold text-3xl text-center">Order ID #917583</h3>
              </div>
              <div className="col-span-1 flex justify-self-end items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <span class="font-normal text-lg text-center">Edit</span>
              </div>
            </div>
            <div className="grid grid-cols-2 w-1/3 m-auto">
              <div className="space-y-2 mt-8">
                <h6 class="text-black text-lg font-semibold pb-4">
                  Customer Name:
                </h6>
                <h6 class="text-black text-lg font-semibold pb-4">Email:</h6>
                <h6 class="text-black text-lg font-semibold pb-4">
                  Contact Num:
                </h6>
              </div>
              <div className="space-y-2 mt-8">
                <p class="text-black text-lg font-normal pb-4">Richard Grey</p>
                <p class="text-black text-lg font-normal pb-4">
                  richard_grey@gmail.com
                </p>
                <p class="text-black text-lg font-normal pb-4">
                  +1 (354) 667 8979
                </p>
              </div>
            </div>
          </div>
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
