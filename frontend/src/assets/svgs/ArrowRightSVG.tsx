import React from "react";

interface ArrowRightSVGProps {
  width: number;
  fill: string;
}

const ArrowRightSVG: React.FC<ArrowRightSVGProps> = ({ width, fill }) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g
      id="Page-1"
      stroke="none"
      strokeWidth={1}
      fill={`var(--color-${fill})`}
      fillRule="evenodd"
    >
      <g
        id="Dribbble-Light-Preview"
        transform="translate(-180.000000, -6639.000000)"
        fill={`var(--color-${fill})`}
      >
        <g id="icons" transform="translate(56.000000, 160.000000)">
          <path
            d="M134,6479 L132.565,6480.393 L140.172,6488 L124,6488 L124,6490 L140.172,6490 L132.586,6497.586 L134,6499 C137.661,6495.339 140.496,6492.504 144,6489 L134,6479"
            id="arrow_right-[#349]"
          />
        </g>
      </g>
    </g>
  </svg>
);
export default ArrowRightSVG;
