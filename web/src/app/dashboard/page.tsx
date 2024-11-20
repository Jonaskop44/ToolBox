"use client";
import DashboardCard from "@/components/DashboardCard";
import Particels from "@/components/Common/Particels";
import { VscTools } from "react-icons/vsc";
import { SlCloudDownload } from "react-icons/sl";
import { AiOutlineDiscord } from "react-icons/ai";



const cards = [
  { title: "Nettools", description: "Portscan, IP-Info und Mac Adressen-Info", icon: VscTools },
  { title: "Downloader", description: "Youtube und Spotify", icon: SlCloudDownload },
  { title: "Discord", description: "Discordnuker", icon: AiOutlineDiscord },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-900 m-0 min-h-screen w-full flex flex-col items-center relative">
      <div className="absolute top-10 w-full flex justify-center z-10">
        <h1 className="text-center text-white font-bold text-6xl">Toolbox 360</h1>
      </div>
      
      
      <div className="flex justify-center gap-8 mt-40 w-11/12 max-w-5xl z-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full">
          {cards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </ul>
      </div>
      
      
      <Particels />
    </div>
  );
};

export default Dashboard;
