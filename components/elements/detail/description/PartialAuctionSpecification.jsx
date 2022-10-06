import React from "react";

const PartialAuctionSpecification = ({ product }) => (
  <div className="table-responsive">
    <table className="table table-bordered ps-table ps-table--specification">
      <tbody>
        {product.attributes.length > 0 &&
          product.attributes.map((item, index) => (
            <tr key={index}>
              <td>{item.attr_name}</td>
              <td>{item.attr_value_name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

export default PartialAuctionSpecification;
