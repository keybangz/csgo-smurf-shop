import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/carousel";

import { client } from "../../lib/client"; // Import sanity client
import { urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";

const AccountPage = ({ account, accounts }) => {
  const { rank, images, name, slug, price, hightrust, isprime, details, acclock } = account;
  const qty = 1;
  const { onAdd } = useStateContext();
  return (
    <div>
      <Navbar />
      <div className="account-details-container container pt-28 mx-auto justify-self-center flex flex-row flex-wrap sm:justify-center sm:pb-24 items-center leading-tight my-4 sm:justify-items-center">
        <div className="flex flex-col sm:justify-center">
          <div className="account-name pb-8 ">
            <span className="font-bold text-4xl">{name}</span>
          </div>
          <div className="account-image">
            <img src={urlFor(rank)}></img>
          </div>
          <div className="account-price pb-4"></div>
          <span className="font-bold text-3xl">Price: ${price}</span>
          <div className="account-desc pt-8">
            <span className="font-bold text-2xl">Description:</span>
            <p className="text-2xl">{details}</p>
          </div>

          <div className="account-buy pt-12 pl-50">
            <button onClick={() => onAdd(account, 1)} className="buy-btn bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out items-center" readOnly>
              Add to Cart!
            </button>
          </div>
        </div>
        <Carousel data={images} className="container flex flex-wrap sm:pt-28 w-auto"/>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "account"] {
        slug {
            current
        }
    }
    `;

  const accounts = await client.fetch(query);

  const paths = accounts.map((account) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "accounts" && slug.current == '${slug}'][0]`; // Grab current account selected.
  const accountsQuery = '*[_type == "accounts"]';

  const account = await client.fetch(query);
  const accounts = await client.fetch(accountsQuery);

  return {
    props: { accounts, account },
  };
};

export default AccountPage;
