import React from "react";

interface ResetSVGProps {
  width: number;
  fill: string;
}

const ResetSVG: React.FC<ResetSVGProps> = ({ width, fill }) => (
  <svg
    fill={`var(--color-${fill})`}
    width={width}
    height={width}
    viewBox="0 0 32 32"
    id="icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{".cls-1{fill:none;}"}</style>
    </defs>
    <title>{"Reset form"}</title>
    <path d="M18,28A12,12,0,1,0,6,16v6.2L2.4,18.6,1,20l6,6,6-6-1.4-1.4L8,22.2V16H8A10,10,0,1,1,18,26Z" />
    <rect
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      className="cls-1"
      width={32}
      height={32}
    />
  </svg>
);
export default ResetSVG;
