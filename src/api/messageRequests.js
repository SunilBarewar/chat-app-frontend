import API from "./API";

export const getMessagesOfUser = async (chatId) => {
  return await API.get(`/message/${chatId}`);
};

export const saveMessage = async (data) => {
  return await API.post(`/message`, data);
};

export const uploadImage = async (data) => {
  return await API.post("/message/upload", data);
};
