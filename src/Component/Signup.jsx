import React, { useState } from "react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col md:flex-row max-w-4xl m-auto mt-10 items-center gap-4 p-10">
      {/* Sign Up Form */}
      <div className="md:w-1/2 bg-white p-8">
        <h2 className="text-xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-400 mb-4"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-400 mb-4"
            required
          />
          <div className="flex items-center mb-4">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="border border-gray-300 rounded py-2 px-3 mr-2 focus:outline-none focus:border-blue-400 mt-4"
            >
              <option value="+1">+1</option>
              <option value="+91">+91</option>
              <option value="+44">+44</option>
              {/* Add more country codes as needed */}
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-400 mt-4"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-400 mb-6 mt-2"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-400"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 mt-4 mb-6"
            />
            <label htmlFor="rememberMe" className="mt-4 mb-6">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-sm">
          Already have a Job Seeker Account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            LOGIN
          </a>
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
      <div className="md:w-1/2 bg-gray-500 p-8 rounded-lg">
        <div className="flex justify-center flex-col mb-6">
             <img src="img/Loginheader.svg" alt="" className="h-20 mb-10"/>
        <h1 className="text-xl font-bold mb-4 text-gray-300">How does Ethiojobs works?</h1>
        </div>
       
        <ul className="">
          <li className="mb-10 flex flex-col justify-center">
            <img src="img/Che.svg" alt="" className="h-10"/>
            <span className="font-bold text-gray-300">Create an account</span>
            <p className="text-gray-300">
              Create an account and set up your profile by adding details about
              yourself such as your educational background, work experience,
              skills & qualifications.
            </p>
          </li>
          <li className="mb-10 flex flex-col justify-center">
          <img src="img/Che.svg" alt=""className="h-10" />
            <span className="font-bold text-gray-300">Search for Jobs</span>
            <p className="text-gray-300">
              Browse through thousands of job listings tailored to your skills
              and preferences.
            </p>
          </li>
          <li className="mb-4 flex flex-col justify-center">
          <img src="img/Che.svg" alt="" className="h-10"/>
            <span className="font-bold text-gray-300">Apply to Jobs</span>
            <p className="text-gray-300">
              Apply to jobs that match your interests and qualifications,
              directly from Ethiojobs.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SignUp;
