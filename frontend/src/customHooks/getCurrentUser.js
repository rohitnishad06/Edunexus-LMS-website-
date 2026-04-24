import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/getcurrentuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        localStorage.removeItem("token");
        dispatch(setUserData(null));
        toast.error("Session expired, please login again");
        navigate("/login");
      }
    };

    fetchUser();
  }, [dispatch, navigate]);
};

export default useGetCurrentUser;
