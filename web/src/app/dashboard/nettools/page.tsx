"use client";
import Cards from '@/components/Cards';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdDeviceUnknown } from "react-icons/md";
import { CiImport } from "react-icons/ci";
import Link from 'next/link';

const subcategoryCards = [
    { title: "IP - Info", description: "Erhalten Sie detaillierte Informationen über IP-Adressen.", path: "/nettools/ip-info", icon: IoIosInformationCircleOutline },
    { title: "Mac - Adressen Info", description: "Informationen über MAC-Adressen abrufen.", path: "/nettools/mac-info", icon: IoIosInformationCircleOutline },
    { title: "Geräteerkennung", description: "?", path: "/nettools/device-detection", icon: MdDeviceUnknown },
    { title: "Portscan", description: "?", path: "/dashboard/discord", icon: CiImport }
];

const Nettools = () => {
    return (
        <div className="p-6">
            <h1 className="text-white text-3xl mb-6">Nettools</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 justify-center mx-auto">
                {subcategoryCards.map((card) => (
                    <Cards
                        key={card.title}
                        title={card.title}
                        description={card.description}
                        path={card.path}
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
