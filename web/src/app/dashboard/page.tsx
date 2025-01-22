"use client";
import DashboardCard from "@/components/DashboardCard";
import { VscTools } from "react-icons/vsc";
import { SlCloudDownload } from "react-icons/sl";
import { AiOutlineDiscord } from "react-icons/ai";

const cards = [
  {
    title: "Nettools",
    description: "Portscan, IP-Info und Mac Adressen-Info",
    path: "/dashboard/nettools",
    icon: VscTools,
  },
  {
    title: "Downloader",
    description: "Youtube und Spotify",
    path: "/dashboard/downloader",
    icon: SlCloudDownload,
  },
  {
    title: "Discord",
    description: "Discordnuker",
    path: "/dashboard/discord",
    icon: AiOutlineDiscord,
  },
];

const Dashboard = () => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full">
      {cards.map((card) => (
        <DashboardCard
          key={card.title}
          title={card.title}
          description={card.description}
          path={card.path}
          icon={card.icon}
        />
      ))}
    </ul>
  );
};

export default Dashboard;
