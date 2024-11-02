/* This example requires Tailwind CSS v2.0+ */
import { AiOutlineDiscord } from "react-icons/ai"; // Import des Discord-Icons

const cards = [
  {
    name: 'Discord',
    title: 'Paradigm Representative', // Beispiel-Titel
  },
  // Weitere Karten...
];

export default function Example() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cards.map((card) => ( // Iteration durch die Karten
        <li
          key={card.name} // Eindeutiger Schlüssel
          className="col-span-1 w-80 flex flex-col text-center bg-gray-400 rounded-lg shadow-lg divide-y divide-gray-200 
                     hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-in-out" // Hintergrund auf grau gesetzt
        >
          <div className="flex-1 flex flex-col p-6">
            <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-white"> {/* Hintergrund für das Icon */}
              <AiOutlineDiscord className="text-gray-900" size={60} /> {/* Discord-Icon */}
            </div>
            <h3 className="mt-6 text-gray-900 text-lg font-medium">{card.name}</h3> {/* Name */}
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-gray-900 text-sm">{card.title}</dd> {/* Titel */}
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
