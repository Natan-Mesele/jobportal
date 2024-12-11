import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllApplyJob } from '../../Redux/Applyforjob/Action';
import JobCard from '../pages/JobCard';

function Applications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const userId = localStorage.getItem('userId');
  const { applications = [], loading, error } = useSelector((state) => state.jobApplication); // Default to an empty array
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId && jwt) {
      dispatch(getAllApplyJob(userId, jwt));
    } else {
      navigate('/login');
      console.error('User ID or JWT is missing');
    }
  }, [dispatch, userId, jwt, navigate, auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const toggleSaveJob = (jobId) => {
    console.log(`Toggling save status for job ID: ${jobId}`);
    // Implement your logic for toggling the save state here
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Your Job Applications</h2>
      
      {/* Displaying the job applications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.length === 0 ? (
          <div>No job applications found.</div>
        ) : (
          applications.map((job) => (
            <JobCard key={job.id} job={job} onSave={toggleSaveJob} />
          ))
        )}
      </div>
    </div>
  );
}

export default Applications;
