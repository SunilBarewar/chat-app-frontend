import { useEffect } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import io from "socket.io-client";
import { useChat } from "./ChatContext";

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const { selectedChat } = useChat();
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback(
    (msg) => {
      console.log("Send Message", msg);
      if (socket) {
        socket.emit("new.message", msg);
      }
    },
    [socket]
  );
  const joinRoom = useCallback(
    (roomId) => {
      if (!socket) return;
      console.log("join room ", roomId);
      socket.emit("join chat", roomId);
    },
    [socket]
  );

  const onMessageRec = useCallback((msg) => {
    console.log("From Server Msg Rec", msg);
    // const { message } = JSON.parse(msg);
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:5000");
    _socket.on("new.message", onMessageRec);

    setSocket(_socket);

    return () => {
      _socket.off("new.message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  useEffect(() => {
    setMessages([]);
  }, [selectedChat]);

  return (
    <SocketContext.Provider value={{ sendMessage, messages, joinRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketProvider;
