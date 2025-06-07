import React, { type ReactNode } from "react";

interface ToolTipProps {
  children: ReactNode;
  trigger: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  trigger,
  position = "top",
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover:-translate-y-1";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2 group-hover:translate-y-1";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2 group-hover:-translate-x-1";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2 group-hover:translate-x-1";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover:-translate-y-1";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-1/2 -translate-x-1/2 -mt-1";
      case "bottom":
        return "bottom-full left-1/2 -translate-x-1/2 -mb-1";
      case "left":
        return "left-full top-1/2 -translate-y-1/2 -ml-1";
      case "right":
        return "right-full top-1/2 -translate-y-1/2 -mr-1";
      default:
        return "top-full left-1/2 -translate-x-1/2 -mt-1";
    }
  };

  return (
    <div className="relative inline-block group">
      <div
        className="cursor-help"
        onClick={() => {
          navigator.clipboard.writeText("noobscience123@gmail.com");
        }}
      >
        {children}
      </div>

      <div
        className={`
          absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-300 ease-in-out
          transform group-hover:scale-100 scale-95
          pointer-events-none whitespace-nowrap
          ${getPositionClasses()}
        `}
      >
        {trigger}

        <div
          className={`
            absolute w-2 h-2 bg-gray-900 rotate-45
            ${getArrowClasses()}
          `}
        />
      </div>
    </div>
  );
};

export default ToolTip;
