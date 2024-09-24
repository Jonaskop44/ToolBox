"use client";

import Particels from "@/components/Common/Particels";

const Dashboard = () => {
  return (
    <div className="bg-image m-0 h-full w-full">
      <div className="flex justify-center items-center h-screen bg-black/65">
        <h1 className="text-center text-white font-bold text-6xl">Toolbox</h1>
        <Particels />
      </div>
    </div>
  );
};

export default Dashboard;
