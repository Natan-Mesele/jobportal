import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../Redux/Auth/Action';

function Register() {
    const dispatch = useDispatch();

    // Initialize formData from localStorage or default values
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('formData');
        return savedData
            ? JSON.parse(savedData)
            : {
                  username: '',
                  email: '',
                  phone: '',
                  countryCode: '+251', // Default to Ethiopia
                  password: '',
                  role: 'ROLE_USER',
              };
    });

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Save formData to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    // Handle form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(register(formData));
        setMessage('Registration successful!');
        console.log('Form Data Submitted:', formData);

        // Clear formData after submission (optional)
        setFormData({
            username: '',
            email: '',
            phone: '',
            countryCode: '+251',
            password: '',
            role: 'ROLE_USER',
        });

        // Clear localStorage (optional)
        localStorage.removeItem('formData');
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
                    <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                    <div className="flex items-center space-x-2">
                        <select
                            id="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="+1">+1 (US)</option>
                            <option value="+44">+44 (UK)</option>
                            <option value="+91">+91 (India)</option>
                            <option value="+251">+251 (Ethiopia)</option>
                            <option value="+33">+33 (France)</option>
                            <option value="+49">+49 (Germany)</option>
                            <option value="+81">+81 (Japan)</option>
                        </select>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Phone Number"
                            required
                        />
                    </div>
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
