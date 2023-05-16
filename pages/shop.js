import { PHASE_PRODUCTION_SERVER } from "next/dist/shared/lib/constants";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Accounts from "../components/accounts";
import React, {useState} from "react";

import { client } from "../lib/client"; // Import sanity client

export default function Shop({ accounts }) {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="place-content-center">
        <h1 className="my-4 text-3xl md:text-5xl text-white font-bold leading-tight text-center md:text-left flex flex-col items-center pt-24">
          Buy an account!
        </h1>
        <label
          htmlFor="default-toggle"
          className="flex flex-row relative items-center justify-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={checked}
            onClick={(e) => (setChecked(!checked))}
            id="default-toggle"
            className="sr-only peer"
            readOnly
          />
          <div className="w-11 h-6 relative bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Prime Accounts Only
          </span>
        </label>
        {accounts?.map((account) => (
          <Accounts key={account.id} checked={checked} account={account}></Accounts>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "accounts"]'; // Grab all accounts from Sanity
  const accounts = await client.fetch(query);

  return {
    props: { accounts },
  };
};
