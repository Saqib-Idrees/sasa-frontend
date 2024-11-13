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
import { Switch } from "@material-tailwind/react";

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
            <div className="grid gap-7 grid-cols-3 pb-8">
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
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
            <div className="mb-10">
              <h3 class="font-bold text-3xl text-center">Product</h3>
            </div>
            <div className="grid gap-2 grid-cols-6 my-7">
              <div className="mt-10">
                <img src="/assets/images/Suit (1).png" />
                <p class="font-normal text-xl text-center mt-6"> Suit </p>
              </div>
              <div className="mt-10">
                <img src="/assets/images/Coats (1).png" />
                <p class="font-normal text-xl text-center mt-6"> Coat </p>
              </div>
              <div className="mt-10">
                <img src="/assets/images/Jackets (1).png" />
                <p class="font-normal text-xl text-center mt-6"> Jacket </p>
              </div>
              <div className="mt-10">
                <img src="/assets/images/Pants (1).png" />
                <p class="font-normal text-xl text-center mt-6"> Trouser </p>
              </div>
              <div className="mt-10">
                <img src="/assets/images/Vest (1).png" />
                <p class="font-normal text-xl text-center mt-6"> Vest </p>
              </div>
              <div className="mt-10">
                <img src="/assets/images/Shirts (1).png" />
                <p class="font-normal text-xl text-center mt-6"> Shirt </p>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
            <div className="mb-10">
              <h3 class="font-bold text-3xl text-center">Fabric Details</h3>
            </div>
            <div className="grid gap-16 grid-cols-2 my-7">
              <div className="space-y-5">
                <div class="pb-7 place-self-end">
                  <label class="font-normal mr-7">Jacket Fabric# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg "
                    type="text"
                  />
                </div>
                <div class="pb-7 place-self-end">
                  <label class="font-normal mr-7">Jacket Lining# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
                <div class="pb-7 place-self-end">
                  <label class="font-normal mr-7">Button# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-5">
                <div class="pb-7">
                  <label class="font-normal mr-7">Vest Fabric# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
                <div class="pb-7">
                  <label class="font-normal mr-7">Vest Lining# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
                <div class="pb-7">
                  <label class="font-normal mr-7">Trouser Fabric# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
            <div className="mb-16">
              <h3 class="font-bold text-3xl text-center">Additional Options</h3>
            </div>
            <div className="grid gap-6 grid-cols-3 my-8 justify-items-center">
              <div className="inline-flex gap-12">
                <div class="relative inline-block self-center">
                  <p className="text-2xl font-normal">Sleeve Button Holes</p>
                </div>
                <div class="relative inline-block">
                  <Switch
                    id="custom-switch-component-one"
                    ripple={false}
                    className="h-full w-full checked:bg-[#2ec946]"
                    containerProps={{
                      className: "w-20 h-11",
                    }}
                    circleProps={{
                      className: "h-11 w-11 before:hidden border-none",
                    }}
                  />
                </div>
              </div>
              <div className="inline-flex gap-12">
                <div class="relative inline-block self-center">
                  <p className="text-2xl font-normal">Shirt</p>
                </div>
                <div class="relative inline-block">
                  <Switch
                    id="custom-switch-component-two"
                    ripple={false}
                    className="h-full w-full checked:bg-[#2ec946]"
                    containerProps={{
                      className: "w-20 h-11",
                    }}
                    circleProps={{
                      className: "h-11 w-11 before:hidden border-none",
                    }}
                  />
                </div>
              </div>
              <div className="inline-flex gap-12">
                <div class="relative inline-block self-center">
                  <p className="text-2xl font-normal">Vest</p>
                </div>
                <div class="relative inline-block">
                  <Switch
                    id="custom-switch-component-three"
                    ripple={false}
                    className="h-full w-full checked:bg-[#2ec946]"
                    containerProps={{
                      className: "w-20 h-11",
                    }}
                    circleProps={{
                      className: "h-11 w-11 before:hidden border-none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
            <div className="mb-16">
              <h3 class="font-bold text-3xl text-center">Style</h3>
            </div>
            <div className="grid gap-6 grid-cols-2 my-8">
              <div className="justify-items-center">
                <div class="ml-5 mt-14">
                  <span class="font-normal mr-20 text-xl">Regular:</span>
                  <Button className="py-5 px-4 font-normal normal-case text-base">
                    Single-Breasted
                  </Button>
                  <Button className="py-5 px-4 ml-4 font-normal normal-case text-base">
                    Double-Breasted
                  </Button>
                </div>
                <div class="ml-5 mt-14">
                  <span class="font-normal mr-20 text-xl">Shawl:</span>
                  <Button className="py-5 px-4 font-normal normal-case text-base">
                    Single-Breasted
                  </Button>
                  <Button className="py-5 px-4 ml-4 font-normal normal-case text-base">
                    Double-Breasted
                  </Button>
                </div>
                <div class="ml-5 mt-20">
                  <span class="text-black text-base font-normal mr-14">
                    Model Num:
                  </span>
                  <label className=" text-base bg-[#F3F2F2] px-32 py-4 rounded-lg focus:outline-none">
                    224C4
                  </label>
                </div>
              </div>
              <div className="space-y-5 justify-items-center">
                <img
                  src="/assets/images/Single Breasted Tuxedo.svg"
                  className="w-2/5"
                />
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
            <div className="mb-10">
              <h3 class="font-bold text-3xl text-center">Measurements</h3>
            </div>
            <div className="grid gap-32 grid-cols-2 my-7">
              <div className="space-y-4 ml-10 mt-7">
                <div class="pb-7 ml-5">
                  <label class="font-normal">1. Center Back </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">2. Sleeve Length </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">3. 1/2 Chest </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">4. 1/2 Waist Open </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">5. 1/2 Hip </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">6. SH. To Shoulder </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">7. Lapel Width </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">8. Cuff Opening </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div class="pb-7 ml-5">
                  <label class="font-normal">9. 1/2 Biceps </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                    type="text"
                  />
                </div>
                <div>
                  <h4 class="text-black text-2xl font-semibold my-6">
                    Initials
                  </h4>
                  <input
                    className=" text-base bg-[#EEEDED] px-3 py-2 rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Type your text here........"
                  />
                </div>
                <div className="mt-10">
                  <h4 class="text-black text-2xl font-semibold my-6">
                    Special Instructions / Recorded Preferences
                  </h4>
                  <textarea
                    rows="8"
                    placeholder="Type your text here........"
                    className="w-full font-light bg-[#EEEDED] border rounded-lg p-6"
                  ></textarea>
                </div>
              </div>
              <div className="mt-28">
                <img src="/assets/images/Coat.png" />
              </div>
              {/* <div className="space-y-5">
                <div class="pb-7 place-self-end">
                  <label class="font-normal mr-7">Jacket Fabric# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg "
                    type="text"
                  />
                </div>
                <div class="pb-7 place-self-end">
                  <label class="font-normal mr-7">Jacket Lining# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
                <div class="pb-7 place-self-end">
                  <label class="font-normal mr-7">Button# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-5">
                <div class="pb-7">
                  <label class="font-normal mr-7">Vest Fabric# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
                <div class="pb-7">
                  <label class="font-normal mr-7">Vest Lining# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
                <div class="pb-7">
                  <label class="font-normal mr-7">Trouser Fabric# </label>
                  <input
                    className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                    type="text"
                  />
                </div>
              </div> */}
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
