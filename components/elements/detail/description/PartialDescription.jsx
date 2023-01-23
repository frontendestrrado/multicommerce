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
        product?.product?.long_description
          ? product?.product?.long_description
          : "No Description Added"
      )}
    ></div>
  );
};

export default PartialDescription;
