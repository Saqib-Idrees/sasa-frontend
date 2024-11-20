import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { DashboardNavbar } from "@/components/Layouts/DashLayout/dashboard-navbar";
import Footer from "../Footer";
import LeftSideNav from "../LeftSideNav";
import { Meta } from "../Meta";
import { AppConfig } from "utils/appConfig";
// import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard({ children, title, content }) {
  // const [controller, dispatch] = useMaterialTailwindController();
  // const { sidenavType } = controller;
  return (
    <div className="main-content-view">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <div className="main-wrapper">
        <div className="min-h-screen">
          <LeftSideNav />
          <div className="pt-4 px-4 xl:ml-72 flex flex-wrap flex-col min-h-screen">
            <DashboardNavbar />
            {/* <Configurator /> */}
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
            // onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <main className="rounded-3xl bg-[#F4F4F4] p-6 flex-1 w-full">{children}</main>
            <div className="text-blue-gray-600 w-full">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
