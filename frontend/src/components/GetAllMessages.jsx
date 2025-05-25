import React, { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { io } from "socket.io-client";
import "/Users/samrat/Desktop/ChatApp/frontend/src/message.css";
import axiosInstance from "./utils/apiClient";


const socket = io("http://localhost:4000");

const fetchMessages = async (senderId) => {
  const res = await axiosInstance.get(
    `http://localhost:3000/api/v1/messages/${senderId}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const GetAllMessages = ({ senderId, receiverId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getMessages", senderId],
    queryFn: () => fetchMessages(senderId),
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data?.message) {
      setMessages(data.message);
    }
  }, [data]);

  useEffect(() => {
    socket.on("newMessage", (newMsg) => {
      if (
        (newMsg.senderId === senderId && newMsg.receiverId === receiverId) ||
        (newMsg.senderId === receiverId && newMsg.receiverId === senderId)
      ) {
        setMessages((prev) => [...prev, newMsg]);

        queryClient.setQueryData(["getMessages", senderId], (oldData) => {
          return {
            ...oldData,
            message: [...(oldData?.message || []), newMsg],
          };
        });
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [senderId, receiverId, queryClient]);

  if (isLoading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages: {error.message}</p>;

  return (
    <div className="messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`msg ${msg.receiverId === receiverId ? "friend" : "me"}`}
        >
          <p>{msg.content}</p>
          <span className="timestamp">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GetAllMessages;
