import React, { createContext, useEffect } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";



// Create the context
export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currencySymbol = "₹"; 
  const [token, setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token") : false);

  const backendUrl = "http://localhost:5000"; // Temporary dummy URL
  const [userData, setUserData] = useState(false);


const loadUserProfileData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
      headers: { token },
    });

    if (data.success) {
      // ✅ No need to parse address — it's already an object
      setUserData(data.userData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};



  const value = {
    doctors,
    currencySymbol,
    token,setToken,
    backendUrl,
    userData,setUserData,
    loadUserProfileData
  };

  useEffect(()=>{
    if(token){
      loadUserProfileData();
    } else{
      setUserData(false);
    }
  },[token])

  return (
    <AppContext.Provider value={value}>
      {props.children} {/* Correctly access props */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
