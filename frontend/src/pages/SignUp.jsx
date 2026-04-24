import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import google from "../assets/google.jpg";
import { FaRegEye } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../utils/firebase";

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);


  // handle signUp
  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role }
      );
      localStorage.setItem("token", res.data.token);
      dispatch(setUserData(res.data.user));
      toast.success("Signup successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // handle google auth 
  const googleSignUp = async () => {
    const response = await signInWithPopup(auth, provider);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/googleauth`,
        {name:response.user.displayName, email:response.user.email, role}
      );
       localStorage.setItem("token", result.data.token);
      dispatch(setUserData(result.data.user))
      toast.success("Signup successful");
      navigate("/");
      setLoading(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
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
            <h1 className="font-semibold text-2xl">Let's get started</h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>

          {/* NAME */}
          <div className="flex flex-col gap-1 w-[80%] px-3">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              className="border w-full h-[35px] border-[#e7e6e6] px-3 text-[15px]"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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

          {/* ROLE */}
          <div className="flex w-[80%] justify-between px-3">
            {["student", "educator"].map((item) => (
              <span
                key={item}
                className={`px-4 py-1 border-2 rounded-xl cursor-pointer ${
                  role === item ? "border-black" : "border-gray-400"
                }`}
                onClick={() => setRole(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            ))}
          </div>

          {/* BUTTON */}
          <button
            className="w-[80%] h-[35px] bg-[#020e26] text-white text-lg rounded-[5px] flex items-center justify-center"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
          </button>

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
            className="w-[80%] h-[35px] border border-black rounded-[5px] flex items-center justify-center cursor-pointer"
            onClick={googleSignUp}
          >
            <img src={google} className="w-[25px]" alt="google" />
            <span className="text-[18px]">Google</span>
          </div>

          {/* LOGIN */}
          <div className="text-[#6f6f6f]">
            Already have an account?
            <span
              className="underline text-black pl-2 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[50%] h-full bg-[#020e26] rounded-r-2xl hidden md:flex flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-100 " />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
