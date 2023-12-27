import API from "./API";

export const createOneOnOneChat = async (data) => {
  return await API.post("/chat", data);
};
export const createGroupChat = async (data) => {
  return await API.post("/chat/group/create", data);
};
export const fetchChats = async () => {
  return await API.get("/chat");
};

export const removeUserFromGroup = async (data) => {
  return await API.put("/chat/group/remove", data);
};

export const addUserToGroup = async (data) => {
  return await API.put("/chat/group/add", data);
};
export const renameGroup = async (data) => {
  return await API.put("/chat/group/rename", data);
};
