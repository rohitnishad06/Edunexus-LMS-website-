import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

import { useSelector } from "react-redux";

const useGetPublishedCourse = () => {
    const dispatch = useDispatch();
    const courseData = useSelector((state) => state.course?.courseData);

    useEffect(() => {
        const getCourseData = async () => {
            try {
                const result = await axios.get(
                    serverUrl + "/api/course/getpublished"
                );
                dispatch(setCourseData(result.data));
            } catch (error) {
                console.log(error);
            }
        };

        getCourseData();
    }, []);
};

export default useGetPublishedCourse;