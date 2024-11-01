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

export default function View() {
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
        <h2 class="font-bold text-3xl">Order Details</h2>
        <div class="w-full mt-11">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-2 bg-white border rounded-3xl px-14">
              <div className="grid gap-7 grid-cols-2 mb-7">
                <div className="space-y-2">
                  <h3 class="text-black text-lg font-semibold mt-10">
                    Order ID &nbsp; #917583
                  </h3>
                  <h3 class="text-black text-lg font-semibold mt-10">
                    Customer ID &nbsp;{" "}
                    <span class="font-normal"> #002586691022 </span>
                  </h3>
                </div>
                <div className="space-y-2 justify-self-end">
                  <h3 class="text-black text-lg font-semibold mt-10">
                    Paid: &nbsp; $300.00
                  </h3>
                  <h3 class="text-black text-lg font-semibold mt-10">
                    Balance: &nbsp; $700.00
                  </h3>
                </div>
              </div>
              <div className="grid gap-7 grid-cols-3 mb-7">
                <div className="space-y-2">
                  <p class="text-black text-base font-semibold mt-10">
                  Customer Name: &nbsp; <span class="font-normal">Richard Grey </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p class="text-black text-base font-semibold mt-10">
                  Product: &nbsp; <span class="font-normal"> Suit</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p class="text-black text-base font-semibold mt-10">
                  Expected Delivery Date &nbsp; <span class="font-normal"> 25/12/24</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-span-1 bg-white"></div>
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

