import React from 'react';

function Hero() {
  return (
    <div className="text-gray-900 py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-8 ml-10">
          <h1 className="text-4xl font-bold mb-4">Habeshajobs</h1>
          <p className="text-lg mb-6">Unlock your Career Potential</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 rounded-full mr-4">
            Get Started
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white py-4 px-4 sm:px-6 lg:px-8">
        <input
          type="search"
          name="search"
          id="search"
          className="border border-gray-600 rounded-lg py-3 px-4 w-96"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default Hero;
