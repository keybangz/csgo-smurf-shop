import React, { useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import Cookies from "js-cookie";

import { useStateContext } from "../context/StateContext";

import { client } from "../lib/client";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove } =
    useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    await Cookies.set('items-purchased', cartItems);

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <aside
      ref={cartRef}
      className="transform top-0 right-0 w-96 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 items-center"
    >
      <div className="transform top-5 left-5 px-5 pt-4 text-black opacity-100">
        <button type="button" onClick={() => setShowCart(false)} readOnly>
          <FontAwesomeIcon
            icon={faXmark}
            className="text-black opacity-100 text-2xl"
          />
        </button>
        <div className="font-bold text-2xl inline pl-4 pb-1">
          <span>Your Cart</span>
          <span className="text-red-600"> ({totalQuantities} items)</span>
        </div>

        {cartItems < 1 && (
          <div className="flex items-center justify-center h-1/2 font-bold">
            <span className="flex items-center">Cart is empty!</span>
          </div>
        )}

        <div className="pt-4">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="" key={item._id}>
                <div className="account-info justify-center items-center h-1/2">
                  <button
                    type="button"
                    className="flex mx-auto object-center w-auto pb-2"
                    onClick={() => onRemove(item)}
                    readOnly
                  >
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="text-red-600 opacity-100 text-2xl"
                    />
                  </button>
                  <img
                    src={urlFor(item?.rank)}
                    className="flex mx-auto object-center account-image"
                  />
                  <h5 className="font-bold text-center">{item.name}</h5>
                  <h4 className="font-bold text-center">${item.price}</h4>
                </div>
                <div>
                  <p className="quantity-desc"></p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {cartItems.length >= 1 && (
        <div className="absolute bottom-5 left-5 text-black text-2xl font-bold">
          <div className="">
            <h3 className="inline">Subtotal:</h3>
            <h3 className="inline float-right">${totalPrice}</h3>
          </div>
          <div className="pay-button-container text-black flex mx-auto w-auto object-center bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out items-center">
            <button
              type="button"
              className="pay-button"
              onClick={handleCheckout}
              readOnly
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Cart;
