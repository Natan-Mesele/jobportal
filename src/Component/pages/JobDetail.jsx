import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../../Redux/Job/Action'; // Adjust the path as needed

function JobDetail() {
  const { id } = useParams(); // Get the job ID from the URL
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  const { job, loading, error } = useSelector((state) => state.jobs || {});

  useEffect(() => {
    if (id) {
      dispatch(getJobById(id, jwt));
    }
  }, [dispatch, id, jwt]);

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
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-60 bg-cover bg-top z-0" // Full width and background image at the top
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1508968419-73cca394e8aa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            margin: 0, // Remove any margin
            padding: 0, // Remove any padding
          }}
        />

        {/* Job Image (Circular Profile Image on the left) */}
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
      <div className='max-w-4xl mx-auto mt-16'>
        {/* Job Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4 z-10 relative">{job.title}</h1>

        {/* About the Job */}
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">About the Job</h2>
          <p className="text-gray-600 mt-2">{job.aboutJob}</p>
        </div>

        {/* Key Duties and Responsibilities */}
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Key Duties and Responsibilities</h2>
          <p className="text-gray-600 mt-2">{job.keyDutiesAndResponsibilities}</p>
        </div>

        {/* Educational Requirements */}
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Educational Requirements</h2>
          <p className="text-gray-600 mt-2">{job.educationalRequirements}</p>
        </div>

        {/* Work Experience */}
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Work Experience</h2>
          <p className="text-gray-600 mt-2">{job.workExperience}</p>
        </div>

        {/* Required Skills */}
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Required Skills</h2>
          <p className="text-gray-600 mt-2">{job.requiredSkills}</p>
        </div>

        {/* Location and Job Type */}
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

        {/* Company Name */}
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">Company Name</h2>
          <p className="text-gray-600 mt-2">{job.companyName}</p>
        </div>

        {/* How to Apply */}
        <div className="mb-6 z-10 relative">
          <h2 className="text-xl font-semibold text-gray-700">How to Apply</h2>
          <p className="text-gray-600 mt-2">{job.howToApply}</p>
        </div>

        {/* Apply Button */}
        <div className="text-center mt-8 z-10 relative">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg">
            Apply Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default JobDetail;
