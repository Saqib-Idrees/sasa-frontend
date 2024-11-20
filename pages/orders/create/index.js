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
import TailorCard from "@/components/cards/tailorCard";

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


  const Tailors = [
    {
      tailorName: 'Ezio',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Lorenzo',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Altair',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Mario',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Madeci',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Chezare',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Salvador',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Lorenzo',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Altair',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Mario',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Madeci',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    },
    {
      tailorName: 'Chezare',
      orders: 5,
      shopName: 'Cuciture di Lusso',
      location: 'Venice, Italy'
    }
  ]

  const [showStep, setShowStep] = useState("step1");

  return (
    <div>
      <Layout>
        <h3 className="text-2xl mb-5">Create Order</h3>

        {showStep == "step1" &&
          <div className="order-create-step1">
            <div className="bg-white border rounded-3xl px-9 py-8">
              <div className="max-w-[550px] w-full mx-auto">
                <div className="flex flex-wrap mx-[-12px] mt-[-24px]">
                  <div className="w-[75%] px-3 mt-6">
                    <Input label="Customer ID" />
                  </div>
                  <div className="w-[25%] px-3 mt-6">
                    <Button className="bg-black text-white rounded-3xl w-full p-3">Look Up</Button>
                  </div>
                  <div className="w-[50%] px-3 mt-6">
                    <Input label="First Name" />
                  </div>
                  <div className="w-[50%] px-3 mt-6">
                    <Input label="Last Name" />
                  </div>
                  <div className="w-[50%] px-3 mt-6">
                    <Input label="Email Adress" type="email" />
                  </div>
                  <div className="w-[50%] px-3 mt-6">
                    <Input label="Phone Number" type="number" />
                  </div>
                  <div className="w-[100%] px-3 mt-6">
                    <Button className="bg-black text-white rounded-3xl w-full p-3" onClick={() => { setShowStep("step2") }}>Next</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {showStep == "step2" &&
          <div className="order-create-step2">
            <div className="bg-white border rounded-3xl px-9 py-8">
              <div className="flex flex-wrap mx-[-8px] mt-[-24px]">
                {Tailors.map((item, index) => {
                  return (
                    <div className="w-[25%] px-2 mt-4">
                      <TailorCard
                        key={index}
                        tailorName={item.tailorName}
                        orders={item.orders}
                        shopName={item.shopName}
                        location={item.location}
                      />
                    </div>
                  )
                })}

                <div className="w-[100%] px-3 mt-6">
                  <div className="max-w-[550px] w-full mx-auto">
                    <Button className="bg-black text-white rounded-3xl w-full p-3" onClick={() => { setShowStep("step3") }}>Next</Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        }

        {showStep == "step3" &&
          <div className="order-create-step3">
            <div className="bg-white border rounded-3xl px-9 py-8">
              <div className="max-w-[550px] w-full mx-auto">
                <h4 className="font-bold text-2xl mb-12">Order ID #917583</h4>
                <div className="flex flex-wrap mx-[-8px] mt-[-24px]">
                  <div className="w-[50%] px-2 mt-4">
                    <h6 className="text-black text-lg font-semibold pb-4">Customer Name:</h6>
                  </div>
                  <div className="w-[50%] px-2 mt-4">
                    <div>Richard Grey</div>
                  </div>
                </div>
                <div className="flex flex-wrap mx-[-8px] mt-[-24px]">
                  <div className="w-[50%] px-2 mt-4">
                    <h6 className="text-black text-lg font-semibold pb-4">Email:</h6>
                  </div>
                  <div className="w-[50%] px-2 mt-4">
                    <div>info@gmail.com</div>
                  </div>
                </div>
                <div className="flex flex-wrap mx-[-8px] mt-[-24px]">
                  <div className="w-[50%] px-2 mt-4">
                    <h6 className="text-black text-lg font-semibold pb-4">Contact Num:</h6>
                  </div>
                  <div className="w-[50%] px-2 mt-4">
                    <div>+00123456789</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
              <div className="mb-10">
                <h4 className="font-bold text-2xl mb-12 text-center">Product</h4>
              </div>
              <div className="grid gap-6 grid-cols-6 mb-7">
                <div className="">
                  <img src="/assets/images/Suit (1).png" />
                  <p className="font-normal text-center mt-6"> Suit </p>
                </div>
                <div className="">
                  <img src="/assets/images/Coats (1).png" />
                  <p className="font-normal text-center mt-6"> Coat </p>
                </div>
                <div className="">
                  <img src="/assets/images/Jackets (1).png" />
                  <p className="font-normal text-center mt-6"> Jacket </p>
                </div>
                <div className="">
                  <img src="/assets/images/Pants (1).png" />
                  <p className="font-normal text-center mt-6"> Trouser </p>
                </div>
                <div className="">
                  <img src="/assets/images/Vest (1).png" />
                  <p className="font-normal text-center mt-6"> Vest </p>
                </div>
                <div className="">
                  <img src="/assets/images/Shirts (1).png" />
                  <p className="font-normal text-center mt-6"> Shirt </p>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
              <div className="mb-10">
                <h4 className="font-bold text-2xl mb-12 text-center">Fabric Details</h4>
              </div>
              <div className="grid gap-16 grid-cols-2 my-7">
                <div className="space-y-5">
                  <div className="pb-7 place-self-end">
                    <label className="font-normal mr-7">Jacket Fabric# </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg "
                      type="text"
                    />
                  </div>
                  <div className="pb-7 place-self-end">
                    <label className="font-normal mr-7">Jacket Lining# </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 place-self-end">
                    <label className="font-normal mr-7">Button# </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="pb-7">
                    <label className="font-normal mr-7">Vest Fabric# </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="pb-7">
                    <label className="font-normal mr-7">Vest Lining# </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg"
                      type="text"
                    />
                  </div>
                  <div className="pb-7">
                    <label className="font-normal mr-7">Trouser Fabric# </label>
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
                <h4 className="font-bold text-2xl mb-12 text-center">Additional Options</h4>
              </div>
              <div className="grid gap-6 grid-cols-3 my-8 justify-items-center">
                <div className="inline-flex items-center gap-12">
                  <div className="relative inline-block self-center">
                    <p className="">Sleeve Button Holes</p>
                  </div>
                  <div className="relative inline-block">
                    <Switch
                      id="custom-switch-component-one"
                      ripple={false}
                      className="h-full w-full checked:bg-[#2ec946]"
                      containerProps={{
                        className: "w-12 h-6",
                      }}
                      circleProps={{
                        className: "h-8 w-8 before:hidden border-none",
                      }}
                    />
                  </div>
                </div>
                <div className="inline-flex gap-12">
                  <div className="relative inline-block self-center">
                    <p className="">Shirt</p>
                  </div>
                  <div className="relative inline-block">
                    <Switch
                      id="custom-switch-component-two"
                      ripple={false}
                      className="h-full w-full checked:bg-[#2ec946]"
                      containerProps={{
                        className: "w-12 h-6",
                      }}
                      circleProps={{
                        className: "h-8 w-8 before:hidden border-none",
                      }}
                    />
                  </div>
                </div>
                <div className="inline-flex gap-12">
                  <div className="relative inline-block self-center">
                    <p className="">Vest</p>
                  </div>
                  <div className="relative inline-block">
                    <Switch
                      id="custom-switch-component-three"
                      ripple={false}
                      className="h-full w-full checked:bg-[#2ec946]"
                      containerProps={{
                        className: "w-12 h-6",
                      }}
                      circleProps={{
                        className: "h-8 w-8 before:hidden border-none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-3xl px-9 py-8 mt-5">
              <div className="mb-16">
                <h4 className="font-bold text-2xl mb-12 text-center">Style</h4>
              </div>
              <div className="grid gap-6 grid-cols-2 my-8">
                <div className="justify-items-center">
                  <div className="ml-5 mt-14 flex items-center gap-3">
                    <span className="mr-3">Regular:</span>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                      <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="bordered-radio-1" className="w-full py-4 pe-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Single-Breasted</label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                      <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="bordered-radio-2" className="w-full py-4 pe-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Double-Breasted</label>
                    </div>
                  </div>
                  <div className="ml-5 mt-14 flex items-center gap-3">
                    <span className="mr-3">Shawl:</span>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                      <input id="bordered-radio-1" type="radio" value="" name="bordered-radio2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="bordered-radio2-1" className="w-full py-4 pe-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Single-Breasted</label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                      <input checked id="bordered-radio2-2" type="radio" value="" name="bordered-radio2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label for="bordered-radio2-2" className="w-full py-4 pe-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Double-Breasted</label>
                    </div>
                  </div>
                  <div className="ml-5 mt-20">
                    <span className="text-black text-base font-normal mr-14">
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
                <h4 className="font-bold text-2xl mb-12 text-center">Measurements</h4>
              </div>
              <div className="grid gap-32 grid-cols-2 my-7">
                <div className="space-y-4 ml-10 mt-7">
                  <div className="pb-7 ml-5">
                    <label className="font-normal">1. Center Back </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">2. Sleeve Length </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">3. 1/2 Chest </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">4. 1/2 Waist Open </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">5. 1/2 Hip </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">6. SH. To Shoulder </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">7. Lapel Width </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">8. Cuff Opening </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div className="pb-7 ml-5">
                    <label className="font-normal">9. 1/2 Biceps </label>
                    <input
                      className="text-base px-4 py-3 bg-[#EEEDED] rounded-lg float-end"
                      type="text"
                    />
                  </div>
                  <div>
                    <h4 className="text-black text-2xl font-semibold my-6">
                      Initials
                    </h4>
                    <input
                      className=" text-base bg-[#EEEDED] px-3 py-2 rounded-lg focus:outline-none"
                      type="text"
                      placeholder="Type your text here........"
                    />
                  </div>
                  <div className="mt-10">
                    <h4 className="text-black text-2xl font-semibold my-6">
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
              </div>
              <div className="w-[100%] px-3 mt-6">
                <div className="max-w-[550px] w-full mx-auto">
                  <Button className="bg-black text-white rounded-3xl w-full p-3" onClick={() => { setShowStep("step4") }}>Next</Button>
                </div>
              </div>
            </div>
          </div>
        }

        {showStep == "step4" &&
          <div className="order-create-step4">
            <div className="bg-white border rounded-3xl px-9 py-8">
              <div className="max-w-[550px] w-full mx-auto">
                <h4 class="font-bold text-2xl mb-12 text-center">STEP 4</h4>
                <div className="mt-4">
                  <div className="">
                    <Button className="bg-black text-white rounded-3xl w-full p-3" onClick={() => { setShowStep("step1") }}>Next</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {showStep == "step5" &&
          <div className="order-create-step4">
            <div className="bg-white border rounded-3xl px-9 py-8">
              <div className="max-w-[550px] w-full mx-auto">
                <h4 class="font-bold text-2xl mb-12 text-center">STEP 5</h4>
                <div className="mt-4">
                  <div className="">
                    <Button className="bg-black text-white rounded-3xl w-full p-3" onClick={() => { setShowStep("step5") }}>Next</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }


      </Layout>
      {postsIsLoading || postsIsFetching || postsData === undefined ? (
        <Spinner animation="border" variant="success" />
      ) : (
        <>
          <h4>All Posts</h4>
          {postsData.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
}
