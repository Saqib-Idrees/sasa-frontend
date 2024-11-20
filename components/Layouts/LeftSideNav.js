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
    <aside className="bg-white -translate-x-80 fixed inset-0 z-50 min-h-[calc(100vh-32px)] w-72 transition-transform duration-300 xl:translate-x-0">
      <div className={`relative`}>
        <Link href="/" className="py-6 px-4 block">
          <img src="/assets/images/logo.svg"
            className="w-24 mx-auto" />
        </Link>
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
      <div className="p-4">
        <ul className="h-[calc(100vh-174px)] overflow-y-auto">
          <li className="">
            <Link href="/">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <HomeIcon {...icon} />
                <Typography
                  className="text-lg text-base text-black font-medium"
                >
                  Dashboard
                </Typography>
              </Button>
            </Link>
          </li>

          <li className="">
            <Link href="/orders">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <ArchiveBoxIcon {...icon} />
                <Typography
                  className="text-lg text-base text-black font-medium"
                >
                  Orders
                </Typography>
              </Button>
            </Link>
            <ul className="pl-[38px]">
              <li className="">
                <Link href="javascript:void(0)">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg text-base text-black font-medium"
                    >
                      Pending
                    </Typography>
                  </Button>
                </Link>
              </li>

              <li className="">
                <Link href="javascript:void(0)">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg text-base text-black font-medium"
                    >
                      In-Production
                    </Typography>
                  </Button>
                </Link>
              </li>

              <li className="">
                <Link href="javascript:void(0)">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg text-base text-black font-medium"
                    >
                      Shipped
                    </Typography>
                  </Button>
                </Link>
              </li>

              <li className="">
                <Link href="javascript:void(0)">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg text-base text-black font-medium"
                    >
                      Cancelled
                    </Typography>
                  </Button>
                </Link>
              </li>

              <li className="">
                <Link href="javascript:void(0)">
                  <Button
                    variant={"text"}
                    color={"dark"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <Typography
                      className="text-lg text-base text-black font-medium"
                    >
                      Received
                    </Typography>
                  </Button>
                </Link>
              </li>
            </ul>
          </li>

          <li className="">
            <Link href="/users/sales-team">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <UsersIcon {...icon} />
                <Typography
                  className="text-lg text-base text-black font-medium"
                >
                  Sales Team
                </Typography>
              </Button>
            </Link>
          </li>

          <li className="">
            <Link href="/users/tailors">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <UsersIcon {...icon} />
                <Typography
                  className="text-lg text-base text-black font-medium"
                >
                  Tailors
                </Typography>
              </Button>
            </Link>
          </li>

          <li className="">
            <Link href="javascript:void(0)">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <UserIcon {...icon} />
                <Typography
                  className="text-lg text-base text-black font-medium"
                >
                  Profile
                </Typography>
              </Button>
            </Link>
          </li>
        </ul>
        <ul>
          <li className="">
            <Link href="javascript:void(0)">
              <Button
                variant={"text"}
                color={"dark"}
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                <ArrowRightIcon {...icon} />
                <Typography
                  className="text-lg text-base text-black font-medium"
                >
                  Log out
                </Typography>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default LeftSideNav;
