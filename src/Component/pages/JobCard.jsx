import React from 'react';
import { Link } from 'react-router-dom';

function JobCard({ job = {}, toggleSaveJob, savedJobs = [] }) {

  return (
    <div key={job.id} className="bg-white shadow rounded-lg p-4 mb-4 relative">
      {/* Save Button - positioned at the top-right corner */}
      <div className="absolute top-4 right-4">
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => toggleSaveJob(job.id)}
        >
          {savedJobs.includes(job.id) ? (
            <span className="text-yellow-500">★ Saved</span>
          ) : (
            <span>☆ Save</span>
          )}
        </span>
      </div>

      {/* Job Image */}
      {job.imageUrl && (
        <div className="mt-12">
          <img
            src={job.imageUrl}
            alt={job.title}
            className="w-12 h-12 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Job Title */}
      <Link to={`/job/${job.id}`} className="text-blue-600 hover:underline mt-4 block">
        {job?.title}
      </Link>
      <p className="text-gray-600">
        {job?.companyName || 'Unknown Company'} - {job.location || 'Unknown Location'}
      </p>
      <p className="text-sm text-gray-500">
        {job.jobType || 'Unknown Type'} • {job.category || 'Unknown Category'}
      </p>

      {/* Job Description */}
      <p className="text-sm text-gray-600">{job.description || 'No description available'}</p>

      <span className="mt-2 text-blue-600 hover:underline cursor-pointer">View Details</span>
    </div>
  );
}

export default JobCard;
