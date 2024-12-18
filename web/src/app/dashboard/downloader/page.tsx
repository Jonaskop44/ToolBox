"use client";
import Cards from "@/components/Cards";
import { AiOutlineYoutube, AiOutlineSpotify } from "react-icons/ai";
import Link from "next/link";
import {
  DownloaderModalType,
  DownloaderTypes,
  type Downloader,
} from "@/types/downloader";
import ApiClient from "@/api";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import DownloaderModal from "@/components/Popup/Downloader/DownlaoderModal";

const subcategoryCards = [
  {
    title: "Youtube",
    description: "Lade Videos direkt von YouTube herunter.",
    type: DownloaderTypes.DOWNLOADVIDEO,
    icon: AiOutlineYoutube,
  },
  {
    title: "Spotify-Song",
    description: "Lade dein Lieblingssong direkt von Spotify herunter.",
    type: DownloaderTypes.DOWNLOADSONG,
    icon: AiOutlineSpotify,
  },
  {
    title: "Spotify-Playlist",
    description: "Lade deine Lieblingsplaylist direkt von Spotify herunter.",
    type: DownloaderTypes.DOWNLOADPLAYLIST,
    icon: AiOutlineSpotify,
  },
];

const apiClient = new ApiClient();

const Downloader = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<DownloaderModalType>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (type: DownloaderModalType) => {
    setModalType(type);
    onOpen();
  };

  const handleRequest = async (data: Downloader) => {
    if (!modalType) {
      return;
    }

    setIsLoading(true);
    try {
      const response =
        modalType === DownloaderTypes.DOWNLOADVIDEO
          ? await apiClient.downloader.helper.downloadVideo(data.url)
          : modalType === DownloaderTypes.DOWNLOADSONG
          ? await apiClient.downloader.helper.downloadSong(
              data.url,
              data.clientId,
              data.clientSecret
            )
          : await apiClient.downloader.helper.downloadPlaylist(
              data.url,
              data.clientId,
              data.clientSecret
            );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6">
        {/* Überschrift zentrieren */}
        <h1 className="text-white text-3xl mb-10 text-center">Downloads</h1>
        {/* Karten nebeneinander anzeigen */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center mx-auto">
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
        {/* "Home"-Button zentrieren */}
        <div className="flex justify-center mt-6">
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors">
              Home
            </button>
          </Link>
        </div>
      </div>
      <DownloaderModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        type={modalType!}
        onSubmit={handleRequest}
        onOpen={onOpen}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Downloader;
