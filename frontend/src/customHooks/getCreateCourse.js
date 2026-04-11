import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux';
import { setCreatorCourseData } from '../redux/courseSlice';

const getCreateCourse  = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const creatorCourseData = useSelector((state) => state.course?.creatorCourseData);

    useEffect(() => {
        const creatorCourse = async () => {
            try {
                const result = await axios.get(
                    serverUrl + "/api/course/getcreator",
                    { withCredentials: true }
                );

                dispatch(setCreatorCourseData(result.data));
            } catch (error) {
                console.log(error);
            }
        };

        if (!userData || creatorCourseData?.length) return;

        creatorCourse();
    }, [userData, creatorCourseData, dispatch]);
};

export default getCreateCourse;