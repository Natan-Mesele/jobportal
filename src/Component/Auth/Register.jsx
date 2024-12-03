import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../Redux/Auth/Action'; // Assuming you have this action defined

function Register() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "ROLE_USER",
    });

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear any previous messages
        setErrorMessage(""); // Clear any previous error messages
        
        try {
            // Dispatch register action
            await dispatch(register(formData));
            setMessage("Registration successful! Please log in."); // Show success message
            // Don't navigate anywhere
        } catch (error) {
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>
            <p className="text-center text-gray-500 mb-4">Please enter your details or use one of the social logins below</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Password"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-gray-700">Role</label>
                    <select
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="ROLE_USER">User</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
                >
                    Register
                </button>
                {message && <p className="text-green-500 text-center">{message}</p>}
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-500">Already have a Job Seeker Account?</p>
                <a href="/login" className="text-indigo-600 font-semibold">Login here</a>
            </div>
        </div>
    );
}

export default Register;
