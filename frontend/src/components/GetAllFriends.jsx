import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/Users/samrat/Desktop/ChatApp/frontend/src/App.css";

const fetchUsers = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/showAllFriends"
  );
  return response.data;
};

const GetAllFriends = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getFriends"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Friends</h2>
      <ul>
        {data.message.map((user) => (
          <li key={user.recieverId} className="user-item">
            👤 {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default GetAllFriends;
