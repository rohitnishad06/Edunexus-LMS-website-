import React from "react";
import { MdOutlineCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";

function Logos() {
  return (
    <div className="w-full py-8 flex flex-wrap justify-center gap-6 px-4">
      
      <div className="flex items-center gap-2 px-6 py-3 rounded-3xl 
                      bg-gray-200 hover:bg-gray-300 
                      transition duration-300 
                      text-[#03394b] cursor-pointer">
        <MdOutlineCastForEducation className="w-[35px] h-[35px]" />
        <span className="text-sm sm:text-base font-medium">
          20k+ Online Courses
        </span>
      </div>

      <div className="flex items-center gap-2 px-6 py-3 rounded-3xl 
                      bg-gray-200 hover:bg-gray-300 
                      transition duration-300 
                      text-[#03394b] cursor-pointer">
        <SiOpenaccess className="w-[35px] h-[35px]" />
        <span className="text-sm sm:text-base font-medium">
          Lifetime Access
        </span>
      </div>

      <div className="flex items-center gap-2 px-6 py-3 rounded-3xl 
                      bg-gray-200 hover:bg-gray-300 
                      transition duration-300 
                      text-[#03394b] cursor-pointer">
        <FaSackDollar className="w-[35px] h-[35px]" />
        <span className="text-sm sm:text-base font-medium">
          Value For Money
        </span>
      </div>

      <div className="flex items-center gap-2 px-6 py-3 rounded-3xl 
                      bg-gray-200 hover:bg-gray-300 
                      transition duration-300 
                      text-[#03394b] cursor-pointer">
        <BiSupport className="w-[35px] h-[35px]" />
        <span className="text-sm sm:text-base font-medium">
          Lifetime Support
        </span>
      </div>

      <div className="flex items-center gap-2 px-6 py-3 rounded-3xl 
                      bg-gray-200 hover:bg-gray-300 
                      transition duration-300 
                      text-[#03394b] cursor-pointer">
        <PiUsersThreeFill className="w-[35px] h-[35px]" />
        <span className="text-sm sm:text-base font-medium">
          Community Support
        </span>
      </div>

    </div>
  );
}

export default Logos;
