import React, { createContext } from "react";
import { doctors } from "../assets/assets";

// Create the context
export const AppContext = createContext();

const AppContextProvider = (props) => {

const currencySymbol = "₹"; 

  const value = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children} {/* Correctly access props */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
