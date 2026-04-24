import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;   // importan

    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`);
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");  // invalid token cleanup
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, []);
};

export default useGetCurrentUser;
