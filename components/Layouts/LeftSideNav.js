// import { Link, NavLink } from "react-router-dom";
import Link from "next/link";
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArchiveBoxIcon,
  UserIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
// import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function LeftSideNav() {
  // const [controller, dispatch] = useMaterialTailwindController();
  // const { sidenavColor, sidenavType, openSidenav } = controller;
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  const routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/home",
          // element: <Home />,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "profile",
          path: "/profile",
          // element: <Profile />,
        },
        {
          icon: <TableCellsIcon {...icon} />,
          name: "tables",
          path: "/tables",
          // element: <Tables />,
        },
        {
          icon: <InformationCircleIcon {...icon} />,
          name: "notifications",
          path: "/notifications",
          // element: <Notifications />,
        },
      ],
    },
    {
      title: "auth pages",
      layout: "auth",
      pages: [
        {
          icon: <ServerStackIcon {...icon} />,
          name: "sign in",
          path: "/sign-in",
          // element: <SignIn />,
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "sign up",
          path: "/sign-up",
          // element: <SignUp />,
        },
      ],
    },
  ];
  return (
    <aside className="bg-white shadow-sm -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
      <div className={`relative`}>
      <a href="#" className="py-6 px-8 text-center">
          <img src="/assets/images/logo.svg"
            className="w-36 mx-auto" />
        </a>
        {/* <IconButton
          variant="text"
          color="dark"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
        // onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton> */}
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li className="mx-3.5 mt-4 mb-2">
            <a href="#">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <HomeIcon {...icon} />
                <Typography
                  className="text-lg font-medium text-black"
                >
                  Dashboard
                </Typography>
              </Button>
            </a>
          </li>

          <li className="mx-3.5 mb-2">
            <a href="#">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <ArchiveBoxIcon {...icon} />
                <Typography
                  className="text-lg font-medium text-black"
                >
                  Orders
                </Typography>
              </Button>
            </a>

            <ul className="flex flex-col gap-1">
              <li className="mx-3.5 mb-2">
                <a href="#">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg font-medium text-black"
                    >
                      Pending
                    </Typography>
                  </Button>
                </a>
              </li>

              <li className="mx-3.5 mb-2">
                <a href="#">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg font-medium text-black"
                    >
                      In-Production
                    </Typography>
                  </Button>
                </a>
              </li>

              <li className="mx-3.5 mb-2">
                <a href="#">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg font-medium text-black"
                    >
                      Shipped
                    </Typography>
                  </Button>
                </a>
              </li>

              <li className="mx-3.5 mb-2">
                <a href="#">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg font-medium text-black"
                    >
                      Cancelled
                    </Typography>
                  </Button>
                </a>
              </li>

              <li className="mx-3.5 mb-2">
                <a href="#">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg font-medium text-black"
                    >
                      Received
                    </Typography>
                  </Button>
                </a>
              </li>
            </ul>
          </li>

          <li className="mx-3.5 mb-2">
            <Link href="/users/sales-team">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <UsersIcon {...icon} />
                <Typography
                  className="text-lg font-medium text-black"
                >
                  Sales Team
                </Typography>
              </Button>
            </Link>
          </li>

          <li className="mx-3.5 mb-2">
            <Link href="/users/tailors">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <UsersIcon {...icon} />
                <Typography
                  className="text-lg font-medium text-black"
                >
                  Tailors
                </Typography>
              </Button>
            </Link>
          </li>

          <li className="mx-3.5 mb-2">
            <a href="#">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <UserIcon {...icon} />
                <Typography
                  className="text-lg font-medium text-black"
                >
                  Profile
                </Typography>
              </Button>
            </a>
          </li>

          <li className="mx-3.5 mb-2 position: absolute bottom-0">
            <a href="#">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <ArrowRightIcon {...icon} />
                <Typography
                  className="text-lg font-medium text-black"
                >
                  Log out
                </Typography>
              </Button>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default LeftSideNav;
