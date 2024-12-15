"use client";
import Cards from '@/components/Cards';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import Link from 'next/link';

const subcategoryCards = [
    { title: "IP - Info", description: "Get information about different IP addresses.",  icon: IoIosInformationCircleOutline },
    { title: "Mac - Address Info", description: "Retrieve information about MAC addresses.",  icon: IoIosInformationCircleOutline },
    { title: "Portscan", description: "Scan IP addresses to identify open ports.",  icon: CiImport }
];

const Nettools = () => {
    return (
        <div className="p-6">
            <h1 className="text-white text-3xl mb-6 text-center">Nettools</h1>
            <ul className="flex justify-center space-x-8">
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
