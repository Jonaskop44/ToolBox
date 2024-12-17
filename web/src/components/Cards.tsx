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
      className="relative w-full sm:w-72 flex flex-col bg-gray-800 rounded-xl shadow-lg border border-[#38bdf8] hover:border-[#38bdf8] hover:shadow-xl transform transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
    >
      {/* Highlighted Icon */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#38bdf8] p-4 rounded-full shadow-md">
        <Icon className="text-gray-900" size={32} />
      </div>

      {/* Card Content */}
      <div className="flex flex-col items-center p-6 pt-10">
        <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm text-center">{description}</p>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 w-3/4 mx-auto bg-[#38bdf8] rounded-full mt-4"></div>
    </div>
  );
};

export default Cards;
