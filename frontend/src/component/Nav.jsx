import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogOut = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <div className="w-full h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-20">

        {/* Logo */}
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            alt="logo"
            className="w-[50px] rounded-[5px] border-2 border-white cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Menu */}
        <div className="w-[40%] lg:flex items-center justify-center gap-4 hidden relative">

          {/* Profile Icon */}
          {!userData ? (
            <IoPersonCircle
              className="w-[50px] h-[50px] fill-black cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer text-white"
              onClick={() => setShowProfile(!showProfile)}
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          {/* Dashboard */}
          {userData?.role === "educator" && (
            <div
              className="px-[20px] py-[10px] border-2 border-white text-white bg-black rounded-[10px] cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          )}

          {/* Login / Logout */}
          {!userData ? (
            <span
              className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] cursor-pointer bg-[#00000045]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px] bg-white text-black rounded-[10px] cursor-pointer"
              onClick={handleLogOut}
            >
              Logout
            </span>
          )}

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute top-[110%] right-0 flex flex-col gap-2 bg-white px-[15px] py-[10px] border-2 border-black rounded-md">
              <span
                className="bg-black text-white px-[30px] py-[10px] rounded-2xl cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  navigate("/profile");
                  setShowProfile(false);
                }}
              >
                My Profile
              </span>
              <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl cursor-pointer hover:bg-gray-700">
                My Courses
              </span>
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
        <RxHamburgerMenu
          className="w-[35px] h-[35px] lg:hidden text-black cursor-pointer"
          onClick={() => setShowHam(true)}
        />
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex flex-col items-center justify-center gap-5 z-30 lg:hidden transition-all duration-500 ${
          showHam ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-[5%] cursor-pointer"
          onClick={() => setShowHam(false)}
        />

        {/* Profile Icon */}
        {!userData ? (
          <IoPersonCircle className="w-[60px] h-[60px] fill-white" />
        ) : (
          <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[22px] border-2 bg-black border-white text-white">
            {userData?.name?.slice(0, 1).toUpperCase()}
          </div>
        )}

        <div
          className="w-[200px] h-[60px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          My Profile
        </div>

        <div className="w-[200px] h-[60px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer">
          My Courses
        </div>

        {userData?.role === "educator" && (
          <div className="w-[200px] h-[60px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer">
            Dashboard
          </div>
        )}

        {!userData ? (
          <div
            className="w-[200px] h-[60px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        ) : (
          <div
            className="w-[200px] h-[60px] border-2 border-white text-white bg-black flex items-center justify-center rounded-[10px] cursor-pointer"
            onClick={handleLogOut}
          >
            Logout
          </div>
        )}
      </div>

    </>
  );
}

export default Nav;
