"use client"

import Particels from "@/components/Common/Particels";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="bg-gray-900 m-0 min-h-screen w-full flex flex-col items-center relative">
      <div className="absolute top-10 w-full flex justify-center z-10">
        <h1 className="text-center text-white font-bold text-6xl">Toolbox 360</h1>
      </div>
      <div className="flex justify-center gap-8 mt-40 w-11/12 max-w-5xl z-10">
        {children}
      </div>
      <Particels />
    </div>
    );
}
 
export default DashboardLayout;