import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export const useSocket = () => {
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 1500);
    });

    return () => {
      socket.off("typing");
    };
  }, []);

  return { socket, typing };
};
