import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <p className="text-gray-600 mb-4">Log in to continue as a job seeker in our website</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
              Forgot Password?
            </Link>
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-700">
              Don't have an account? Sign Up
            </Link>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4">
          <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full mr-2 focus:outline-none focus:shadow-outline">
            <FaGoogle className="inline-block mr-2" /> Log in with Google
          </button>
          <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            <FaLinkedin className="inline-block mr-2" /> Log in with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;