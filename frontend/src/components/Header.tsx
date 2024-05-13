import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-pink-600 text-white py-4 px-6 flex items-center flex-col">
      <h1 className="text-lg font-semibold">Checkpoint: frontend</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <div className="hover:text-gray-300">Countries</div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
