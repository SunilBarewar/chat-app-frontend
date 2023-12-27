import getUserInfo from "../utils/getAccessToken";
import API from "./API";

export const registerUser = async (data) => {
  return await API.post("/user/register", data);
};

export const loginUser = async (data) => {
  return await API.post("/user/login", data);
};

export const searchUsers = async (query) => {
  return await API.get(`/user?search=${query}`, {
    headers: {
      Authorization: getUserInfo().token,
    },
  });
};
