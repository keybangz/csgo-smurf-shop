import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center text-indigo-400 col-auto rows-auto">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Need a<span>&nbsp;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              smurf?
            </span>
          </h1>
          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Rank up quick with our easy smurf service!, cheap, fast & reliable!
          </p>

          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left font-bold">
            All accounts are directly emailed after purchase.
          </p>

          <div className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4"></div>

            <h1 className="my-4 text-3xl md:text-5xl text-white font-bold leading-tight text-center md:text-left flex flex-col items-center">
              Check out our shop!
            </h1>

            <div className="flex flex-col items-center justify-between pt-4">
              <Link href="/shop/">
                <button
                  className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out items-center"
                  type="button"
                >
                  Buy now!
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-3/5 p-12 overflow-hidden">
          <div className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6">
            <Image
              src="/csgo.jpg"
              layout="responsive"
              alt="CS:GO Logo"
              width="500"
              height="500"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
