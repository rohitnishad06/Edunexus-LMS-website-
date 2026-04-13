import axios from 'axios'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'

function ViewLectures() {
    const { courseId } = useParams()
    const { courseData } = useSelector(state => state.course)
    const { userData } = useSelector(state => state.user)

    const selectedCourse = courseData?.find(
        (course) => course._id === courseId
    )

    const [creatorData, setCreatorData] = useState(null)
    const [selectedLecture, setSelectedLecture] = useState(null)

    const navigate = useNavigate()

    // Set first lecture when course loads
    useEffect(() => {
        if (selectedCourse?.lectures?.length > 0) {
            setSelectedLecture(selectedCourse.lectures[0])
        }
    }, [selectedCourse])

    // Fetch creator data
    useEffect(() => {
        const handleCreator = async () => {
            if (selectedCourse?.creator) {
                try {
                    const result = await axios.post(
                        serverUrl + "/api/course/creator",
                        { userId: selectedCourse.creator },
                        { withCredentials: true }
                    )
                    setCreatorData(result.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        handleCreator()
    }, [selectedCourse])

    return (
      <div className="min-h-screen bg-[#f5f5f5] p-6 flex flex-col md:flex-row gap-6">

  {/* LEFT SIDE */}
  <div className="w-full md:w-2/3 bg-white rounded-xl border shadow-sm p-5">

    {/* HEADER */}
    <div className="mb-4">
      <h2 className="text-lg font-semibold flex items-center gap-3 text-gray-800">
        <FaArrowLeftLong
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        {selectedCourse?.title}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Category: {selectedCourse?.category}
        <span className="mx-3">|</span>
        Level: {selectedCourse?.level}
      </p>
    </div>

    {/* VIDEO */}
    <div className="w-full h-[70%] rounded-lg overflow-hidden border">
      {selectedLecture?.videoUrl ? (
        <video
          src={selectedLecture.videoUrl}
          controls
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-black text-white">
          Select Lecture
        </div>
      )}
    </div>

    {/* TITLE */}
    <p className="mt-3 text-sm font-medium text-gray-800">
      {selectedLecture?.lectureTitle}
    </p>
  </div>

  {/* RIGHT SIDE */}
  <div className="w-full md:w-1/3 bg-white rounded-xl border shadow-sm p-5 h-fit">

<h2 className="text-xl font-bold mb-4 text-black">
  All Lectures
</h2>

    {/* LECTURE LIST */}
    <div className="flex flex-col gap-2">

      {selectedCourse?.lectures?.map((lecture) => (
        <button
          key={lecture._id}
          onClick={() => setSelectedLecture(lecture)}
          className={`flex items-center justify-between px-3 py-2 rounded-md border text-xs font-medium
          ${
            selectedLecture?._id === lecture._id
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          {lecture.lectureTitle}

          <FaPlayCircle className="text-gray-700" />
        </button>
      ))}
    </div>

    {/* INSTRUCTOR */}
    {creatorData && (
      <div className="mt-5 pt-4 border-t">

        <h3 className="text-xl font-bold mb-4 text-black">
          Educator
        </h3>

        <div className="flex items-center gap-3">
          <img
            src={creatorData?.photoUrl}
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-medium text-gray-800">
              {creatorData?.name}
            </p>
            <p className="text-xs text-gray-500">
              {creatorData?.description}
            </p>
          </div>
        </div>
      </div>
    )}

  </div>
</div>
    )
}

export default ViewLectures