import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);        // mobile drawer
  const [showProfile, setShowProfile] = useState(false);  // avatar dropdown
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    setShowProfile(false);
  };

  // close dropdown if you click / tap outside it
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest('#profileWrapper') && // avatar + caret
      !e.target.closest('#profileDropdown')   // dropdown itself
    ) {
      setShowProfile(false);
    }
  };

  return (
    <div
      className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400"
      onClick={handleOutsideClick}
    >
      {/* logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* desktop nav links */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* right‑side controls */}
      <div className="flex items-center gap-4 relative">
        {token && userData ? (
          /* avatar + caret wrapper must own the `group` class */
          <div
            id="profileWrapper"
            className="flex items-center gap-2 cursor-pointer relative group"
          >
            {/* tap target */}
            <button
              className="flex items-center gap-2"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <img className="w-8 rounded-full" src={userData.image} alt="avatar" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="caret" />
            </button>

            {/* dropdown */}
            <div
              id="profileDropdown"
               onClick={() => setShowProfile(false)}  
              className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20
                ${showProfile ? '' : 'hidden'} group-hover:block`}
            >
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate('/my-profile');
                    setShowProfile(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/my-appointments');
                    setShowProfile(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* hamburger icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* mobile side‑drawer */}
      <div
        className={`fixed inset-0 z-30 bg-white transition-transform duration-300 ease-in-out
          ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.logo} alt="logo" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p className="px-4 py-2 rounded hover:bg-gray-100 transition-colors">HOME</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            <p className="px-4 py-2 rounded hover:bg-gray-100 transition-colors">ALL DOCTORS</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p className="px-4 py-2 rounded hover:bg-gray-100 transition-colors">ABOUT</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p className="px-4 py-2 rounded hover:bg-gray-100 transition-colors">CONTACT</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
