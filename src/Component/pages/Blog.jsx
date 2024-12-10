import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../Redux/Blog/Action';

function Blog() {
  const dispatch = useDispatch();
  const { blogs = [], loading, error } = useSelector((state) => state.blog || {});

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const blogsPerPage = 6;
  const jwt = localStorage.getItem("jwt");


  useEffect(() => {
    dispatch(getAllBlogs(jwt));
  }, [dispatch, jwt]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error && typeof error === 'object') {
    return <div>Error: {error.message || 'An error occurred'}</div>;
  }  

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-0 max-w-full mx-auto">
        {/* Image and text section */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1698399571308-eb24469d6320?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blog"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-2">The Ethiojobs Blog</h1>
            <p className="text-lg text-center mb-4">Your best source of information that matters.</p>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-md bg-white text-gray-900 w-full sm:w-80 lg:w-96"
            />
          </div>
        </div>
        {/* Cards Section */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-8 mx-auto mx-16">
          {currentBlogs.map((blog) => (
            blog.id && blog.title && blog.content ? (
              <div key={blog.id} className="bg-white shadow-lg rounded-lg p-4">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                )}
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p>{blog.content.substring(0, 150)}...</p>
              </div>
            ) : null
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-6 mt-8 p-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="text-lg text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;