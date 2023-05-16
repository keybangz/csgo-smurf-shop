import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

import Cookies from "js-cookie";

import { client } from "../lib/client"; // Import sanity client
import { useStateContext } from "../context/StateContext";

let itemsPurchased;

export default function success({ data })
 {

  return <div>{data}</div>;
}

export async function getServerSideProps(ctx) { 

  let data = null;

  if(ctx.req) {
    data = await ctx.req?.cookies['items-purchased'];
  }
 
  console.log(data);

  return {
    props: {
      data
    }
  }
 
 }