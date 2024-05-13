import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import client from "@/graphql/client";
import { GetCountriesQuery } from "@/graphql/generated/schema";

const ADD_COUNTRY_MUTATION = gql`
  mutation AddCountry($name: String!, $code: String!, $emoji: String!) {
    addCountry(input: { name: $name, code: $code, emoji: $emoji }) {
      id
      name
      code
      emoji
    }
  }
`;

function CountryInput(props: {
  addCountry: (
    country: Omit<GetCountriesQuery["countries"][number], "__typename">
  ) => void;
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");

  async function sendData(
    name: string,
    code: string,
    emoji: string
  ): Promise<void> {
    try {
      const { data } = await client.mutate<
        { addCountry: GetCountriesQuery["countries"][number] },
        { name: string; code: string; emoji: string }
      >({
        mutation: gql`
          mutation AddCountry($name: String!, $code: String!, $emoji: String!) {
            addCountry(data: { name: $name, code: $code, emoji: $emoji }) {
              id
              name
              code
              emoji
            }
          }
        `,
        variables: { name, code, emoji },
      });

      if (data && data.addCountry) {
        const newCountry = data.addCountry;
        console.log(newCountry);
        props.addCountry(newCountry);
      } else {
        throw new Error("Error adding country: No data returned");
      }
    } catch (error) {
      console.error("Error adding country:", error);
      throw error;
    }
  }

  console.log(name);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await sendData(name, code, emoji);
      // Reset input fields after successful addition
      setName("");
      setCode("");
      setEmoji("");
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Country</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-pink-600"
            />
          </div>
          <div className="flex-grow">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Code:
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-pink-600"
            />
          </div>
          <div className="flex-grow">
            <label
              htmlFor="emoji"
              className="block text-sm font-medium text-gray-700"
            >
              Emoji:
            </label>
            <input
              type="text"
              id="emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-pink-600"
            />
          </div>
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-pink-700"
          >
            Add Country
          </button>
        </div>
      </form>
    </div>
  );
}

export default CountryInput;
