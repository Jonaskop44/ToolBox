"use client";

import Particels from "@/components/Common/Particels";
import Card_nettools from "@/components/Card_nettools";
import Card_downloader from "@/components/Card_downloader";
import Card_discord from "@/components/Card_discord";

const Dashboard = () => {
  return (
    <div className="bg-gray-800 m-0 min-h-screen w-full flex flex-col items-center relative">
      <div className="absolute top-10 w-full flex justify-center z-10">
        <h1 className="text-center text-white font-bold text-6xl">Toolbox 360</h1>
      </div>
      <div className="flex justify-center gap-8 mt-40 w-11/12 max-w-5xl z-10"> {/* z-10 für Vordergrund */}
        <Card_nettools />
        <Card_downloader />
        <Card_discord />
      </div>
      <Particels /> {/* Particles hier, damit sie im Hintergrund sind */}
    </div>
  );
};

export default Dashboard;
