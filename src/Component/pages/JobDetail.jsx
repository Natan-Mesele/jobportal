import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../../Redux/Job/Action';
import { applyForJob } from '../../Redux/Applyforjob/Action';

function JobDetail({ job: jobFromProps }) { // Rename the prop here
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { job, loading, error } = useSelector((state) => state.jobs || {});
  const { message } = useSelector((state) => state.jobApplication || {});

  const [showModal, setShowModal] = useState(false);
  const [resume, setResume] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    if (jwt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (id) {
      dispatch(getJobById(id, jwt));
    }
  }, [dispatch, id, jwt]);

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      alert('You need to log in to apply for this job.');
      navigate('/login');
      return;
    }
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const userId = useSelector((state) => state.user?.id);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert('Please upload a resume before submitting.');
      return;
    }

    const storedUserId = localStorage.getItem('userId');
    if (!job.id || !storedUserId) {
      alert('Invalid job or user ID.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('userId', storedUserId);

    try {
      const response = await fetch(`http://localhost:8080/api/applications/${storedUserId}/${job.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        alert('Application submitted successfully!');
        setShowModal(false);
      } else {
        alert('Error submitting application: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to apply for the job.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (!job) {
    return <div className="text-center mt-10">Job not found.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg relative">
      <div>
        <div
          className="absolute top-0 left-0 w-full h-60 bg-cover bg-top z-0"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1508968419-73cca394e8aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            margin: 0,
            padding: 0,
          }}
        />

        {job.imageUrl && (
          <div className="flex justify-start items-center z-10 mb-6 relative ml-8 mt-32">
            <img
              src={job.imageUrl}
              alt={job.title}
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
            />
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-16">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 z-10 relative">{job.title}</h1>

        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">About the Job</h2>
          <p className="text-gray-600 mt-2">{job.aboutJob || 'No description available'}</p>
        </div>

        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Key Duties and Responsibilities</h2>
          <p className="text-gray-600 mt-2">{job.keyDutiesAndResponsibilities}</p>
        </div>

        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Educational Requirements</h2>
          <p className="text-gray-600 mt-2">{job.educationalRequirements}</p>
        </div>

        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Work Experience</h2>
          <p className="text-gray-600 mt-2">{job.workExperience}</p>
        </div>

        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Required Skills</h2>
          <p className="text-gray-600 mt-2">{job.requiredSkills}</p>
        </div>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 z-10 relative">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Location</h2>
            <p className="text-gray-600 mt-2">{job.location}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Job Type</h2>
            <p className="text-gray-600 mt-2">{job.jobType}</p>
          </div>
        </div>

        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Company Name</h2>
          <p className="text-gray-600 mt-2">{job.companyName || 'Company name not provided'}</p>
        </div>

        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">How to Apply</h2>
          <p className="text-gray-600 mt-2">{job.howToApply}</p>
        </div>

        <div className="text-center mt-8 z-10 relative">
          <button
            onClick={handleApplyClick}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg"
          >
            Apply Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="block mb-4"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
      {uploadMessage && <div className="mt-4 text-center text-green-500">{uploadMessage}</div>}
    </div>
  );
}

export default JobDetail;
