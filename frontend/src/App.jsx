import React from "react";
import GetAllFriends from "./components/GetAllFriends";
import SendMessage from "./components/SendMessages";
import UserNavBar from "./components/UserNavBar";


function App() {
  return (
    <div style={{ display: "flex" }}>
      <UserNavBar />
      <GetAllFriends />
      <SendMessage />
    </div>
  );
}

export default App;
