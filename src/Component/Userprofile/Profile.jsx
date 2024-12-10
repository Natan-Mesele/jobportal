import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfile } from '../../Redux/UserProfile/Action';

const Profile = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    profession: '',
    careerLevel: '',
    education: {
      university: '',
      major: '',
      degreeType: '',
      graduationYear: '',
    },
    workExperience: {
      companyName: '',
      title: '',
      fromYear: '',
      currentlyWorking: false,
      description: '',
    },
    skills: [],
    languages: '',
    portfolio: '',
    links: {
      link1: '',
      link2: '',
      link3: '',
      link4: '',
    },
    jobPreference: {
      desiredEmployment: '',
      desiredSalary: '',
      currentSalary: '',
    },
    resume: null,  // This will store the file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Handle nested fields with dot notation
    const nameParts = name.split('.');  // Split name to handle nested fields
  
    if (nameParts.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value,  // Update the nested field
        },
      }));
    } else if (name === "skills") {
      // Special handling for skills: split by commas
      const skillsArray = value.split(",").map(skill => skill.trim());
      setFormData((prevData) => ({
        ...prevData,
        [name]: skillsArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
   

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Assuming only one file is being uploaded
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    // Append all fields to FormData
    formDataToSubmit.append('fullName', formData.fullName);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('birthday', formData.birthday);
    formDataToSubmit.append('gender', formData.gender);
    formDataToSubmit.append('profession', formData.profession);
    formDataToSubmit.append('careerLevel', formData.careerLevel);
    formDataToSubmit.append('education', JSON.stringify(formData.education));  // Serialize object
    formDataToSubmit.append('workExperience', JSON.stringify(formData.workExperience));  // Serialize object
    formDataToSubmit.append('skills', formData.skills);
    formDataToSubmit.append('languages', formData.languages);
    formDataToSubmit.append('portfolio', formData.portfolio);
    formDataToSubmit.append('links', JSON.stringify(formData.links));  // Serialize object
    formDataToSubmit.append('jobPreference', JSON.stringify(formData.jobPreference));  // Serialize object

    if (formData.resume) {
      formDataToSubmit.append('resume', formData.resume); // Append resume if file is selected
    }

    const token = localStorage.getItem('jwt');  // Assuming JWT token is stored in localStorage

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',  // Ensure this is set for file uploads
        'Authorization': `Bearer ${token}`,   // Authorization header with token
      },
    };

    // Dispatch action to send data to API
    dispatch(createProfile(formDataToSubmit, token));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Birthday */}
        <div>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Profession */}
        <div>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            placeholder="Profession"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Career Level */}
        <div>
          <select
            name="careerLevel"
            value={formData.careerLevel}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Career Level</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>

        {/* Education */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="education.university"
              value={formData.education.university}
              onChange={handleInputChange}
              placeholder="University"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="education.major"
              value={formData.education.major}
              onChange={handleInputChange}
              placeholder="Major"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="education.degreeType"
              value={formData.education.degreeType}
              onChange={handleInputChange}
              placeholder="Degree Type"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="education.graduationYear"
              value={formData.education.graduationYear}
              onChange={handleInputChange}
              placeholder="Graduation Year"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <input
            type="text"
            name="workExperience.companyName"
            value={formData.workExperience.companyName}
            onChange={handleInputChange}
            placeholder="Company Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="workExperience.title"
            value={formData.workExperience.title}
            onChange={handleInputChange}
            placeholder="Job Title"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="workExperience.fromYear"
            value={formData.workExperience.fromYear}
            onChange={handleInputChange}
            placeholder="From Year"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <textarea
            name="workExperience.description"
            value={formData.workExperience.description}
            onChange={handleInputChange}
            placeholder="Job Description"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Skills */}
        <div>
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")} // Join the skills array as a comma-separated string
            onChange={handleInputChange}
            placeholder="Enter skills separated by commas"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Languages */}
        <div>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
            placeholder="Languages"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Portfolio */}
        <div>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            placeholder="Portfolio URL"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="url"
              name="links.link1"
              value={formData.links.link1}
              onChange={handleInputChange}
              placeholder="Link 1"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="url"
              name="links.link2"
              value={formData.links.link2}
              onChange={handleInputChange}
              placeholder="Link 2"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="url"
              name="links.link3"
              value={formData.links.link3}
              onChange={handleInputChange}
              placeholder="Link 3"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="url"
              name="links.link4"
              value={formData.links.link4}
              onChange={handleInputChange}
              placeholder="Link 4"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Job Preference */}
        <div>
          <input
            type="text"
            name="jobPreference.desiredEmployment"
            value={formData.jobPreference.desiredEmployment}
            onChange={handleInputChange}
            placeholder="Desired Employment"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="jobPreference.desiredSalary"
            value={formData.jobPreference.desiredSalary}
            onChange={handleInputChange}
            placeholder="Desired Salary"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="jobPreference.currentSalary"
            value={formData.jobPreference.currentSalary}
            onChange={handleInputChange}
            placeholder="Current Salary"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Resume */}
        <div>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
