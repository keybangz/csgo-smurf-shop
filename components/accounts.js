import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { client } from "../lib/client"; // Import sanity client
import { urlFor } from "../lib/client";

const Accounts = ({
  account: { rank, images, name, slug, price, hightrust, isprime, details, acclock }, checked
}) => {
  return (
    <div>
      <div className="container pt-10 mx-auto flex flex-wrap w-auto items-center justify-center">
        <div className="group col-auto row-auto w-auto gap-4">
          {(!checked || isprime) && !acclock && (
          <div className="rank-item flex flex-col lg:flex-row lg:items-center justify-center px-6 py-6 lg:py-10 lg:space-x-4 space-y-6 lg:space-y-0 transition transform hover:scale-105 hover:bg-gray-100 hover:border-gray-100">
            <div className="rank-picture flex items-center space-x-4">
              <img src={urlFor(rank)} alt={name}></img>
            </div>
            <ul className="flex flex-col lg:flex-row lg:items-center lg:justify-center text-gray-600 font-medium lg:space-x-6 xl:space-x-10 space-y-4 lg:space-y-0">
              <li key="TrustFactor" className="flex">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-white group-hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-3 text-white group-hover:text-black">
                  {hightrust ? (
                    <span>High Trust</span>
                  ) : (
                    <span>Low Trust</span>
                  )}
                </span>
              </li>
              <li key="PrimeAccount" className="flex">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-white group-hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-3 text-white group-hover:text-black">
                  {isprime === true ? (
                    <span>Prime Ready!</span>
                  ) : (
                    <span>Non-Prime</span>
                  )}
                </span>
              </li>
            </ul>
            <div>
              <p className="flex items-center text-white group-hover:text-black space-x-1">
                <span className="md:text-4xl xl:text-5xl font-extrabold tracking-tight">
                  ${price}
                </span>
              </p>
            </div>
            <Link href={`/account/${slug.current}`}>
              <button
                type="button"
                className="inline-flex items-center justify-center py-3 px-10 border border-transparent rounded-sm text-md font-medium transition-all shadow-sm text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Buy now
              </button>
            </Link>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
