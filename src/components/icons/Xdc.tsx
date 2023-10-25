import Image from "next/image";
import React from "react";
import XDC from "../../assets/XDCWhite.png";

const Xdc = ({ height = 24, width = 24, classNames = "" }) => {
  return (
    <Image
      className={"object-contain " + classNames}
      src={XDC}
      height={height}
      width={width}
      alt="XDC"
    />
  );
};

export default Xdc;
