import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { getCompanyById } from "../../Redux/company/Action";

function CompanyDetail() {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const { company, loading, error } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanyById(id)); 
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    const errorMessage = error.message || "An unexpected error occurred";
    return <p>Error fetching company details: {errorMessage}</p>;
  }

  if (!company) return <p>No company found</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg">
        <img
          src={company.logoUrl}
          alt={company.name}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold">{company.name}</h2>
          <p className="mt-4 text-lg text-gray-700">{company.description}</p> {/* Styled paragraph */}
        </div>
        <div className="p-10">
          <h3 className="text-2xl font-semibold mt-6">About Us</h3>
          <p className="mt-2 text-lg text-gray-700">{company.about}</p> {/* Styled paragraph */}
          <h3 className="text-2xl font-semibold mt-6">Mission</h3>
          <p className="mt-2 text-lg text-gray-700">{company.mission}</p> {/* Styled paragraph */}
          <h3 className="text-2xl font-semibold mt-6">Vision</h3>
          <p className="mt-2 text-lg text-gray-700">{company.vision}</p> {/* Styled paragraph */}
          <h3 className="text-2xl font-semibold mt-6">Why Work With Us</h3>
          <p className="mt-2 text-lg text-gray-700">{company.whyWork}</p> {/* Styled paragraph */}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
