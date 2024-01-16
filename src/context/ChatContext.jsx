import { createContext, useContext, useEffect, useState } from "react";
import getUserInfo from "../utils/getAccessToken";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};

export default ChatContextProvider;
