"use client";

import Loader from "@/components/Common/Loader";
import { useUserStore } from "@/data/userStore";
import React, { useEffect, useState } from "react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const { fetchUser, refreshToken } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doAction = async () => {
      await refreshToken();
      await fetchUser();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    doAction();
  }, [fetchUser, refreshToken]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default SessionProvider;
