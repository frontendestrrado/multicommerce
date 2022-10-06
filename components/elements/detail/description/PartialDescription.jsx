import React from "react";
import DOMPurify from "dompurify";

const PartialDescription = ({ product }) => {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div
      className="ps-document"
      dangerouslySetInnerHTML={createMarkup(
        product?.product?.content
          ? product?.product?.content
          : "No Description Added"
      )}
    ></div>
  );
};

export default PartialDescription;
