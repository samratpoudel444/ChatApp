import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SignIn= async(userData)=>
{
    const response = await axios.post(
      "http://localhost:3000/api/v1/signInUser",
      userData
    );
    return response.data
}

const SignInUser= ()=>
{
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");

    const mutation = useMutation({
      mutationFn: SignIn,
      onSuccess: (data)=>
        {
            console.log(data.message)
            toast.success(data.message)
        },
    onError:(err)=>
    {
        toast.error(
          err?.response?.data?.message || err.message || "Error occurred"
        );
    }
    });

   function handleSubmit(e)
    {
        e.preventDefault();
        if(!email || !password)
        {
            toast.error("Please provide necessary credentials");
        }
        mutation.mutate({email, password})


    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <br />
          <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Submitting" : "submit"}</button>
        </form>
        <ToastContainer/>
      </div>
    );
}

export default SignInUser