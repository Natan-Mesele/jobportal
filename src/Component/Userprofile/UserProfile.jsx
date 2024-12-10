import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import SavedJobs from './SavedJobs';
import Applications from './Applications';
import JobAlerts from './JobAlerts';
import { getUser } from '../../Redux/Auth/Action';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [profileCompletion, setProfileCompletion] = useState(80); // Example completion percentage
  const [photo, setPhoto] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isloading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.auth.jwt); // Check if the user is logged in

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Preview image
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('User:', user);
    console.log('Loading:', isLoading);
  }, [user, isLoading]);

  return (
    <div className="flex flex-row container mx-auto p-6">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 h-fit">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={photo || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-32 h-32 mx-auto rounded-full border-4 border-gray-300"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a2 2 0 012-2h4l2-2h4l2 2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4l-2 2H8l-2-2H2a2 2 0 01-2-2V5zm2 0v4h4l2 2h4l2-2h4V5H4z" />
              </svg>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>
        {/* User Information */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-2">
            {user?.fullName || "Guest"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user?.email || "Email not available"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user?.phoneNumber || "Phone not available"}
          </p>
        </div>

        {/* Profile Completion */}
        <div className="space-y-2">
          <h3 className="text-sm text-gray-700 dark:text-white font-medium">Profile Completion</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-300">{profileCompletion}% Completed</p>
        </div>
      </div>
      {/* Right Content */}
      <div className="w-2/3 pl-6">
        {/* Navigation Tabs */}
        <div className="tabs flex space-x-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
          {[
            { id: 'profile', label: 'My Profile' },
            { id: 'saved', label: 'Saved Jobs' },
            { id: 'applications', label: 'My Applications' },
            { id: 'alerts', label: 'Job Alerts' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="tab-content mt-6">
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'saved' && <SavedJobs />}
          {activeTab === 'applications' && <Applications />}
          {activeTab === 'alerts' && <JobAlerts />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
