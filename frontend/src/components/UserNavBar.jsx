import React, { useState } from "react";
import "/Users/samrat/Desktop/ChatApp/frontend/src/navbar.css";
import profileImg from "/Users/samrat/Desktop/ChatApp/frontend/src/assets/a.webp";

function UserNavBar()
{
  return (
    <div className="Navbar">
      <ul>
        <li>Welcome{}</li>
        <a>
          <li>
            <img src={profileImg} alt="profileImage" />
          </li>
        </a>
      </ul>
    </div>
  );
}

export default UserNavBar;
