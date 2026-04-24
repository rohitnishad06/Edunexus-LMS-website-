import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";

function ViewLectures() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  const selectedCourse = courseData?.find((course) => course._id === courseId);

  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCourse?.lectures?.length > 0) {
      setSelectedLecture(selectedCourse.lectures[0]);
    }
  }, [selectedCourse]);

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            { userId: selectedCourse.creator }
          );
          setCreatorData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* LEFT or top SECTION */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl border border-gray-200 p-6 shadow-md ">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center justify-start gap-[20px] text-gray-800">
            <FaArrowLeftLong
              className="cursor-pointer w-[22px] h-[22px] text-black"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.title}
          </h2>

          <div className=" mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span className="mx-2">Category: {selectedCourse?.category}</span> |
            <span className="mx-2"> Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* VIDEO BOX */}
        <div className="aspect-video rounded-xl overflow-hidden border border-gray-300 mb-4 bg-[#020e26]">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              Select Lecture to start Watching...
            </div>
          )}
        </div>

        {/* LECTURE TITLE */}
        <div className="mt-3 ">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedLecture?.lectureTitle}
          </h2>
        </div>
      </div>

      {/* RIGHT or bottom SECTION */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl border border-gray-200 h-fit p-6 shadow-md">
        {/* ALL LECTURES */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Lectures</h2>

        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse?.lectures?.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                  selectedLecture?._id === lecture._id
                    ? "bg-gray-200 border-gray-500"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
              >
                <h2 className="text-sm font-semibold text-gray-800">{lecture.lectureTitle}</h2>
                <FaPlayCircle className="text-lg text-black"/>
              </button>
            ))
          ) : (
            <p className="text-gray-500">No lectures Available.</p>
          )}
        </div>

        {/* INSTRUCTOR */}
        {creatorData && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-3">
              Instructor
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={creatorData?.photoUrl}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h2 className="text-base font-medium text-gray-800">
                  {creatorData?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {creatorData?.description || "Instructor"}
                </p>
                <p className="text-sm text-gray-600">
                  {creatorData?.email || "Instructor"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewLectures;
