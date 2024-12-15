"use client";
import Cards from "@/components/Cards";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import Link from "next/link";
import ApiClient from "@/api";
import { useState } from "react";
import NettoolModal from "@/components/Popup/Nettools/NettoolModal";
import {
  NettoolsTypes,
  type NettoolModalType,
  type Nettools,
} from "@/types/nettools";
import { useDisclosure } from "@nextui-org/react";

const subcategoryCards = [
  {
    title: "IP - Info",
    description: "Erhalten Sie detaillierte Informationen über IP-Adressen.",
    type: NettoolsTypes.IPINFO,
    icon: IoIosInformationCircleOutline,
  },
  {
    title: "Mac - Adressen Info",
    description: "Informationen über MAC-Adressen abrufen.",
    type: NettoolsTypes.MACLOOKUP,
    icon: IoIosInformationCircleOutline,
  },
  {
    title: "Portscan",
    description: "?",
    type: NettoolsTypes.PORTSCAN,
    icon: CiImport,
  },
];

const apiClient = new ApiClient();

const Nettools = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<NettoolModalType>();
  const [result, setResult] = useState(null);

  const handleCardClick = (type: NettoolModalType) => {
    setModalType(type);
    onOpen();
  };

  const handleRequest = async (data: Nettools) => {
    if (!modalType) {
      console.error("Modal type is undefined");
      return;
    }

    try {
      const response =
        modalType === NettoolsTypes.IPINFO
          ? await apiClient.nettools.helper.ipInfo(data.ip)
          : modalType === NettoolsTypes.MACLOOKUP
          ? await apiClient.nettools.helper.lookupMacAddress(data.mac)
          : await apiClient.nettools.helper.portScanner(
              data.ip,
              data.startPort,
              data.endPort
            );
      setResult(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="p-6">
        <h1 className="text-white text-3xl mb-6">Nettools</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 justify-center mx-auto">
          {subcategoryCards.map((card) => (
            <Cards
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              onClick={() => handleCardClick(card.type)}
            />
          ))}
        </ul>
        <div className="flex justify-center mt-6">
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
              Home
            </button>
          </Link>
        </div>
      </div>

      <NettoolModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        type={modalType!}
        onSubmit={handleRequest}
        onOpen={onOpen}
      />
    </div>
  );
};

export default Nettools;
