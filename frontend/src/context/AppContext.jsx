import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const [token, setToken] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadUserProfileData = async (storedToken) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token: storedToken },
      });

      if (data.success) {
        setUserData(data.userData);
        setToken(storedToken); // ✅ token only set after success
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUserData(false);
    } finally {
      setAuthLoaded(true); // ✅ always fire
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedToken !== "false") {
      loadUserProfileData(storedToken); // ✅ validate token before accepting
    } else {
      setToken(null);
      setAuthLoaded(true);
    }
  }, []);

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
    authLoaded,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
