import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const signUpUsers = async (userData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/signUpUser",
    userData
  );
  return response.data;
};

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: signUpUsers,
    onSuccess: (data) => {
      toast.success(data.message || "Signup successful!");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err.message || "Error occurred"
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please provide all the credentials");
      return;
    }

    mutation.mutate({ firstName, lastName, email, password });
  };

  return (
    <main>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </main>
  );
};

export default SignUp;
