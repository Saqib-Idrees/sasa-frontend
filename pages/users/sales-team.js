import Layout from "@/components/Layouts/DashLayout/Layout";
import TailorCard from "@/components/cards/tailorCard";
import { Button, IconButton, Input, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "slices/authAPI";
import { useRouter } from "next/router";

const Tailors = () => {
  const [tailors, setTailors] = useState([]);
  const router = useRouter();

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
    isError: usersIsError,
    isFetching: usersIsFetching,
  } = useGetAllUsersQuery("");

  useEffect(() => {
    if (usersData) {
      const users = Object.values(usersData);
      if (Array.isArray(users) && users.length > 0) {
        const tailors = users.filter(user => user.role !== "Admin");
        setTailors([...tailors]);

      }
    }
    console.log(usersData);
    console.log(usersError);
    console.log(usersIsLoading);
    console.log(usersIsFetching);
  }, [usersData]);

  useEffect(() => {
    if (usersIsError) {
      console.log(usersIsError);
    }
  }, [usersIsError]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-120px)]">
        <div className="space-y-2 justify-self-end content-center">
          <Button
            className="py-3 px-5 font-normal normal-case text-sm mb-5"
            onClick={() => {
              router.push("/users/create");
            }}
          >
            + Create Sales Agent
          </Button>
        </div>
        <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {usersIsLoading || usersIsFetching || usersData === undefined ? (
            <Spinner animation="border" variant="success" />
          ) : (
            <>
              {tailors.map((item, index) => {
                return (
                    <TailorCard
                     key={index}
                      type='Sales'
                      item={item}
                      tailorName={item.firstname}
                      orders={item.orders || "10"}
                      shopName={item.shopName || "Cuciture di Lusso"}
                      location={item.location || "Venice, Italy "}
                    />
                );
              })}
              
            </>
          )}
        </div>
        {tailors.length === 0 && (<div className="full-height"><p className="text-center">No User Found.</p></div>)}
      </div>
    </Layout>
  );
};

export default Tailors;
