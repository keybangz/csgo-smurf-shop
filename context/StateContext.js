import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  let foundAccount;

  const onAdd = (account, quantity) => {
    if (!account.acclock) {
      const checkAccountInCart = cartItems.find(
        (item) => item._id === account._id
      );

      if (checkAccountInCart) {
        const updatedCartItems = cartItems.map((cartAccount) => {
          if (cartAccount._id === account._id)
            return {
              ...cartAccount,
              quantity: cartAccount.quantity + quantity,
            };
        });

        //setCartItems(updatedCartItems);
      } else {
        account.quantity = quantity;

        setTotalPrice((prevTotalPrice) => prevTotalPrice + account.price * 1); // we only sell 1 account at a time.
        setTotalQuantities(
          (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        setCartItems([...cartItems, { ...account }]);
      }
    }
  };

  const onRemove = (account) => {
    foundAccount = cartItems.find((item) => item._id === account._id);
    const newCartItems = cartItems.filter((item) => item._id !== account._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundAccount.price * foundAccount.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundAccount.quantity
    );
    setCartItems(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        onAdd,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
