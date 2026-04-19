import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { serverUrl } from "../App";


const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // STEP 1
  const sendOtp = async () => {
    if (!email) return toast.error("Email required");

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/auth/sendotp`,
        { email },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2
  const verifyOtp = async () => {
    if (otp.length !== 6)
      return toast.error("OTP must be 6 digits");

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,
        { email, otp },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 3
  const resetPassword = async () => {
    if (newPassword.length < 8)
      return toast.error("Password must be 8+ characters");

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/auth/resetpassword`,
        { email, otp, newPassword },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forget Password
          </h2>
<label className="font-semibold">Enter Your Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border px-3 py-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="w-full bg-[#020e26] text-white py-2 rounded cursor-pointer"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <button
            className="w-full text-black bg-white py-2 rounded border border-gray-500 mt-2 cursor-pointer"
            onClick={()=>navigate('/login')}
          >
            Back To login
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Verify OTP
          </h2>
<label className="font-semibold">Enter Your OTP</label>
          <input
            type="text"
            maxLength={6}
            placeholder="enter 6 digit otp"
            className="w-full border px-3 py-2 rounded mb-4"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-[#020e26] text-white py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            className="w-full text-black bg-white py-2 rounded border border-gray-500 mt-2 cursor-pointer"
            onClick={()=>navigate('/login')}
          >
            Back To login
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h2>
<label className="font-semibold">Enter Your New Password</label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            onClick={resetPassword}
            className="w-full bg-[#020e26] text-white py-2 rounded"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
          <button
            className="w-full text-black bg-white py-2 rounded border border-gray-500 mt-2 cursor-pointer"
            onClick={()=>navigate('/login')}
          >
            Back To login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
