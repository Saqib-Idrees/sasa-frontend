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
        <div class="w-full">
          <h2 class="font-bold text-3xl">Order Details</h2>
          <div class="grid grid-cols-3 gap-6  mt-6">
            <div class="col-span-2 bg-white border rounded-3xl px-14 pb-12">
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
                <div className="space-y-2 justify-self-end pr-8">
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
                    Customer Name: &nbsp;{" "}
                    <span class="font-normal">Richard Grey </span>
                  </p>
                </div>
                <div className="space-y-2 justify-self-center">
                  <p class="text-black text-base font-semibold mt-10">
                    Product: &nbsp; <span class="font-normal"> Suit</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p class="text-black text-base font-semibold mt-10">
                    Expected Delivery Date &nbsp;{" "}
                    <span class="font-normal"> 25/12/24</span>
                  </p>
                </div>
              </div>
              <hr class="border-t-2 border-gray-300"></hr>
              <div className="grid gap-16 grid-cols-2 mb-7">
                <div className="space-y-5">
                  <div className="space-y-4">
                    <h4 class="text-black text-base font-semibold my-6">
                      Fabric Details:
                    </h4>
                    <div class="ml-5">
                      <span class="font-normal mr-7">Jacket Fabric# </span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>77T854</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-7">Jacket Lining# </span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>99QW75</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">Button# </span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>00S125</b>
                      </label>{" "}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 class="text-black text-base font-semibold my-6">
                      Measurements
                    </h4>
                    <div class="ml-5">
                      <span class="font-normal mr-7">1. Center Back </span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>75 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-7">2. Sleeve Length</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>65 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">3. 1/2 Chest</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>72 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">4. 1/2 Waist Open</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>65 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">5. 1/2 Hip</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>64 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">6. SH. To Shoulder</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>88 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">7. Lapel Width</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>24 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">8. Cuff Opening</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>30 cm</b>
                      </label>{" "}
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-20">9. 1/2 Biceps</span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>44 cm</b>
                      </label>{" "}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 class="text-black text-base font-semibold my-6">
                      Shipping
                    </h4>
                    <div class="ml-5">
                      <span class="font-normal mr-7">Express Delivery </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <h4 class="text-black text-base font-semibold my-6">
                      Additional Options
                    </h4>
                    <div class="ml-5">
                      <span class="font-normal mr-7">
                        Sleeves Button Holes{" "}
                      </span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>Yes</b>
                      </label>
                    </div>
                    <div class="ml-5">
                      <span class="font-normal mr-7">Initials </span>
                      <label class="bg-[#EEEDED] px-14 py-0.5 border rounded-2xl float-end">
                        <b>Rich</b>
                      </label>
                    </div>
                  </div>
                  <div className="mt-28">
                    <img src="/assets/images/Coat.png" />
                    <h3 class="text-black text-lg font-semibold mt-10 text-center">
                      Model Num: &nbsp; <span class="font-normal"> 224C4 </span>
                    </h3>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-black text-base font-semibold my-6">
                  Quotation
                </h4>
                <input
                  className=" text-base bg-[#EEEDED] px-3 py-2 rounded-lg focus:outline-none"
                  type="text"
                />
                <Button className="py-3 px-6 ml-2">Approve</Button>
                <span className="mx-3">or</span>
                <Button className="py-3 px-6">Disapprove</Button>
              </div>
            </div>
            <div class="col-span-1">
              <div class="bg-white border rounded-xl p-6">
                <div className="flex flex-row justify-end mr-6 mb-3">
              <Button className="py-3 px-8 rounded-md">+ Send</Button></div>
              <hr class="border-t-1 border-gray-300"></hr>
              <textarea rows="3" placeholder="Start typing to leave a note..." className="w-full font-light mt-6"></textarea>
              <div className="flex justify-end mr-6 w-full">
              <input type="file" class="file:bg[#F4F4F4] file:p-3 file:border-0 file:text-[#666666]"></input></div>
              </div>
              <div className="space-y-4">
                <h4 class="text-black text-base font-semibold my-6">
                  Activity
                </h4>
                <div className="bg-[#C9D2FF] border rounded-md p-5">
                  <div className="flex flex-row justify-between mb-4">
                    <span class="font-semibold">Mahnoor, The Boss</span>
                    <span class="font-semibold">24 October</span>
                  </div>
                  <div className="w-9/12">
                    <span class="font-extralight text-[#00000073]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been.
                    </span>
                  </div>
                </div>
                <div className="bg-[#FFFFFF] border rounded-md p-5">
                  <div className="flex flex-row justify-between mb-4">
                    <span class="font-semibold">Adeel Tailor</span>
                    <span class="font-semibold">24 October</span>
                  </div>
                  <div className="w-9/12">
                    <span class="font-extralight text-[#00000073]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been.
                    </span>
                  </div>
                </div>
                <div className="bg-[#FFFFFF] border rounded-md p-5">
                  <div className="flex flex-row justify-between mb-4">
                    <span class="font-semibold">Mahnoor, The Boss</span>
                    <span class="font-semibold">24 October</span>
                  </div>
                  <div className="w-9/12">
                    <span class="font-extralight text-[#00000073]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been.
                    </span>
                  </div>
                </div>
                <div className="bg-[#FFFFFF] border rounded-md p-5">
                  <div className="flex flex-row justify-between mb-4">
                    <span class="font-semibold">Adeel Tailor</span>
                    <span class="font-semibold">24 October</span>
                  </div>
                  <div className="w-9/12">
                    <span class="font-extralight text-[#00000073]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been.
                    </span>
                  </div>
                </div>
                <div className="bg-[#FFFFFF] border rounded-md p-5">
                  <div className="flex flex-row justify-between mb-4">
                    <span class="font-semibold">Added Note</span>
                    <span class="font-semibold">24 October</span>
                  </div>
                  <div className="w-9/12">
                    <span class="font-extralight text-[#00000073]">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been.
                    </span>
                  </div>
                </div>
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
