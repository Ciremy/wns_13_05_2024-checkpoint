import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import client from "@/graphql/client";

type Country = {
  id: number;
  name: string;
  code: string;
  emoji: string;
};

type Props = {
  country: Country;
};

const CountryPage = ({ country }: Props) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Code: {country.code}</p>
      <p>Emoji: {country.emoji}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  try {
    if (!params || typeof params.id !== "string") {
      throw new Error("Invalid parameters");
    }

    const id = parseInt(params.id, 10);

    const { data } = await client.query({
      query: gql`
        query GetCountry($id: Int!) {
          country(id: $id) {
            id
            name
            code
            emoji
          }
        }
      `,
      variables: { id },
    });

    const country: Country = data.country;

    return {
      props: {
        country,
      },
    };
  } catch (error) {
    console.error("Error fetching country:", error);
    return {
      notFound: true,
    };
  }
};

export default CountryPage;
