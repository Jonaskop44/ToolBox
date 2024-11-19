
import { IconType } from "react-icons";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: IconType;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <li
        className="col-span-1 w-80 flex flex-col text-center bg-gray-400 rounded-lg shadow-lg divide-y divide-gray-200 
                     hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-in-out"
      >
        <div className="flex-1 flex flex-col p-6">
          <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-white">
            <Icon className="text-gray-900" size={60} />
          </div>
          <h3 className="mt-6 text-gray-900 text-lg font-medium">{title}</h3>
          <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Title</dt>
            <dd className="text-gray-900 text-sm">{description}</dd>
          </dl>
        </div>
      </li>
    </ul>
  );
};

export default DashboardCard;
