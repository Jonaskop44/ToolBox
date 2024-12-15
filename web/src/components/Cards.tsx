import Link from "next/link";
import { IconType } from "react-icons";

interface CardsProps {
  title: string;
  description: string;
  icon: IconType;
  onClick?: () => void;
}

const Cards: React.FC<CardsProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full sm:w-64 flex flex-col bg-gray-700 rounded-lg shadow-md border border-[#38bdf8] hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
    >
      <div className="relative p-4">
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-[#38bdf8] w-10 h-10 flex items-center justify-center rounded-full">
          <Icon className="text-gray-900" size={30} />
        </div>
        <h3 className="mt-10 text-white text-lg font-semibold text-center font-mono">
          {title}
        </h3>
      </div>
      <div className="px-4 py-2 bg-gray-800 rounded-b-lg">
        <p className="text-gray-300 text-sm text-center font-sans">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Cards;
