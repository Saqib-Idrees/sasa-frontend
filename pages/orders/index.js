import React from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Layout from "@/components/Layouts/DashLayout/Layout";
import {
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useGetAllPostsQuery } from "slices/postsAPI";
import { useRouter } from 'next/router';
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
    title: 'Sales Agent',
    width: 150,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Order Id ',
    width: 150,
    dataIndex: 'oid',
    key: 'oid',
  },
  {
    title: 'Customer name',
    dataIndex: 'cname',
    key: 'cname',
    width: 150,
  },
  {
    title: 'Customer  ID',
    dataIndex: 'cid',
    key: 'cid',
    width: 150,
  },
  {
    title: 'Item',
    dataIndex: 'item',
    key: 'item',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    filters: [
      {
        text: 'Pending',
        value: 'Pending',
      },
      {
        text: 'Shipped',
        value: 'Shipped',
      },
      {
        text: 'Cancelled',
        value: 'Cancelled',
      },
      {
        text: 'Received',
        value: 'Received',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: 'Tailor',
    dataIndex: 'tailor',
    key: 'tailor',
    width: 150,
  },
  {
    title: 'Delivery date',
    dataIndex: 'ddate',
    key: 'ddate',
    width: 150,
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    width: 300,
  },
  {
    title: 'Shipping',
    dataIndex: 'shipping',
    key: 'shipping',
    width: 150,
  },
  {
    title: 'Tracking code',
    dataIndex: 'tcode',
    key: 'tcode',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const dataSource = [
  {
    key: '1',
    name: 'Elijah Scott',
    oid: '#917583',
    cname: 'Richard Grey',
    cid: '002586691022',
    item: 'Vest',
    status: 'Pending',
    tailor: 'Ezio Auditori',
    ddate: '29-09-24',
    notes: 'Vest order has been placed................',
    shipping: 'Standard',
    tcode: '940010010936113003113',
  },
  {
    key: '2',
    name: 'Baldwin Adams',
    oid: '#129934',
    cname: 'Barry Allen',
    cid: '002586691033',
    item: 'Suit',
    status: 'Inproduction',
    tailor: 'Lucca',
    ddate: '17-08-24',
    notes: 'Suit Jacket order has been placed................',
    shipping: 'Express',
    tcode: '940010010936113003122',
  },
  {
    key: '3',
    name: 'Smantha',
    oid: '#010538',
    cname: 'Cindy Sweeney',
    cid: '002586691044',
    item: 'American Trousers',
    status: 'Shipped',
    tailor: 'Fonsi',
    ddate: '12-08-24',
    notes: 'American Trouser order has been placed...........',
    shipping: 'Standard',
    tcode: '940010010936113003133',
  },
  {
    key: '4',
    name: 'Alana Grey',
    oid: '#100696',
    cname: 'Alana Bloom',
    cid: '002586691055',
    item: 'Pleated Trousers',
    status: 'Cancelled',
    tailor: 'Lorenzo',
    ddate: '15-05-24',
    notes: 'Suit Jacket order has been placed................',
    shipping: 'Standard',
    tcode: '940010010936113003113',
  },
  {
    key: '5',
    name: 'Racheal McAdams',
    oid: '#030393',
    cname: 'Racheal Rey',
    cid: '002586691066',
    item: 'Shirt',
    status: 'Shipped',
    tailor: 'Lorenzo',
    ddate: '29-09-24',
    notes: 'Suit Jacket order has been placed................',
    shipping: 'Standard',
    tcode: '940010010936113003113',
  },
];

const OrderList = () => {
  const router = useRouter();
  const { styles } = useStyle();
  const {
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    isError: postsIsError,
    isFetching: postsIsFetching,
  } = useGetAllPostsQuery("");
  return (
    <div>
      <Layout>
        <h2 className="font-bold text-3xl">Orders</h2>
        <div className="bg-white border rounded-2xl p-7 mt-6">
          <div className="grid grid-cols-2">
            <div className="space-y-2 justify-self-start">
              <div className="mr-auto md:mr-4 md:w-72 my-8" >
                <Input label="Search" />
              </div>
              <IconButton
                variant="text"
                color="blue-gray"
                className="grid xl:hidden"
                onClick={() => setOpenSidenav(dispatch, !openSidenav)}
              >
                <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
              </IconButton>
            </div>
            <div className="space-y-2 justify-self-end content-center">
              <Button className="py-3 px-5 font-normal normal-case text-sm" onClick={() => { router.push('/orders/create') }}>+ Create Order</Button>
            </div>
          </div>
          <Table
            className={styles.customTable}
            columns={columns}
            dataSource={dataSource}
            scroll={{
              x: 'max-content',
              y: 55 * 5,
            }}
          />
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
};
export default OrderList;