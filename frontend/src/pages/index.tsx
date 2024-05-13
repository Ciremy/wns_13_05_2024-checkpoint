import client from "@/graphql/client";
import { gql } from "@apollo/client";
import { GetCountriesQuery } from "@/graphql/generated/schema"; // Import generated type
import { useEffect, useState } from "react";
import CountryCard from "@/components/CountryCard";
import CountryInput from "@/components/CountryInput";

const CountriesPage = () => {
  const [countries, setCountries] = useState<
    Omit<GetCountriesQuery["countries"][number], "__typename">[] // Retire __typename de chaque élément du tableau
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query GetCountries {
              countries {
                id
                name
                code
                emoji
              }
            }
          `,
        });
        setCountries(data.countries); // Set countries state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data when component mounts
  }, []); // Run effect only once when component mounts

  function addData(
    country: Omit<GetCountriesQuery["countries"][number], "__typename">
  ): void {
    setCountries((prevCountries) => [...prevCountries, country]);
  }

  return (
    <div>
      <CountryInput addCountry={addData} />
      {countries ? (
        <div className="flex flex-wrap gap-2 justify-center m-4">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountriesPage;
