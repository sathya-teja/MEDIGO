import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const [token, setToken] = useState(null);              // ✅ use null instead of false
  const [authLoaded, setAuthLoaded] = useState(false);   // ✅ tracks if token is loaded
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Load token only once on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "false") {
      setToken(storedToken);
    } else {
      setToken(null);
    }
    setAuthLoaded(true);
  }, []);

  // ✅ Load user data only if token exists
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  // ✅ Load doctors once regardless of token
  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    authLoaded,              // ✅ expose this to Login
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
