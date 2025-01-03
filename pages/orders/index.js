import React, { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import { createStyles } from "antd-style";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Layout from "@/components/Layouts/DashLayout/Layout";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useGetAllPostsQuery } from "slices/postsAPI";
import { useRouter } from "next/router";
import {
  selectAccess,
  selectCurrentUser,
  selectIsAuthenticated,
  selectRefresh,
  setUser,
} from "slices/authSlice";
import { useGetOrdersBySalesAgentQuery } from "slices/orderApi";
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
  EyeIcon,
} from "@heroicons/react/24/solid";
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const columns = [
  {
    title: "Sales Agent",
    width: 150,
    dataIndex: "sales_agent",
    key: "sales_agent",
  },
  {
    title: "Order Id ",
    width: 150,
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Customer name",
    dataIndex: "customer",
    key: "customer.firstname",
    width: 150,
    render: (text, record) => (
      <span>
        {record.customer.firstname} {record.customer.lastname}
      </span>
    ),
  },
  {
    title: "Customer  ID",
    dataIndex: "customer_id",
    key: "customer_id",
    width: 150,
    render: (text, record) => <span>{record.customer_id}</span>,
  },
  {
    title: "Item",
    dataIndex: "type",
    key: "type",
    width: 150,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    filters: [
      {
        text: "Pending",
        value: "Pending",
      },
      {
        text: "Shipped",
        value: "Shipped",
      },
      {
        text: "Cancelled",
        value: "Cancelled",
      },
      {
        text: "Received",
        value: "Received",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: "Tailor",
    dataIndex: "tailor_id",
    key: "tailor_id",
    width: 150,
  },
  {
    title: "Delivery date",
    dataIndex: "delivery_date",
    key: "delivery_date",
    width: 150,
  },
  {
    title: "Notes",
    dataIndex: "initials",
    key: "initials",
    width: 300,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 150,
  },
  {
    title: "Tracking code",
    dataIndex: "order_id",
    key: "order_id",
    width: 150,
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: (text, record) => (
      <div className="text-center">
        <a
          className="flex items-center justify-center"
          title="View"
          href={`orders/view/${record.id}`}
        >
          <EyeIcon className="size-6" />
        </a>
      </div>
    ),
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const dataSource = [
  {
    key: "1",
    name: "Elijah Scott",
    oid: "#917583",
    cname: "Richard Grey",
    cid: "002586691022",
    item: "Vest",
    status: "Pending",
    tailor: "Ezio Auditori",
    ddate: "29-09-24",
    notes: "Vest order has been placed................",
    shipping: "Standard",
    tcode: "940010010936113003113",
  },
  {
    key: "2",
    name: "Baldwin Adams",
    oid: "#129934",
    cname: "Barry Allen",
    cid: "002586691033",
    item: "Suit",
    status: "Inproduction",
    tailor: "Lucca",
    ddate: "17-08-24",
    notes: "Suit Jacket order has been placed................",
    shipping: "Express",
    tcode: "940010010936113003122",
  },
  {
    key: "3",
    name: "Smantha",
    oid: "#010538",
    cname: "Cindy Sweeney",
    cid: "002586691044",
    item: "American Trousers",
    status: "Shipped",
    tailor: "Fonsi",
    ddate: "12-08-24",
    notes: "American Trouser order has been placed...........",
    shipping: "Standard",
    tcode: "940010010936113003133",
  },
  {
    key: "4",
    name: "Alana Grey",
    oid: "#100696",
    cname: "Alana Bloom",
    cid: "002586691055",
    item: "Pleated Trousers",
    status: "Cancelled",
    tailor: "Lorenzo",
    ddate: "15-05-24",
    notes: "Suit Jacket order has been placed................",
    shipping: "Standard",
    tcode: "940010010936113003113",
  },
  {
    key: "5",
    name: "Racheal McAdams",
    oid: "#030393",
    cname: "Racheal Rey",
    cid: "002586691066",
    item: "Shirt",
    status: "Shipped",
    tailor: "Lorenzo",
    ddate: "29-09-24",
    notes: "Suit Jacket order has been placed................",
    shipping: "Standard",
    tcode: "940010010936113003113",
  },
];

const OrderList = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]); // For table data

  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(user.userdata.id);
  const router = useRouter();
  const { styles } = useStyle();

  const {
    data: ordersData,
    error,
    isLoading,
    isFetching,
  } = useGetOrdersBySalesAgentQuery(user?.userdata?.id, {
    skip: !user?.userdata?.id, // Skip query if no user ID is available
  });

  useEffect(() => {
    if (ordersData) {
      console.log("Fetched orders:", ordersData);
      setFilteredData([...ordersData]);
    }
  }, [ordersData]);

  useEffect(() => {
    if (searchText) {
      const filtered = ordersData.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(ordersData);
    }
  }, [searchText]);

  return (
    <div>
      {isLoading || isFetching || ordersData === undefined ? (
        <Layout>
          <Spinner animation="border" variant="success" />
        </Layout>
      ) : (
        <>
          <Layout>
            <h2 className="font-bold text-3xl">Orders</h2>
            <div className="bg-white border rounded-2xl p-7 mt-6">
              <div className="grid grid-cols-2">
                <div className="space-y-2 justify-self-start">
                  <div className="mr-auto md:mr-4 md:w-72 my-8">
                    <input
                      className="text-base px-4 py-3 border rounded-md focus:outline-none focus:border-black"
                      placeholder="Search here ..."
                      onChange={(e) => setSearchText(e.target.value)} // Update search query
                      value={searchText}
                    />
                  </div>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    className="grid xl:hidden"
                    onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                  >
                    <Bars3Icon
                      strokeWidth={3}
                      className="h-6 w-6 text-blue-gray-500"
                    />
                  </IconButton>
                </div>
                <div className="space-y-2 justify-self-end content-center">
                  <Button
                    className="py-3 px-5 font-normal normal-case text-sm"
                    onClick={() => {
                      router.push("/orders/create");
                    }}
                  >
                    + Create Order
                  </Button>
                </div>
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      cellPaddingBlock: 32,
                    },
                  },
                }}
              >
                <Table
                  className={styles.customTable}
                  columns={columns}
                  dataSource={filteredData}
                  scroll={{ x: 1500 }}
                />
              </ConfigProvider>
            </div>
          </Layout>
        </>
      )}
    </div>
  );
};
export default OrderList;
