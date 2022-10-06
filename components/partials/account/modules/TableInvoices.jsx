import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";

const TableInvoices = () => {
  const { purchases } = useSelector((state) => state.account);
  /*
            You can change data by API
            example: https://ant.design/components/table/
        */

  const tableData = [
    {
      id: "1",
      invoiceId: "500884010",
      title: "Marshall Kilburn Portable Wireless Speaker",
      dateCreate: "20-1-2020",
      amount: "42.99",
      status: "Successful delivery",
    },
    {
      id: "2",
      invoiceId: "593347935",
      title: "Herschel Leather Duffle Bag In Brown Color",
      dateCreate: "20-1-2020",
      amount: "199.99",
      status: "Cancel",
    },
    {
      id: "3",
      invoiceId: "593347935",
      title: "Xbox One Wireless Controller Black Color",
      dateCreate: "20-1-2020",
      amount: "199.99",
      status: "Cancel",
    },
    {
      id: "4",
      invoiceId: "615397400",
      title: "Grand Slam Indoor Of Show Jumping Novel",
      dateCreate: "20-1-2020",
      amount: "41.00",
      status: "Cancel",
    },
  ];

  const tableColumn = [
    {
      title: "Id",
      dataIndex: "order_id",
      rowKey: "order_id",
      key: "order_id",
      width: "120px",
      //   render: (text, record) => (
      //     <Link href="/account/invoice-detail">{record.invoiceId}</Link>
      //   ),
    },
    {
      title: "Title",
      dataIndex: "product_name",
      rowKey: "product_name",
      key: "product_name",
    },
    {
      title: "Date",
      rowKey: "order_date",
      dataIndex: "order_date",
      key: "order_date",
      width: "120px",
    },
    {
      title: "Amount",
      rowKey: "price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <span className="text-right">
          {record.currency}
          {record.price}
        </span>
      ),
    },
    {
      title: "Delivery Status",
      key: "delivery_status",
      dataIndex: "delivery_status",
      rowKey: "delivery_status",
      width: "150px",
      render: (text, record) => (
        <span className="text-right">{record.delivery_status}</span>
      ),
    },
  ];
  return (
    <Table
      columns={tableColumn}
      dataSource={purchases}
      rowKey={(record) => record.id}
    />
  );
};

export default TableInvoices;
