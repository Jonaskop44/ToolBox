
import { IconType } from "react-icons";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: IconType;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <li className="w-full sm:w-80 flex flex-col text-center bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-200 border border-[#38bdf8] hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-in-out">
      <div className="flex-1 flex flex-col p-6">
        <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-[#38bdf8]">
          <Icon className="text-gray-900" size={60} />
        </div>

        <h3 className="mt-6 text-white text-lg font-medium font-serif">{title}</h3>
        <div className="mt-1 flex-grow flex flex-col justify-between">
          <p className="text-white text-sm font-sans">{description}</p>
        </div>
      </div>
    </li>
  );
};

export default DashboardCard;
