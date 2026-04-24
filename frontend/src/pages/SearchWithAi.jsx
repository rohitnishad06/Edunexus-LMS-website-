import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import ai from "../assets/ai.png";
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import start from "../assets/start.mp3";
import axios from "axios";
import { serverUrl } from "../App";

function SearchWithAi() {
  const startSound = new Audio(start);
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
  } else {
    toast.error("Speech recognition not supported");
  }

  //  Search Logic
  const handleSearch = async () => {
    if (!recognition) return;
    setListening(true);
    recognition.start();
    startSound.play();
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      recognition.stop();
      await handleRecommendation(transcript);
      setListening(false); 
    };
  };

  // handle recommenddation
  const handleRecommendation = async (query) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/course/search",
        { input: query }
      );
      setRecommendations(result.data);
      if (result.data.length > 0) {
        speak("These Are the top courses I found for you");
      } else {
        speak("No Courses Found");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "something wend wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-6">
      {/* SEARCH BOX */}
      <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-2xl text-center relative">
        <FaArrowLeftLong
          className="text-black w-[22px] h-[22px] cursor-pointer absolute"
          onClick={() => navigate("/")}
        />

        <h1 className="text-2xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
          <img src={ai} className="w-8 h-8" />
          Search With <span className="text-[#C899C7]">AI</span>
        </h1>

        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden relative w-full shadow-lg">
          <input
            type="text"
            className="flex-grow px-4 py-3 bg-transparent text-white outline-none"
            placeholder="What do you wnat to Learn ? (e.g. AI, MERN, CLOUD...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* AI search Button */}
          {input && (
            <button
              className="absolute right-16 bg-white rounded-full"
              onClick={() => handleRecommendation(input)}
            >
              <img src={ai} className="w-10 h-10 p-2" />
            </button>
          )}

          {/* Mic */}
          <button
            className="absolute right-2 bg-white rounded-full p-2"
            onClick={handleSearch}
          >
            <RiMicAiFill className="text-[#cb87c5] w-5 h-5" />
          </button>
        </div>
      </div>

      {/*  RESULT */}
      <div className="mt-6 w-full max-w-6xl">
        <h2 className="text-lg font-semibold text-center text-white">
          AI Search Results
        </h2>

        {listening && (
          <p className="text-blue-400 text-center mt-2">🎤 Listening...</p>
        )}

        {error && <p className="text-red-400 text-center mt-2">{error}</p>}

        {recommendations.length > 0 && (
          <div className="mt-8 flex flex-col items-start gap-4 px-4">
            {recommendations.map((course, index) => (
              <div
                key={index}
                onClick={() => navigate(`/viewcourse/${course._id}`)}
                className="bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-100 w-full sm:w-[350px]"
              >
                <h2 className="text-lg font-bold">{course.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {course.category || "Web Development"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchWithAi;
