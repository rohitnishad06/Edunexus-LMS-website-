import React from "react";
import Nav from "../component/Nav";
import home from "../assets/home1.jpg";
import { RiPlayCircleFill } from "react-icons/ri";
import ai from "../assets/ai.png";
import Logos from "../component/Logos";
import ExploreCourses from "../component/ExploreCourses";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../component/About";
import Footer from "../component/Footer";
import ReviewPage from "../component/ReviewPage";

function Home() {
  const navigate = useNavigate()
  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav />

        {/* Background Image */}
        <img
          src={home}
          className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]"
          alt="home"
        />

        {/* Heading Line 1 */}
        <span
          className="lg:text-[70px] absolute md:text-[40px] 
          lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center 
          text-white font-bold text-[20px]"
        >
          Grow Your Skills To Advance
        </span>

        {/* Heading Line 2 */}
        <span
          className="lg:text-[70px] absolute md:text-[40px] 
          lg:top-[18%] top-[22%] w-[100%] flex items-center justify-center 
          text-white font-bold text-[20px]"
        >
          Your Career Path
        </span>

        {/* Buttons */}
        <div
          className="absolute lg:top-[30%] top-[75%] md:top-[80%] 
          w-[100%] flex items-center justify-center gap-3 flex-wrap"
        >
          {/* View Courses Button */}
          <button
            className="px-[20px] py-[10px] border-2 
            lg:border-white border-black rounded-[10px] text-[18px] 
            font-light flex gap-2 items-center gap-2 cursor-pointer lg:text-white text-black" onClick={()=>navigate("/allcourses")}
          >
            View All Courses
            <RiPlayCircleFill className="w-[30px] h-[30px] lg:fill-white fill-black" />
          </button>

          {/* Search AI Button */}
          <button
            className="px-[20px] py-[10px] border-2 
            lg:border-white border-black rounded-[10px] text-[18px] 
            font-light flex items-center gap-2 cursor-pointer lg:text-black text-white lg:bg-white bg-black "
           onClick={()=>navigate("/search")}>
            Search With AI
            <img
              src={ai}
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
              alt="ai"
            />
            <img
              src={ai}
              className="w-[35px] h-[35px] rounded-full lg:hidden"
              alt="ai"
            />
          </button>
        </div>
      </div>
      <Logos />
      <ExploreCourses />
      <CardPage/>
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
}

export default Home;
