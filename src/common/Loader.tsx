import React from "react";

interface LoaderProps {
  size?: string;
  text?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "30px",
  text,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="loader" style={{ width: size, height: size }}></div>
      {text && <p className="mt-4 text-indigo-300">{text}</p>}
    </div>
  );
};

export default Loader;
