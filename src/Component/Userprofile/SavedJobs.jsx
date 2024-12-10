import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSavedJobs } from '../../Redux/SavedJob/Action';
import JobCard from '../pages/JobCard';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs = [], isLoading, error } = useSelector((state) => state.savedJob || {});
  const { auth } = useSelector((state) => state.auth);
  const { jwt, userId } = useSelector((state) => state.auth);

  const toggleSaveJob = (jobId) => {
    console.log(`Toggling save status for job ID: ${jobId}`);
    // Implement your logic for toggling the save state here
  };

  // Fetch saved jobs when component is mounted and userId and jwt are available
  useEffect(() => {
    console.log('Auth object:', auth);  // Log auth object to check if JWT and userId are present
    if (userId && jwt) {
      dispatch(getSavedJobs(userId, jwt));
    } else {
      console.error('User ID or JWT is missing');
    }
  }, [dispatch, userId, jwt, auth]);

  if (isLoading) return <p>Loading saved jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(savedJobs); // Log the savedJobs to ensure they are populated correctly

  return (
    <div className="saved-jobs">
      <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {savedJobs.map((savedJob) => (
            <li key={savedJob.id}>
              {savedJob.job ? (
                <JobCard
                  job={savedJob.job} // Pass the job field from the savedJob object
                  toggleSaveJob={toggleSaveJob}
                  savedJobs={savedJobs}
                />
              ) : (
                <p className="text-red-500">Job details are unavailable.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedJobs;
