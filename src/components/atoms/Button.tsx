import { FC } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
