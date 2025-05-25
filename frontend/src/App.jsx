import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllFriends from "./components/GetAllFriends";
import SendMessage from "./components/SendMessages";
import UserNavBar from "./components/UserNavBar";
import GetAllMessage from "./components/GetAllMessages";
import SignInUser from "./components/SignInUsers";
import SignUp from "./components/SignUp";
import UserDashBoard from "./components/UserDashboard";

function ChatPage() {
  return (
    <>
      <UserNavBar />
      <GetAllFriends />
      <SendMessage />
      <GetAllMessage />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chatPage" element={<ChatPage />} />
        <Route path="/signInUser" element={<SignInUser />} />
        <Route path="/signUpUser" element={<SignUp />} />
        <Route path="/userDashboard" element={<UserDashBoard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
