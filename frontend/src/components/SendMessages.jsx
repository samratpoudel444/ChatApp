import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import'/Users/samrat/Desktop/ChatApp/frontend/src/send.css';
import axiosInstance from "./utils/apiClient";

const SendMessage = ({ receiverId }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      await axiosInstance.post(
        "http://localhost:3000/api/v1/messages/send",
        {
          receiverId,
          content: message,
        },
        {
          withCredentials: true,
        }
      );
      setMessage("");
    } catch (error) {
    }
  };

  return (
    <div className="send-message">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default SendMessage;
