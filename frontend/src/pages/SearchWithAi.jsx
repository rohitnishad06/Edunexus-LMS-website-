import React, { useState, useRef, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import ai from '../assets/ai.png'
import { RiMicAiFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import start from "../assets/start.mp3"

function SearchWithAi() {

  const navigate = useNavigate()

  const [input, setInput] = useState("")
  const [recommendations, setRecommendations] = useState([])
  const [listening, setListening] = useState(false)
  const [error, setError] = useState("")

  const audioRef = useRef(null)
  const recognitionRef = useRef(null)

  // Dummy Courses (API ke bina)
  const courses = [
    { _id: "1", title: "MERN Stack Course" },
    { _id: "2", title: "React Full Course" },
    { _id: "3", title: "AI for Beginners" },
    { _id: "4", title: "HTML & CSS Mastery" }
  ]

  // 🔊 Setup
  useEffect(() => {
    audioRef.current = new Audio(start)

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      console.log("🎤 Voice:", transcript);

      setInput(transcript);
      handleSearchLogic(transcript);
    };

    recognition.onerror = () => {
      toast.error("Voice recognition error");
    };

    recognitionRef.current = recognition;

  }, [])

  //  Speak
  const speak = (msg) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(utter);
  }

  // 🎤 Mic Click
  const handleMic = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    audioRef.current.play();
    recognition.start();
  }

  //  Search Logic (No API)
  const handleSearchLogic = (query) => {

    if (!query.trim()) {
      setRecommendations([]);
      setError("");
      return;
    }

    const filtered = courses.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )

    setRecommendations(filtered)

    if (filtered.length > 0) {
      setError("")
      speak("Courses found")
    } else {
      setError("No courses found ❌")
      speak("No courses found")
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-6'>

      {/* 🔍 SEARCH BOX */}
      <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-2xl text-center relative">

        <FaArrowLeftLong
          className='text-black w-[22px] h-[22px] cursor-pointer absolute'
          onClick={() => navigate("/")}
        />

        <h1 className='text-2xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2'>
          <img src={ai} className='w-8 h-8' />
          Search With <span className='text-[#C899C7]'>AI</span>
        </h1>

        <div className='flex items-center bg-gray-700 rounded-full relative w-full'>

          <input
            type='text'
            className='flex-grow px-4 py-3 bg-transparent text-white outline-none'
            placeholder='Search course...'
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              setInput(value);
              handleSearchLogic(value);
            }}
          />

          {/* AI Button */}
          {input && (
            <button
              className='absolute right-16 bg-white rounded-full'
              onClick={() => handleSearchLogic(input)}
            >
              <img src={ai} className='w-10 h-10 p-2' />
            </button>
          )}

          {/* Mic */}
          <button
            className="absolute right-2 bg-white rounded-full p-2"
            onClick={handleMic}
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

  {error && (
    <p className="text-red-400 text-center mt-2">{error}</p>
  )}

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
  )
}

export default SearchWithAi