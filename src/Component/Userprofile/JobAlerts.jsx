import React, { useState } from 'react';

function JobAlerts() {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for user inputs
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [contactMethod, setContactMethod] = useState('email'); // default to email
  const [frequency, setFrequency] = useState('daily'); // alert frequency
  const [email, setEmail] = useState('');
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log({
      jobTitle,
      location,
      jobType,
      contactMethod,
      frequency,
      email,
    });

    // Close the modal after submission
    setShowModal(false);

    // Clear the form
    alert('Job alert preferences saved successfully!');
  };

  return (
    <div className="job-alerts-container text-center">
      <h2 className="text-xl font-semibold mb-4">Create Job Alert</h2>

      {/* Informational Paragraph */}
      <p className="text-sm text-gray-600 mb-6">
        Tell us what sort of job you’re looking for and we will send you a job alert in an email or SMS whenever that suits these needs.
      </p>

      {/* Create Job Alert Button */}
      <button 
        onClick={() => setShowModal(true)} 
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Create Job Alert
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Job Alert Preferences</h3>
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium">How often would you like to receive alerts?</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="daily"
                    name="frequency"
                    value="daily"
                    checked={frequency === 'daily'}
                    onChange={() => setFrequency('daily')}
                    className="mr-2"
                  />
                  <label htmlFor="daily" className="mr-4">Daily</label>

                  <input
                    type="radio"
                    id="weekly"
                    name="frequency"
                    value="weekly"
                    checked={frequency === 'weekly'}
                    onChange={() => setFrequency('weekly')}
                    className="mr-2"
                  />
                  <label htmlFor="weekly" className="mr-4">Weekly</label>

                  <input
                    type="radio"
                    id="monthly"
                    name="frequency"
                    value="monthly"
                    checked={frequency === 'monthly'}
                    onChange={() => setFrequency('monthly')}
                    className="mr-2"
                  />
                  <label htmlFor="monthly">Monthly</label>
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Software Developer"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. New York"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Job Type */}
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium">Job Type</label>
                <input
                  type="text"
                  id="jobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  placeholder="e.g. Full-time"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center mt-4">
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Alert
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobAlerts;
