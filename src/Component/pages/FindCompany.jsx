import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection
import { getAllCompanies } from "../../Redux/company/Action";

function FindCompany() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const companiesPerPage = 15; // Number of companies to display per page 
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to a different page

  const { companies = [], loading = false, error = null } = useSelector(
    (state) => state.company
  );
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllCompanies(jwt));
  }, [dispatch, jwt]);

  // Reset currentPage to 1 whenever searchQuery or activeTab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const filterCompanies = (companies) => {
    if (!companies) return [];
    return companies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getCompaniesToDisplay = () => {
    if (activeTab === "featured") {
      return companies.filter((company) => company.isFeatured);
    }
    return companies;
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const goToCompanyDetail = (companyId) => {
    navigate(`/company/${companyId}`); // Redirect to company detail page
  };

  // Calculate the companies to display based on the current page
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filterCompanies(getCompaniesToDisplay()).slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filterCompanies(getCompaniesToDisplay()).length / companiesPerPage);

  // Handle the page change for next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle direct page number click
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-8 text-lg font-medium">
            <span
              className={`cursor-pointer ${activeTab === "all"
                  ? "text-blue-600 pb-2 border-b-2 border-blue-600"
                  : "text-gray-700"
                }`}
              onClick={() => toggleTab("all")}
            >
              All Companies
            </span>
            <span
              className={`cursor-pointer ${activeTab === "featured"
                  ? "text-blue-600 pb-2 border-b-2 border-blue-600"
                  : "text-gray-700"
                }`}
              onClick={() => toggleTab("featured")}
            >
              Featured Companies
            </span>
          </div>
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Search companies"
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Loading companies...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            Error: {error.message || JSON.stringify(error)}
          </p>
        ) : null}
        <div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCompanies.map((company, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg flex flex-col items-start w-full transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => goToCompanyDetail(company.id)} // Navigate to the company detail page
              >
                <div className="relative flex flex-row items-center w-full">
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="w-40 h-[150px] object-cover rounded-lg mr-4 p-2"
                  />
                  <div>
                    <h3 className="text-xl text-gray-400">{company.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
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
                  className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'}`}
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
      </div>
    </div>
  );
}

export default FindCompany;
