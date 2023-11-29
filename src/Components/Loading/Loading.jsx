import React from "react";
import "./Loading_style.css";
import { ColorRing, RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div>
      <div className="spinner">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#116257", "#8a4e00", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </div>
  );
}
