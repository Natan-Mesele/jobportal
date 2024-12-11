import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Component/pages/Header';
import Blog from './Component/pages/Blog';
import ContactUs from './Component/pages/ContactUs';
import FindCompany from './Component/pages/FindCompany';
import FindJobs from './Component/pages/FindJobs';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import UserProfile from './Component/Userprofile/UserProfile'; 
import CompanyDetail from './Component/pages/CompanyDetail'
import JobDetail from './Component/pages/JobDetail';

function App() {

  return (
    <>
      <Header /> {/* Render the Header component */}

      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<FindJobs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/find-company" element={<FindCompany />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route
          path="/profile"
          element={
              <UserProfile />
          }
        />
      </Routes>
    </>
  );
}

export default App;
