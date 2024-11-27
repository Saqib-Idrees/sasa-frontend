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
import { ListGroup, Spinner } from "react-bootstrap";
import Link from "next/dist/client/link";
import { useEffect } from "react";
import router from "next/router";
import { useGetUserQuery } from "slices/authAPI";
import { useDispatch } from "react-redux";
import Post from "@/components/Post";

import { useGetAllPostsQuery } from "slices/postsAPI";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { IconButton, Input } from "@material-tailwind/react";
import { Bars3Icon, H1Icon } from "@heroicons/react/24/solid";

export default function Home() {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(user, isAuthenticated);
  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/dashboard'); // Redirect to the dashboard
    } else {
      router.push('/login'); // Redirect to the login page
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl mb-4">SASA Milano</h1>
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mt-4 py-4 px-16"
          onClick={handleClick}
        >
          {isAuthenticated ? "Dashboard" : "Login"}
        </button>
      </div>
    </div>
  );
}
