import React from "react";
import { RiPlayCircleFill } from "react-icons/ri";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { SiUikit } from "react-icons/si";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaMixcloud } from "react-icons/fa";

function ExploreCourses() {
  return (
    <div className="w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px] ">

        {/* left/top div */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[35px] font-semibold">Explore</span>
        <span className="text-[35px] font-semibold">Courses</span>
        <p className="text-[17px]">Discover a wide range of courses tailored to your interests and career goals.</p>
        <button className="px-[20px] py-[10px] border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer">Explore Courses <RiPlayCircleFill className="w-[30px] h-[30px] fill-white " /></button>
      </div>

      {/* right/bottom div */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
                <TbDeviceDesktopAnalytics  className="w-[60px] h-[60px] text-[#6d6c6c]"/>
            </div>
            Web Development
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[80px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
                <SiUikit className="w-[50px] h-[60px] text-[#6d6c6c]"/>
            </div>
            UI/UX Designing
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center">
                <MdAppShortcut  className="w-[50px] h-[60px] text-[#6d6c6c]"/>
            </div>
            App Development
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[80px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
                <FaHackerrank  className="w-[50px] h-[60px] text-[#6d6c6c]"/>
            </div>
            Ethical Hacking
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[80px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
                <AiFillOpenAI  className="w-[50px] h-[60px] text-[#6d6c6c]"/>
            </div>
            AI/ML
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[80px] bg-[#ecc290]  rounded-lg flex items-center justify-center">
                <SiGoogledataproc  className="w-[50px] h-[60px] text-[#686161]"/>
            </div>
            Data Science
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[80px] bg-[#c8a2c8] rounded-lg flex items-center justify-center">
                <BsClipboard2DataFill  className="w-[50px] h-[60px] text-[#595353]"/>
            </div>
            Data Analytics
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
            <div className="w-[100px] h-[80px] bg-[#635d77] rounded-lg flex items-center justify-center">
                <FaMixcloud  className="w-[50px] h-[60px] text-[#393434]"/>
            </div>
            DevOps
        </div>

      </div>
    </div>
    )
}

export default ExploreCourses;