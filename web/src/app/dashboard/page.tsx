"use client";

import Particels from "@/components/Common/Particels";
import { AiOutlineDiscord } from "react-icons/ai";
import DashboardCard from "@/components/DashboardCard";
import { VscTools } from "react-icons/vsc";
import { SlCloudDownload } from "react-icons/sl";

const cards = [
  { title: "Discord", description: "Join our Discord!", icon: AiOutlineDiscord },
  { title: "Downloader", description: "Follow us on Twitter!", icon: SlCloudDownload },
  { title: "Nettools", description: "Follow us on Twitter!", icon: VscTools },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-800 m-0 min-h-screen w-full flex flex-col items-center relative">
      <div className="absolute top-10 w-full flex justify-center z-10">
        <h1 className="text-center text-white font-bold text-6xl">Toolbox 360</h1>
      </div>
      <div className="flex justify-center gap-8 mt-40 w-11/12 max-w-5xl z-10"> 
      {cards.map((card) => (
        <DashboardCard
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
        />
      ))}
      </div>
      <Particels /> 
    </div>
  );
};

export default Dashboard;
