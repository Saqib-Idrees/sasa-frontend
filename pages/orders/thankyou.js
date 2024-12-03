import {
  selectCurrentUser,
} from "slices/authSlice";
import { useSelector } from "react-redux";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

import { useGetAllPostsQuery } from "slices/postsAPI";
import Layout from "@/components/Layouts/DashLayout/Layout";

export default function View() {
  const user = useSelector(selectCurrentUser);

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
        <div className="w-full">
          <h2 className="font-bold text-3xl">Customer Details</h2>
          <div className="mt-6 bg-white rounded-xl justify-items-center content-center h-[45rem]">
            <img src="/assets/images/check_circle.png"
                  className="w-[12%]"/>
            <h3 className="text-center text-3xl my-4">Order has been placed</h3>
            <a href="#" className="underline decoration-solid text-lg">Return to Dashboard</a>
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
