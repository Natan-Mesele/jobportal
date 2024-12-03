import React, { useState } from 'react';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send the data to an API or email)
    alert('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Image and Text Section */}
      <div className="relative">
        <img
          src="https://media.istockphoto.com/id/941612576/photo/social-networking-and-world-technology-connection-concept-businessman-hand-holding-mobile.jpg?s=612x612&w=0&k=20&c=DoyU9aBHS1qNHxIiz3IxSOMsZrE4QQUWM3zPiDTyTxo="
          alt="Blog"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white px-4 md:px-8 max-w-lg md:mx-64">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">
            If you have any questions, feel free to reach out to us using the form below. We’d love to hear from you!
          </p>
        </div>
      </div>
      {/* Contact Form and Map Section */}
      <div className="flex justify-center items-start mt-8 px-8">
        {/* Left: Contact Form */}
        <div className="w-full sm:w-3/4 lg:w-1/2 p-8 bg-white rounded-lg shadow-lg mr-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Map */}
        <div className="w-full sm:w-3/4 lg:w-1/2 bg-gray-200 rounded-lg shadow-lg">
          {/* You can replace the iframe with the actual map URL */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5383923537677!2d106.66533241522266!3d10.803713974320297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee1987b1c9f%3A0x240a4066c4d9e4b8!2zMTAsIFRo4buV!5e0!3m2!1sen!2s!4v1654672147"
            width="100%"
            height="430"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
