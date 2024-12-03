import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../Redux/Job/Action';

function FindJobs() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    careerLevel: '',
    jobType: '',
    searchQuery: '', // For search input
  });

  const jobsPerPage = 10;

  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const featuredJobs = jobs?.filter((job) => job.featured);

  // Filter jobs based on selected filters and search query
  const applyFilters = (job) => {
    const matchesCategory = !filters.category || job.category === filters.category;
    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesCareerLevel = !filters.careerLevel || job.careerLevel === filters.careerLevel;
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
    const matchesSearchQuery =
      !filters.searchQuery || job.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesCategory && matchesLocation && matchesCareerLevel && matchesJobType && matchesSearchQuery;
  };

  const filteredJobs = jobs.filter(applyFilters);
  const filteredFeaturedJobs = featuredJobs.filter(applyFilters);

  const currentJobs =
    activeTab === 'all'
      ? filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
      : filteredFeaturedJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  const totalPages =
    activeTab === 'all'
      ? Math.ceil(filteredJobs.length / jobsPerPage)
      : Math.ceil(filteredFeaturedJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="bg-cover bg-center h-96 flex flex-col items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Job in Ethiopia</h1>
        <p className="max-w-2xl text-lg mb-8">
          Search jobs by title, keywords, industry, category, or location.
        </p>
        <form className="w-full max-w-4xl mb-6">
          {/* Search Section */}
          <div className="flex w-full">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search job title, keywords, or industry"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
              className="flex-grow border border-gray-300 rounded-l-full p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Search Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>

          {/* Filters Section */}
          <div className="mt-4 flex flex-col items-center">
            <div className="flex flex-wrap gap-8 justify-center">
              {/* Category Filter */}
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Category</option>
                <option value="software">Software</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
              </select>

              {/* Location Filter */}
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Location</option>
                <option value="addis-ababa">Addis Ababa</option>
                <option value="hawassa">Hawassa</option>
                <option value="mekelle">Mekelle</option>
              </select>

              {/* Career Level Filter */}
              <select
                name="careerLevel"
                value={filters.careerLevel}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Career Level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>

              {/* Job Type Filter */}
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>

              {/* Posted Within Filter */}
              <select
                name="postedWithin"
                value={filters.postedWithin}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Posted Within</option>
                <option value="1-day">Last 1 Day</option>
                <option value="7-days">Last 7 Days</option>
                <option value="30-days">Last 30 Days</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div className="p-8 max-w-6xl mx-auto flex">
        {/* Jobs Section */}
        <div className="w-3/4 pr-8">
          <div className="flex justify-start space-x-8 text-lg font-medium mb-8">
            <span
              className={`cursor-pointer ${activeTab === 'all' ? 'text-blue-600 underline' : 'text-gray-700'}`}
              onClick={() => {
                setActiveTab('all');
                setCurrentPage(1);
              }}
            >
              All Jobs
            </span>
            <span
              className={`cursor-pointer ${activeTab === 'featured' ? 'text-blue-600 underline' : 'text-gray-700'}`}
              onClick={() => {
                setActiveTab('featured');
                setCurrentPage(1);
              }}
            >
              Featured Jobs
            </span>
          </div>

          <div>
            {currentJobs.map((job) => (
              <div key={job.id} className="bg-white shadow rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">
                  {job.companyName} - {job.location}
                </p>
                <p className="text-sm text-gray-500">
                  {job.jobType} • {job.category}
                </p>
                <p className="text-sm text-gray-600">{job.description}</p>
                <span className="mt-2 text-blue-600 hover:underline cursor-pointer">View Details</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              className={`px-4 py-2 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <div className="w-1/4">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-xl font-normal mb-4 text-gray-500">Sign Up</h3>
            <div className='text-gray-500'>
              <p>Get personalized recommendations and apply for jobs.</p>
            </div>

            <div className="mt-4 flex justify-center gap-4">
              {/* Google sign-up with image only */}
              <button className="flex items-center">
                <img
                  src="https://e7.pngegg.com/pngimages/687/86/png-clipart-google-logo-google-adwords-g-suite-google-account-google-logo-chess.png"
                  alt="Google"
                  className="w-10 h-10 mr-2"
                />
              </button>

              {/* LinkedIn sign-up with image only */}
              <button className="flex items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                  className="w-10 h-10 mr-2"
                />
              </button>
            </div>

            <div className="flex items-center justify-center my-4">
              <span className="text-gray-500">________ or ________</span>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Already have an account?</p>
            </div>

            <div className="mt-4 text-center">
              <a href="/login" className="text-blue-600 hover:underline text-lg font-bold">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindJobs;
