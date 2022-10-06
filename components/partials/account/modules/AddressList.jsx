import React, { useState } from "react";

import { Skeleton, Card, Tooltip, Checkbox, Empty, Button } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { makeDefaultAddress, deleteAddress } from "~/store/account/action";

const AddressList = () => {
  const dispatch = useDispatch();
  const { customer_address } = useSelector((state) => state.account);
  return (
    <>
      <div className="row">
        {customer_address.length == 0 ? (
          <div className="col-12" style={{ minHeight: "50rem" }}>
            <Empty
              description={<span>No address found!</span>}
              // image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            ></Empty>
          </div>
        ) : (
          customer_address
            .sort((a, b) => b.is_default - a.is_default)
            .map((address) => (
              <div className="col-xl-6 col-lg-6 col-md-6" key={address.id}>
                <Card
                  style={{ marginTop: 16 }}
                  actions={[
                    <Link
                      href="/account/address/[pid]"
                      as={`/account/address/${address.id}`}
                    >
                      <EditOutlined key="edit" />
                    </Link>,
                    <DeleteTwoTone
                      twoToneColor="#dc3545"
                      onClick={() =>
                        dispatch(deleteAddress({ address_id: address.id }))
                      }
                    />,
                  ]}
                  className={address.is_default === 1 ? "border-success" : ""}
                >
                  {address.is_default === 0 ? (
                    <div className="float-right">
                      <Tooltip title="Make Default">
                        <Checkbox
                          onClick={() =>
                            dispatch(
                              makeDefaultAddress({
                                address_id: address.id,
                                default: 1,
                              })
                            )
                          }
                          checked={address.is_default !== 0}
                        ></Checkbox>
                      </Tooltip>
                    </div>
                  ) : (
                    <Tooltip title="Default Address">
                      <CheckCircleTwoTone
                        twoToneColor="#52c41a"
                        className="float-right"
                        hidden={address.is_default === 0}
                        style={{ fontSize: "large" }}
                      />
                    </Tooltip>
                  )}

                  <table className="table table-borderless table-sm">
                    <thead>
                      <tr>
                        <th scope="col">
                          <h5>{address.name}</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <h5>Address Type:</h5>
                        </th>
                        <td>{address.address_type}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h5>Phone:</h5>
                        </th>
                        <td>{address.phone}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h5>Address Line 1:</h5>
                        </th>
                        <td>{address.address1}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h5>Address Line 2:</h5>
                        </th>
                        <td>{address.address2}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h5>Country:</h5>
                        </th>
                        <td>{address.country}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h5>State:</h5>
                        </th>
                        <td>{address.state}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h5>City:</h5>
                        </th>
                        <td>{address.city}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h5>Postal code:</h5>
                        </th>
                        <td>{address.pincode}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default AddressList;
