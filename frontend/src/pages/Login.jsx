import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { FaRegEye } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* LEFT */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Welcome Back</h1>
            <h2 className="text-[#999797] text-[18px]">
              Login to your account
            </h2>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1 w-[80%] px-3">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              className="border w-full h-[35px] border-[#e7e6e6] px-3 text-[15px]"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1 w-[80%] px-3 relative">
            <label className="font-semibold">Password</label>
            <input
              type={show ? "text" : "password"}
              className="border w-full h-[35px] border-[#e7e6e6] px-3 text-[15px]"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {show ? (
              <FaRegEye
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShow(false)}
              />
            ) : (
              <FaEye
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShow(true)}
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            className="w-[80%] h-[35px] bg-black text-white text-lg rounded-[5px]
                       flex items-center justify-center"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Login"}
          </button>

          {/* FORGOT */}
          <span className="text-[13px] cursor-pointer text-[#585757]">
            Forgot Password?
          </span>

          {/* OR */}
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]" />
            <div className="w-[50%] text-center text-[#6f6f6f]">
              Or Continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]" />
          </div>

          {/* GOOGLE */}
          <div
            className="w-[80%] h-[35px] border border-black rounded-[5px]
                        flex items-center justify-center gap-2"
          >
            <img src={google} className="w-[25px]" alt="google" />
            <span className="text-[18px]">Google</span>
          </div>

          {/* SIGNUP */}
          <div className="text-[#6f6f6f]">
            Create new account
            <span
              className="underline text-black pl-2 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[50%] h-full bg-black rounded-r-2xl hidden md:flex flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-100 shadow-2xl" />
          <span className="text-2xl text-white mt-2">
            VIRTUAL COURSES
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
