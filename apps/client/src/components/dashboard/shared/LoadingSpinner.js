import React from "react";

export const LoadingSpinner = ({ itemClass }) => {
  return (
    <div className={`d-flex justify-content-center ${itemClass}`}>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
