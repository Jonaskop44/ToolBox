"use client";
import Cards from '@/components/Cards';
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineSpotify } from "react-icons/ai";
import Link from 'next/link';

const subcategoryCards = [
    { title: "YouTube", description: "Download videos directly from YouTube.",  icon: AiOutlineYoutube }, 
    { title: "Spotify", description: "Download your favorite songs directly from Spotify.",  icon: AiOutlineSpotify }
];

const Nettools = () => {
    return (
        <div className="p-6">
            <h1 className="text-white text-3xl mb-6 text-center">Downloader</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mx-auto">
                {subcategoryCards.map((card) => (
                    <Cards
                        key={card.title}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
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
    );
}

export default Nettools;
