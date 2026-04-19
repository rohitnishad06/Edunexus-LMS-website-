import React from "react";
import about from "../assets/about.jpg";
import video from "../assets/video.mp4";
import { BsPatchCheckFill } from "react-icons/bs";

function About() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16">

      {/* LEFT SIDE */}
      <div className="lg:w-[45%] w-full flex justify-center relative">

        {/* Background Image */}
        <img
          src={about}
          alt="about"
          className="w-[90%] h-[550px] object-cover rounded-2xl"
        />

        {/* Video Card */}
        <div className="absolute bottom-[10px] left-[85%] -translate-x-1/2 w-[40%] shadow-xl/90 rounded-2xl">
          <video
            src={video}
            className="w-full h-[90%] rounded-xl shadow-2xl border-[2px] border-white"
            controls
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-[45%] w-full">

        {/* Small Heading */}
        <div className="flex items-center gap-3 mb-2">
          <p className="text-gray-500 font-medium">About Us</p>
          <div className="w-[40px] h-[2px] bg-black"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
          We Are Maximize Your <br /> Learning Growth
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          We provide a modern Learning Management System to simplify online
          education, track progress, and enhance student-instructor
          collaboration efficiently.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
          <div className="flex items-center gap-2">
            <BsPatchCheckFill className="text-black" />
            Simplified Learning
          </div>
          <div className="flex items-center gap-2">
            <BsPatchCheckFill className="text-black" />
            Expert Trainers
          </div>
          <div className="flex items-center gap-2">
            <BsPatchCheckFill className="text-black" />
            Big Experience
          </div>
          <div className="flex items-center gap-2">
            <BsPatchCheckFill className="text-black" />
            Lifetime Access
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;