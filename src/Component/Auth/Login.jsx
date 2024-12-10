import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
    navigate('/profile');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-32">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
        Log In
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Log in to continue as a job seeker on our website
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <a href="/forgot-password" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>

      <div className="flex justify-between mt-6 space-x-4">
        <button className="flex items-center justify-center w-1/2 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Google_2015_logo.svg/512px-Google_2015_logo.svg.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Google</span>
        </button>
        <button className="flex items-center justify-center w-1/2 py-2 border rounded-lg bg-gray-50 hover:bg-gray-100">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt="LinkedIn"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm font-medium text-gray-700">LinkedIn</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
