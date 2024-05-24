import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8">Log In</h2>
        <p className="text-gray-600 mb-8">
          Log in to continue as a job seeker in our website
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border-b border-gray-300 rounded-t w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border-b border-gray-300 rounded-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-start my-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
          <div className="flex flex-col text-left mt-8 p-2">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-700 mb-4"
            >
              Forgot Password?
            </Link>
            <Link to="/signup" className="flex flex-row gap-2">
              <p className="text-gray-500">Don't have an account?</p>{" "}
              <span className="text-blue-500 hover:text-blue-700">Sign Up</span>
            </Link>
          </div>
        </form>
        <div className="text-gray-400 my-6">
          __________________________ or __________________________
        </div>
        <div className="flex flex-col items-center justify-center mt-4 gap-4">
          <button className="border border-gray-300 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-10 rounded-full mr-2 focus:outline-none focus:shadow-outline">
            <FaGoogle className="inline-block mr-2" /> Log in with Google
          </button>
          <button className="border border-gray-300 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline">
            <FaLinkedin className="inline-block mr-2" /> Log in with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
