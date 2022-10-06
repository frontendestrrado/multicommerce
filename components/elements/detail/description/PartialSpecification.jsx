import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const PartialSpecification = ({ product }) => {
  return (
    <div className="ps-document">
      <ReactQuill
        value={
          product?.product?.specification
            ? JSON.parse(product?.product?.specification)
            : "No Specification Added"
        }
        theme={"bubble"}
        readOnly={true}
      />
    </div>
  );
};

export default PartialSpecification;
