import React from "react";
import DOMPurify from "dompurify";

const PartialDescription = ({ product }) => {
  console.log("...content....",product)
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div
      className="ps-document"
      dangerouslySetInnerHTML={createMarkup(
        product?.product?.short_description
          ? product?.product?.short_description
          : "No Description Added"
      )}
    ></div>
  );
};

export default PartialDescription;
