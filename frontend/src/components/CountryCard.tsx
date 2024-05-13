import Link from "next/link";

function CountryCard({ country }: { country: any }) {
  return (
    <Link href={`/countries/${country.id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 w-[125px] block">
        <h2 className="text-xl font-semibold">{country.name}</h2>
        <p className="text-gray-600">Code: {country.code}</p>
        <p className="text-2xl">{country.emoji}</p>
      </div>
    </Link>
  );
}

export default CountryCard;
