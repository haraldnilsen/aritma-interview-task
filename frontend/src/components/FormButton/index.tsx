import React, { useState } from "react";
import ArrowRightSVG from "../../assets/svgs/ArrowRightSVG";

interface FormButtonProps {
  label: string;
}

const FormButton: React.FC<FormButtonProps> = ({ label }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="button relative bg-secondary text-primary font-bold"
    >
      <span>{label}</span>
      <span>
        <span
          className={`absolute top-6 transform transition-transform duration-300 right-6 ${
            isHovering && "translate-x-2"
          } `}
        >
          <ArrowRightSVG width={10} fill="primary" />
        </span>
      </span>
    </button>
  );
};

export default FormButton;
