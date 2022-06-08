import React from "react";
import useWindowDimensions from "../hooks/getDimensions"
// import mainloader from "../Assets/img/mainloader.svg";

function Loader({ text }) {
  const { width } = useWindowDimensions();

  return (
    <>
      <div className="">
        <div
          className="position-fixed w-100"
          style={{
            zIndex: 1100,
            marginTop: -200,
            height: "120%",
            marginLeft: width > 992 ? 0 : 0,
            background: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <img
                width={150}
                style={{
                  filter:
                    "invert(99%) sepia(1%) saturate(2%) hue-rotate(168deg) brightness(120%) contrast(100%)",
                }}
                src="https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
                alt="loader"
              />
              {/* <h2 className="text-white w-100 text-center mt-5">{text}</h2> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loader;
