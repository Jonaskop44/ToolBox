"use client";

import Particels from "@/components/Common/Particels";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-900 m-0 min-h-screen w-full flex flex-col items-center relative">
      {/* Hero Section mit der Überschrift */}
      <div className="absolute top-10 w-full flex flex-col items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-white text-6xl font-bold font-sans">
            {" "}
            {/* Schriftart font-sans hinzugefügt */}
            Toolbox 360
          </h1>
        </div>
      </div>

      {/* Inhaltsbereich */}
      <div className="flex justify-center gap-8 mt-40 w-11/12 max-w-5xl z-10">
        {children}
      </div>

      {/* Particels Component */}
      <Particels />
    </div>
  );
};

export default DashboardLayout;
