import React, { createContext } from "react";
import { doctors } from "../assets/assets";

import { useNavigate } from "react-router-dom";
import { useState } from "react";


// Create the context
export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currencySymbol = "₹"; 


  const [token, setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token") : false);


  const backendUrl = "http://localhost:5000"; // Temporary dummy URL

  const value = {
    doctors,
    currencySymbol,
    token,setToken,
    backendUrl
  };

  return (
    <AppContext.Provider value={value}>
      {props.children} {/* Correctly access props */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
